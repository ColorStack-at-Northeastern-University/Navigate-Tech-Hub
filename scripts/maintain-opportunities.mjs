/**
 * maintain-opportunities.mjs
 *
 * Scheduled maintenance for the homepage ColorStack opportunities carousel.
 * It checks links, tracks consecutive strikes, removes stale rows in a review PR,
 * and writes the markdown report used as the PR body/comment.
 */

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OPPORTUNITIES_FILE = new URL('../frontend/data/opportunities.ts', import.meta.url);
const DEFAULT_STATE_FILE = new URL('./opportunity-link-state.json', import.meta.url);
const DEFAULT_POLICY_FILE = new URL('./opportunity-link-policy.json', import.meta.url);
const DEFAULT_REPORT_FILE = new URL('./reports/opportunity-maintenance-report.md', import.meta.url);

const FAIL_STRIKES_TO_REMOVE = 3;
const GENERIC_STRIKES_TO_REMOVE = 2;
const DEFAULT_PRUNE_OLDEST = 10;
const DEFAULT_MIN_ENTRIES = 15;
const CONCURRENCY = 4;
const REQUEST_TIMEOUT_MS = 12_000;
const USER_AGENT = 'Mozilla/5.0 (compatible; NavigateBot/1.0; opportunity-maintenance)';

const args = parseArgs(process.argv.slice(2));
const applyChanges = args.apply === true;
const pruneOldestCount = numberArg(args['prune-oldest'], DEFAULT_PRUNE_OLDEST);
const minEntries = numberArg(args['min-entries'], DEFAULT_MIN_ENTRIES);
const stateFile = pathArg(args['state-file'], DEFAULT_STATE_FILE);
const policyFile = pathArg(args['policy-file'], DEFAULT_POLICY_FILE);
const reportFile = pathArg(args['report-file'], DEFAULT_REPORT_FILE);
const checkedAt = new Date().toISOString();

const policy = loadJson(policyFile, {
    genericPatterns: [],
    knownGoodPartialUrls: [],
    skipLinkCheckUrls: [],
    pinnedUrls: [],
});
const state = loadJson(stateFile, { lastRunAt: null, links: {} });
const source = readFileSync(OPPORTUNITIES_FILE, 'utf8');
const parsed = parseOpportunityFile(source);
const genericMatchers = (policy.genericPatterns ?? []).map((pattern) => new RegExp(pattern, 'i'));

const linkResults = await checkEntries(parsed.entries, policy);
const updatedState = updateStrikeState(state, linkResults, checkedAt);
const removalPlan = planRemovals(parsed.entries, linkResults, updatedState, policy, {
    pruneOldestCount,
    minEntries,
});
const nextSource = removeOpportunityBlocks(source, removalPlan.removeEntries);
const report = buildReport({
    checkedAt,
    entries: parsed.entries,
    linkResults,
    updatedState,
    removalPlan,
    genericPatternCandidates: findGenericPatternCandidates(linkResults),
});

writeTextFile(reportFile, report);
writeTextFile(stateFile, JSON.stringify({ ...updatedState, lastRunAt: checkedAt }, null, 2) + '\n');

if (applyChanges && nextSource !== source) {
    writeFileSync(OPPORTUNITIES_FILE, nextSource);
}

console.log(report);

function parseArgs(rawArgs) {
    return rawArgs.reduce((acc, arg) => {
        if (arg === '--apply') return { ...acc, apply: true };
        if (!arg.startsWith('--')) return acc;
        const [key, value = true] = arg.slice(2).split('=');
        return { ...acc, [key]: value };
    }, {});
}

function numberArg(value, fallback) {
    if (value === undefined || value === true) return fallback;
    const parsedValue = Number(value);
    return Number.isFinite(parsedValue) ? parsedValue : fallback;
}

function pathArg(value, fallbackUrl) {
    if (value === undefined || value === true) return fallbackUrl;
    return new URL(value, `file:///${process.cwd().replaceAll('\\', '/')}/`);
}

function loadJson(fileUrl, fallback) {
    try {
        return JSON.parse(readFileSync(fileUrl, 'utf8'));
    } catch {
        return fallback;
    }
}

function writeTextFile(fileUrl, contents) {
    mkdirSync(dirname(fileURLToPath(fileUrl)), { recursive: true });
    writeFileSync(fileUrl, contents);
}

function parseOpportunityFile(contents) {
    const arrayStart = contents.indexOf('const RAW_COLORSTACK_OPPORTUNITIES');
    const arrayOpen = contents.indexOf('[', arrayStart);
    const exportStart = contents.indexOf('export const COLORSTACK_OPPORTUNITIES', arrayOpen);
    const arrayClose = contents.lastIndexOf('];', exportStart);

    if (arrayStart < 0 || arrayOpen < 0 || arrayClose < 0) {
        throw new Error('Could not find RAW_COLORSTACK_OPPORTUNITIES array.');
    }

    const arrayBody = contents.slice(arrayOpen + 1, arrayClose);
    const entries = splitObjectBlocks(arrayBody).map((block) => ({
        ...extractEntryFields(block.text),
        blockText: block.text,
        start: arrayOpen + 1 + block.start,
        end: arrayOpen + 1 + block.end,
    }));

    return { entries };
}

function splitObjectBlocks(text) {
    const blocks = [];
    let depth = 0;
    let start = -1;
    let quote = null;
    let escaping = false;

    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];

        if (quote) {
            if (escaping) {
                escaping = false;
            } else if (char === '\\') {
                escaping = true;
            } else if (char === quote) {
                quote = null;
            }
            continue;
        }

        if (char === '"' || char === "'" || char === '`') {
            quote = char;
            continue;
        }

        if (char === '{') {
            if (depth === 0) start = index;
            depth += 1;
        } else if (char === '}') {
            depth -= 1;
            if (depth === 0 && start >= 0) {
                blocks.push({ text: text.slice(start, index + 1), start, end: index + 1 });
                start = -1;
            }
        }
    }

    return blocks;
}

function extractEntryFields(blockText) {
    return {
        id: numberField(blockText, 'id'),
        title: stringField(blockText, 'title') ?? '(unknown)',
        company: stringField(blockText, 'company') ?? '(unknown)',
        url: stringField(blockText, 'url'),
        deadline: stringField(blockText, 'deadline'),
        pasteIndex: numberField(blockText, 'pasteIndex'),
        linkCheck: stringField(blockText, 'linkCheck'),
    };
}

function numberField(text, field) {
    const match = text.match(new RegExp(`${field}:\\s*(\\d+)`));
    return match ? Number(match[1]) : undefined;
}

function stringField(text, field) {
    const match = text.match(new RegExp(`${field}:\\s*(['"\`])([\\s\\S]*?)\\1`));
    return match?.[2]?.replaceAll("\\'", "'").replaceAll('\\"', '"');
}

async function checkEntries(entries, currentPolicy) {
    const results = [];

    for (let index = 0; index < entries.length; index += CONCURRENCY) {
        const batch = entries.slice(index, index + CONCURRENCY);
        const batchResults = await Promise.all(batch.map((entry) => checkEntry(entry, currentPolicy)));
        results.push(...batchResults);
        await delay(350);
    }

    return results;
}

async function checkEntry(entry, currentPolicy) {
    if (!entry.url) return { ...entry, status: 'UNKNOWN', code: 0, finalUrl: '', error: 'missing url' };
    if (matchesPartial(entry.url, currentPolicy.skipLinkCheckUrls) || entry.linkCheck === 'skip') {
        return { ...entry, status: 'SKIPPED', code: 0, finalUrl: entry.url };
    }

    const head = await requestUrl(entry.url, 'HEAD');
    const result = head.retryWithGet ? await requestUrl(entry.url, 'GET') : head;
    return { ...entry, ...classifyResponse(entry.url, result, currentPolicy) };
}

async function requestUrl(url, method) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(url, {
            method,
            redirect: 'follow',
            signal: controller.signal,
            headers: { 'User-Agent': USER_AGENT },
        });

        if (method === 'HEAD' && [405, 501].includes(response.status)) {
            return { retryWithGet: true };
        }

        return { code: response.status, finalUrl: response.url };
    } catch (error) {
        if (method === 'HEAD' && error.name !== 'AbortError') {
            return { retryWithGet: true };
        }
        return {
            code: 0,
            finalUrl: url,
            error: error.name === 'AbortError' ? 'timeout' : error.message,
        };
    } finally {
        clearTimeout(timer);
    }
}

function classifyResponse(originalUrl, result, currentPolicy) {
    const finalUrl = result.finalUrl ?? originalUrl;
    const code = result.code ?? 0;

    if (result.error) return { status: 'UNKNOWN', code, finalUrl, error: result.error };
    if ([401, 403].includes(code)) return { status: 'BLOCKED', code, finalUrl };
    if (code === 429 || code >= 500) return { status: 'UNKNOWN', code, finalUrl };
    if (code === 404 || code === 410 || (code >= 400 && code < 500)) {
        return { status: 'FAIL', code, finalUrl };
    }
    if (isKnownGood(finalUrl, currentPolicy)) return { status: 'OK', code, finalUrl };
    if (isGeneric(finalUrl)) return { status: 'GENERIC', code, finalUrl };
    return { status: 'OK', code, finalUrl };
}

function isGeneric(url) {
    return genericMatchers.some((matcher) => matcher.test(url));
}

function isKnownGood(url, currentPolicy) {
    return matchesPartial(url, currentPolicy.knownGoodPartialUrls);
}

function matchesPartial(url, partials = []) {
    return partials.some((partial) => partial && url.includes(partial));
}

function updateStrikeState(previousState, results, runAt) {
    const links = {};

    for (const result of results) {
        const previous = previousState.links?.[result.url] ?? {};
        const failStrikes = result.status === 'FAIL' ? (previous.failStrikes ?? 0) + 1 : 0;
        const genericStrikes = result.status === 'GENERIC' ? (previous.genericStrikes ?? 0) + 1 : 0;

        links[result.url] = {
            title: result.title,
            company: result.company,
            status: result.status,
            code: result.code,
            finalUrl: result.finalUrl,
            failStrikes,
            genericStrikes,
            lastCheckedAt: runAt,
        };
    }

    return { ...previousState, links };
}

function planRemovals(entries, results, currentState, currentPolicy, options) {
    const pinnedUrls = new Set(currentPolicy.pinnedUrls ?? []);
    const resultByUrl = new Map(results.map((result) => [result.url, result]));

    const linkRemovals = entries.filter((entry) => {
        if (pinnedUrls.has(entry.url) || entry.linkCheck === 'pinned') return false;
        const result = resultByUrl.get(entry.url);
        const stateEntry = currentState.links?.[entry.url];
        return (
            (result?.status === 'FAIL' && (stateEntry?.failStrikes ?? 0) >= FAIL_STRIKES_TO_REMOVE) ||
            (result?.status === 'GENERIC' && (stateEntry?.genericStrikes ?? 0) >= GENERIC_STRIKES_TO_REMOVE)
        );
    });

    const linkRemovalUrls = new Set(linkRemovals.map((entry) => entry.url));
    const remainingAfterLinks = entries.length - linkRemovals.length;
    const pruneSlots = Math.max(0, remainingAfterLinks - options.minEntries);
    const pruneCount = Math.min(options.pruneOldestCount, pruneSlots);

    const pruneRemovals = entries
        .filter((entry) => (
            !linkRemovalUrls.has(entry.url) &&
            !entry.deadline &&
            !pinnedUrls.has(entry.url) &&
            entry.linkCheck !== 'pinned'
        ))
        .sort((a, b) => (a.pasteIndex ?? Number.NEGATIVE_INFINITY) - (b.pasteIndex ?? Number.NEGATIVE_INFINITY))
        .slice(0, pruneCount);

    return {
        linkRemovals,
        pruneRemovals,
        removeEntries: [...linkRemovals, ...pruneRemovals],
    };
}

function removeOpportunityBlocks(contents, entriesToRemove) {
    const ranges = entriesToRemove
        .map((entry) => {
            let end = entry.end;
            const tail = contents.slice(end);
            const trailingComma = tail.match(/^\s*,/);
            if (trailingComma) end += trailingComma[0].length;
            return { start: entry.start, end };
        })
        .sort((a, b) => b.start - a.start);

    return ranges.reduce((nextContents, range) => (
        nextContents.slice(0, range.start) + nextContents.slice(range.end)
    ), contents);
}

function findGenericPatternCandidates(results) {
    const grouped = new Map();

    for (const result of results) {
        if (!result.finalUrl || result.status === 'GENERIC' || result.finalUrl === result.url) continue;
        const candidate = genericCandidateFor(result.finalUrl);
        if (!candidate) continue;
        const group = grouped.get(candidate) ?? [];
        group.push(result);
        grouped.set(candidate, group);
    }

    return [...grouped.entries()]
        .filter(([, group]) => group.length >= 2)
        .map(([candidate, group]) => ({ candidate, group }));
}

function genericCandidateFor(rawUrl) {
    try {
        const url = new URL(rawUrl);
        const path = url.pathname.replace(/\/+$/, '').toLowerCase();
        if (!/(jobs|careers|search|openings|positions)/.test(path)) return null;
        return `${url.hostname}${path}`;
    } catch {
        return null;
    }
}

function buildReport({ checkedAt, entries, linkResults, updatedState, removalPlan, genericPatternCandidates }) {
    const counts = ['OK', 'GENERIC', 'FAIL', 'BLOCKED', 'UNKNOWN', 'SKIPPED'].map((status) => ({
        status,
        count: linkResults.filter((result) => result.status === status).length,
    }));
    const linkRemovalUrls = new Set(removalPlan.linkRemovals.map((entry) => entry.url));

    return [
        '# ColorStack Opportunity Maintenance',
        '',
        `Run: ${checkedAt}`,
        '',
        '## Summary',
        '',
        '| Status | Count |',
        '|--------|------:|',
        ...counts.map((row) => `| ${row.status} | ${row.count} |`),
        `| Total checked | ${entries.length} |`,
        '',
        '## Rows Proposed For Removal',
        '',
        removalTable(removalPlan, linkResults, updatedState),
        '',
        '## Generic Pattern Candidates',
        '',
        genericPatternCandidates.length > 0
            ? genericPatternCandidates.map((candidate) => (
                `- \`${candidate.candidate}\` (${candidate.group.length} redirects): ${candidate.group.map((item) => `${item.company} - ${item.title}`).join('; ')}`
            )).join('\n')
            : 'None.',
        '',
        '## Review Notes',
        '',
        `- FAIL rows are removed only after ${FAIL_STRIKES_TO_REMOVE} consecutive FAIL strikes.`,
        `- GENERIC rows are removed only after ${GENERIC_STRIKES_TO_REMOVE} consecutive GENERIC strikes and stay labeled as GENERIC in this report.`,
        `- Oldest-row pruning removes up to ${pruneOldestCount} rows without explicit deadlines, while keeping at least ${minEntries} total rows.`,
        '- BLOCKED and UNKNOWN rows are never auto-removed.',
        '- Generic pattern candidates are suggestions only; merge a policy edit to adopt them.',
        '',
        '## Full Non-OK Results',
        '',
        nonOkTable(linkResults, updatedState, linkRemovalUrls),
        '',
    ].join('\n');
}

function removalTable(removalPlan, results, currentState) {
    if (removalPlan.removeEntries.length === 0) return 'None.';
    const resultByUrl = new Map(results.map((result) => [result.url, result]));
    const rows = [
        '| Reason | Status | Strikes | Company | Title | URL |',
        '|--------|--------|---------|---------|-------|-----|',
    ];

    for (const entry of removalPlan.linkRemovals) {
        const result = resultByUrl.get(entry.url);
        const stateEntry = currentState.links?.[entry.url] ?? {};
        const strikes = result?.status === 'GENERIC' ? stateEntry.genericStrikes : stateEntry.failStrikes;
        rows.push(`| link | ${result?.status ?? 'UNKNOWN'} | ${strikes ?? 0} | ${escapeTable(entry.company)} | ${escapeTable(entry.title)} | ${entry.url} |`);
    }

    for (const entry of removalPlan.pruneRemovals) {
        rows.push(`| oldest | PRUNE | pasteIndex ${entry.pasteIndex ?? 'none'} | ${escapeTable(entry.company)} | ${escapeTable(entry.title)} | ${entry.url} |`);
    }

    return rows.join('\n');
}

function nonOkTable(results, currentState, removalUrls) {
    const nonOk = results.filter((result) => !['OK', 'SKIPPED'].includes(result.status));
    if (nonOk.length === 0) return 'None.';

    return [
        '| Status | Strikes | Action | Company | Title | Code | Final URL |',
        '|--------|---------|--------|---------|-------|-----:|-----------|',
        ...nonOk.map((result) => {
            const stateEntry = currentState.links?.[result.url] ?? {};
            const strikes = result.status === 'GENERIC' ? stateEntry.genericStrikes : stateEntry.failStrikes;
            const action = removalUrls.has(result.url) ? 'remove in this PR' : 'keep watching';
            return `| ${result.status} | ${strikes ?? 0} | ${action} | ${escapeTable(result.company)} | ${escapeTable(result.title)} | ${result.code ?? 0} | ${result.finalUrl ?? result.url} |`;
        }),
    ].join('\n');
}

function escapeTable(value) {
    return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
