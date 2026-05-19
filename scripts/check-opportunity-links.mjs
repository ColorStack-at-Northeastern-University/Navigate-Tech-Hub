/**
 * check-opportunity-links.mjs
 *
 * Checks all URLs in frontend/data/opportunities.ts for dead links.
 * Uses the same HEAD-request strategy as scripts/verify-external-urls.mjs.
 *
 * Usage:
 *   node scripts/check-opportunity-links.mjs
 *
 * Output:
 *   Prints a report to stdout and exits with code 1 if any FAIL links found.
 *   OK      — link resolved (2xx or 3xx to a real page)
 *   FAIL    — 404 or connection error
 *   GENERIC — redirected to a generic careers/jobs homepage (probably dead program)
 *
 * The GENERIC detection uses a list of known generic redirect destinations.
 */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

// ---------------------------------------------------------------------------
// Inline the opportunity URLs from the TS file
// We parse them with a regex since we can't import TS directly.
// ---------------------------------------------------------------------------

const DATA_FILE = new URL('../frontend/data/opportunities.ts', import.meta.url);
const src = readFileSync(DATA_FILE, 'utf8');

// Extract all url: '...' values from the array
const urlMatches = [...src.matchAll(/url:\s*['"]([^'"]+)['"]/g)];
const titleMatches = [...src.matchAll(/title:\s*['"]([^'"]+)['"]/g)];
const companyMatches = [...src.matchAll(/company:\s*['"]([^'"]+)['"]/g)];

if (urlMatches.length === 0) {
    console.error('No URLs found in frontend/data/opportunities.ts — check the file format.');
    process.exit(1);
}

const entries = urlMatches.map((m, i) => ({
    url: m[1],
    title: titleMatches[i]?.[1] ?? '(unknown)',
    company: companyMatches[i]?.[1] ?? '(unknown)',
}));

// ---------------------------------------------------------------------------
// Known generic career hub destinations (redirected dead links)
// ---------------------------------------------------------------------------

const GENERIC_PATTERNS = [
    /careers\.(amazon|google|microsoft|apple|meta)\.com\/?$/i,
    /jobs\.(amazon|google)\.com\/?$/i,
    /\/jobs\/?$/,
    /\/careers\/?$/,
    /\/university-recruiting\/?$/,
    /workday\.com\/.*\/jobs\/?$/,
];

function isGeneric(finalUrl) {
    return GENERIC_PATTERNS.some((p) => p.test(finalUrl));
}

// ---------------------------------------------------------------------------
// Check a single URL
// ---------------------------------------------------------------------------

async function checkUrl(url, timeout = 10_000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
        const res = await fetch(url, {
            method: 'HEAD',
            redirect: 'follow',
            signal: controller.signal,
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; NavigateBot/1.0; link-check)',
            },
        });

        const finalUrl = res.url;
        const status = res.status;

        if (status >= 400) return { status: 'FAIL', code: status, finalUrl };
        if (isGeneric(finalUrl)) return { status: 'GENERIC', code: status, finalUrl };
        return { status: 'OK', code: status, finalUrl };
    } catch (err) {
        // Some servers reject HEAD; retry with GET
        if (err.name !== 'AbortError') {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    redirect: 'follow',
                    signal: controller.signal,
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; NavigateBot/1.0; link-check)',
                    },
                });
                const finalUrl = res.url;
                const status = res.status;
                if (status >= 400) return { status: 'FAIL', code: status, finalUrl };
                if (isGeneric(finalUrl)) return { status: 'GENERIC', code: status, finalUrl };
                return { status: 'OK', code: status, finalUrl };
            } catch {
                // fall through
            }
        }
        return { status: 'FAIL', code: 0, finalUrl: url, error: err.message };
    } finally {
        clearTimeout(timer);
    }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const CONCURRENCY = 5;

async function main() {
    console.log(`Checking ${entries.length} opportunity links...\n`);

    const results = [];

    // Process in batches
    for (let i = 0; i < entries.length; i += CONCURRENCY) {
        const batch = entries.slice(i, i + CONCURRENCY);
        const batchResults = await Promise.all(
            batch.map(async (entry) => {
                const result = await checkUrl(entry.url);
                return { ...entry, ...result };
            })
        );
        results.push(...batchResults);

        for (const r of batchResults) {
            const icon = r.status === 'OK' ? '✅' : r.status === 'GENERIC' ? '⚠️ ' : '❌';
            console.log(`${icon} [${r.status}] ${r.company} — ${r.title}`);
            if (r.status !== 'OK') {
                console.log(`   URL:   ${r.url}`);
                if (r.error) console.log(`   Error: ${r.error}`);
            }
        }
    }

    const ok = results.filter((r) => r.status === 'OK').length;
    const fail = results.filter((r) => r.status === 'FAIL').length;
    const generic = results.filter((r) => r.status === 'GENERIC').length;

    console.log(`\n─────────────────────────────────`);
    console.log(`✅  OK:      ${ok}`);
    console.log(`⚠️   GENERIC: ${generic}`);
    console.log(`❌  FAIL:    ${fail}`);
    console.log(`─────────────────────────────────`);

    if (fail > 0) {
        console.log('\nFAIL links to remove or fix:');
        results.filter((r) => r.status === 'FAIL').forEach((r) => {
            console.log(`  • ${r.company} — ${r.title}: ${r.url}`);
        });
        process.exit(1);
    }
}

main().catch((e) => { console.error(e); process.exit(1); });
