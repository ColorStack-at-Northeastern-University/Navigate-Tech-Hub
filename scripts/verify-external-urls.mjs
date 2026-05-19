/**
 * HEAD-check external-resource URLs in Strapi. Flags 404, redirects to generic
 * career hubs, and slow responses. Output: JSON report under scripts/reports/.
 *
 * Usage: node scripts/verify-external-urls.mjs
 *        node scripts/verify-external-urls.mjs --tier recurring-program
 */

import { readFileSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const TIER_FILTER = process.argv.includes('--tier')
  ? process.argv[process.argv.indexOf('--tier') + 1]
  : null;

const GENERIC_PATH_HINTS = [
  '/careers',
  '/jobs',
  '/university',
  '/students',
  '/early-career',
  '/campus',
];

function loadApiKey() {
  if (process.env.STRAPI_API_KEY) return process.env.STRAPI_API_KEY.trim();
  const raw = readFileSync(join(REPO_ROOT, 'backend', '.env'), 'utf8');
  const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
  if (!match) throw new Error('FULL_ACCESS_API_TOKEN missing');
  return match[1].trim();
}

async function fetchAllExternals(token) {
  const rows = [];
  let page = 1;
  let pageCount = 1;
  while (page <= pageCount) {
    const res = await fetch(
      `${STRAPI_URL}/api/external-resources?pagination[page]=${page}&pagination[pageSize]=100&fields[0]=title&fields[1]=url&fields[2]=directoryTier&fields[3]=documentId`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const json = await res.json();
    rows.push(...(json.data ?? []));
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    page += 1;
  }
  return rows;
}

async function checkUrl(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'NavigateTechHub-LinkVerifier/1.0' },
    });
    clearTimeout(timeout);
    const finalUrl = res.url;
    const path = new URL(finalUrl).pathname.toLowerCase();
    const genericLanding = GENERIC_PATH_HINTS.some((hint) => path === hint || path.endsWith(hint));
    return {
      status: res.status,
      finalUrl,
      genericLanding,
      ok: res.status >= 200 && res.status < 400,
    };
  } catch (err) {
    clearTimeout(timeout);
    return { status: 0, finalUrl: url, genericLanding: false, ok: false, error: String(err) };
  }
}

async function main() {
  const token = loadApiKey();
  let rows = await fetchAllExternals(token);
  if (TIER_FILTER) {
    rows = rows.filter((r) => r.directoryTier === TIER_FILTER);
  }

  console.log(`Checking ${rows.length} URLs…\n`);

  const report = { checkedAt: new Date().toISOString(), results: [] };

  for (const row of rows) {
    const url = row.url?.trim();
    if (!url) continue;
    const result = await checkUrl(url);
    const entry = {
      title: row.title,
      documentId: row.documentId,
      directoryTier: row.directoryTier,
      url,
      ...result,
    };
    report.results.push(entry);
    const flag = !result.ok
      ? 'FAIL'
      : result.genericLanding
        ? 'GENERIC'
        : 'OK';
    console.log(`${flag.padEnd(7)} ${row.title}`);
    if (result.finalUrl !== url) console.log(`         → ${result.finalUrl}`);
  }

  const failed = report.results.filter((r) => !r.ok);
  const generic = report.results.filter((r) => r.ok && r.genericLanding);

  const outDir = join(REPO_ROOT, 'scripts', 'reports');
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, `external-url-verify-${Date.now()}.json`);
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  console.log(`\nSummary: ${report.results.length} checked, ${failed.length} failed, ${generic.length} generic career landings`);
  console.log(`Report: ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
