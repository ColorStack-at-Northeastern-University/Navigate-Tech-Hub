/**
 * parse-opportunities.mjs
 *
 * Converts a raw paste of ColorStack #opportunities Slack messages into structured
 * JSON for frontend/data/opportunities.ts.
 *
 * Usage:
 *   node scripts/parse-opportunities.mjs raw-opps.txt
 *   node scripts/parse-opportunities.mjs --anchor-date=2026-05-18 raw-opps.txt
 *   pbpaste | node scripts/parse-opportunities.mjs --anchor-date=2026-05-18
 *
 * Flags:
 *   --anchor-date=YYYY-MM-DD  Required for Today/Yesterday; default: today (UTC)
 *   DEBUG=1                   Include _lineContext and _parseWarnings on each row
 *
 * Posted-at fallback: paste order (pasteIndex, higher = newer in typical Slack copy).
 * Overrides: docs/config/opportunities-overrides.json
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';
import {
    lineToSegmentIndex,
    parseAnchorDate,
    segmentSlackPaste,
} from './lib/slack-post-dates.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OVERRIDES_PATH = path.join(ROOT, 'docs/config/opportunities-overrides.json');

const SKIP_PATTERNS = [
    /linkedin\.com\/feed\//,
    /linkedin\.com\/posts\//,
    /linkedin\.com\/redir\//,
    /colorstack-family\.slack\.com/,
    /app\.outlier\.ai\/expert\/referrals/,
    /curious-cardinals\.referral-factory/,
    /joinhandshake\.com\/move-program/,
    /docs\.google\.com\/forms/,
    /forms\.office\.com/,
    /surveymonkey\.com/,
    /adobeforeducation\.com\/student-ambassador/,
    /youtube\.com/,
    /nextofferup\.com/,
    /risehub\.site/,
    /paraform\.com\/share/,
    /forms\.gle\//,
    /bit\.ly\//,
    /lnkd\.in\//,
    /click\.appcast\.io/,
    /nightshift-agi\.com\/careers/,
    /pulse\.aws\/application/,
    /builder\.aws\.com/,
    /bmc\.com/,
];

function isSkippable(url) {
    return SKIP_PATTERNS.some((p) => p.test(url));
}

function guessType(title = '', company = '', url = '') {
    const t = (title + ' ' + url).toLowerCase();
    if (/co-?op/i.test(t)) return 'co-op';
    if (/new.?grad|recent.?grad|associate.*program/i.test(t)) return 'new-grad';
    if (/fellowship|residency|academy|summit|insight|early.id|apprentice/i.test(t)) return 'program';
    if (/scholarship/i.test(t)) return 'scholarship';
    if (/intern/i.test(t)) return 'internship';
    return 'other';
}

function loadOverrides() {
    if (!fs.existsSync(OVERRIDES_PATH)) return new Map();
    const raw = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
    const list = raw.overrides ?? [];
    const map = new Map();
    for (const entry of list) {
        if (entry?.url && entry?.postedAt) {
            map.set(entry.url, entry.postedAt);
        }
    }
    return map;
}

function parseCliArgs(argv) {
    let anchorDate = null;
    let filePath = null;
    for (const arg of argv.slice(2)) {
        if (arg.startsWith('--anchor-date=')) {
            anchorDate = arg.slice('--anchor-date='.length);
        } else if (!arg.startsWith('--')) {
            filePath = arg;
        }
    }
    return { anchorDate, filePath };
}

function extractContext(lines, urlLineIdx) {
    const urlLine = lines[urlLineIdx] || '';
    let company = '';
    let title = '';

    const domainMap = [
        [/careers\.sharkninja\.com/, 'SharkNinja'],
        [/jobs\.ashbyhq\.com\/Strava/, 'Strava'],
        [/draftkings\.wd1\.myworkdayjobs\.com/, 'DraftKings'],
        [/careers\.point72\.com/, 'Point72'],
        [/fiveringsllc/, 'Five Rings'],
        [/job-boards\.greenhouse\.io\/youcom/, 'You.com'],
        [/app\.ripplematch\.com/, 'eBay (via RippleMatch)'],
        [/nvidia\.wd5\.myworkdayjobs\.com/, 'NVIDIA'],
        [/jobs\.nvidia\.com/, 'NVIDIA'],
        [/janestreet\.com/, 'Jane Street'],
        [/careers\.google\.com/, 'Google'],
        [/applytofigfest2026\.figma\.site/, 'Figma'],
        [/paradigm\.xyz/, 'Paradigm'],
    ];

    for (const [pattern, co] of domainMap) {
        if (pattern.test(urlLine)) {
            company = co;
            break;
        }
    }

    const afterUrl = lines.slice(urlLineIdx + 1, urlLineIdx + 3).join(' ').trim();
    const titleMatch = afterUrl.match(/^([^|.\n]+)/);
    if (titleMatch) {
        title = titleMatch[1].trim().slice(0, 100);
    }

    return { company, title };
}

function resolvePostedAt(segment, overrides, url) {
    if (overrides.has(url)) {
        return { postedAt: overrides.get(url), postedAtSource: 'override' };
    }
    if (segment?.postedAt && segment.confidence === 'high') {
        return { postedAt: segment.postedAt, postedAtSource: 'slack' };
    }
    if (segment?.postedAt && segment.confidence === 'low') {
        return { postedAt: segment.postedAt, postedAtSource: 'inferred' };
    }
    return { postedAt: undefined, postedAtSource: 'paste-order' };
}

async function main() {
    const { anchorDate: anchorArg, filePath } = parseCliArgs(process.argv);
    const anchor = anchorArg
        ? parseAnchorDate(anchorArg)
        : parseAnchorDate(new Date().toISOString().slice(0, 10));

    let raw = '';
    if (filePath) {
        raw = fs.readFileSync(filePath, 'utf8');
    } else {
        const rl = readline.createInterface({ input: process.stdin });
        const lines = [];
        for await (const line of rl) lines.push(line);
        raw = lines.join('\n');
    }

    const lines = raw.split('\n');
    const segments = segmentSlackPaste(lines, anchor);
    const lineSeg = lineToSegmentIndex(segments, lines.length);
    const overrides = loadOverrides();
    const urlRegex = /https?:\/\/[^\s)"'>]+/g;

    /** @type {Map<string, object>} */
    const byUrl = new Map();
    let pasteIndex = 0;
    const stats = { slack: 0, inferred: 0, override: 0, pasteOrder: 0 };

    for (let i = 0; i < lines.length; i++) {
        const matches = lines[i].match(urlRegex);
        if (!matches) continue;

        for (const rawUrl of matches) {
            const url = rawUrl.replace(/[.,;!?)]+$/, '');
            if (isSkippable(url)) continue;

            pasteIndex += 1;
            const segment = segments[lineSeg[i]];
            const { postedAt, postedAtSource } = resolvePostedAt(segment, overrides, url);
            if (postedAtSource === 'slack') stats.slack += 1;
            else if (postedAtSource === 'inferred') stats.inferred += 1;
            else if (postedAtSource === 'override') stats.override += 1;
            else stats.pasteOrder += 1;

            const { company, title: guessedTitle } = extractContext(lines, i);
            const candidate = {
                title: guessedTitle || '(fill in title)',
                company: company || '(fill in company)',
                url,
                type: guessType(guessedTitle, company, url),
                tags: [],
                postedAt,
                postedAtSource,
                pasteIndex,
                _parseWarnings: [],
                _lineContext: lines.slice(Math.max(0, i - 1), i + 3).join(' | ').slice(0, 200),
            };

            const existing = byUrl.get(url);
            if (!existing) {
                byUrl.set(url, candidate);
                continue;
            }

            const existingPosted = existing.postedAt ? Date.parse(existing.postedAt) : 0;
            const candidatePosted = candidate.postedAt ? Date.parse(candidate.postedAt) : 0;
            if (candidatePosted > existingPosted || candidate.pasteIndex > existing.pasteIndex) {
                byUrl.set(url, candidate);
            }
        }
    }

    const results = [...byUrl.values()].map((row, idx) => {
        const { _lineContext, _parseWarnings, ...rest } = row;
        const base = { id: idx + 1, ...rest };
        if (process.env.DEBUG) {
            return { ...base, _lineContext, _parseWarnings };
        }
        return base;
    });

    console.log(JSON.stringify(results, null, 2));
    console.error(
        `\nExtracted ${results.length} unique opportunities.`,
        `\npostedAt: slack=${stats.slack} inferred=${stats.inferred} override=${stats.override} paste-order=${stats.pasteOrder}`,
        `\nAnchor date: ${anchor.toISOString().slice(0, 10)}`,
    );
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
