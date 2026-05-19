/**
 * Enriches recurring-program external resources with cycle metadata.
 * Does NOT delete entries. Sets careersHubUrl, typicalOpenSeason, programSearchHint,
 * and seasonalNote (when missing, or with --overwrite-notes).
 *
 * Optional: pass path to verify report JSON from verify-external-urls.mjs
 *
 * Usage:
 *   node scripts/enrich-recurring-programs.mjs --dry-run
 *   node scripts/enrich-recurring-programs.mjs
 *   node scripts/enrich-recurring-programs.mjs --overwrite-notes
 */

import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  buildSeasonalNote,
  defaultSeasonForProgramType,
  deriveProgramSearchHint,
} from './lib/program-cycle.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const DRY_RUN = process.argv.includes('--dry-run');
const OVERWRITE_NOTES = process.argv.includes('--overwrite-notes');

function loadApiKey() {
  if (process.env.STRAPI_API_KEY) return process.env.STRAPI_API_KEY.trim();
  const raw = readFileSync(join(REPO_ROOT, 'backend', '.env'), 'utf8');
  const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
  if (!match) throw new Error('FULL_ACCESS_API_TOKEN missing in backend/.env');
  return match[1].trim();
}

function loadLatestVerifyReport() {
  const reportsDir = join(REPO_ROOT, 'scripts', 'reports');
  let files;
  try {
    files = readdirSync(reportsDir)
      .filter((f) => f.startsWith('external-url-verify-') && f.endsWith('.json'))
      .sort();
  } catch {
    return new Map();
  }
  if (files.length === 0) return new Map();
  const latest = join(reportsDir, files[files.length - 1]);
  const report = JSON.parse(readFileSync(latest, 'utf8'));
  const byDocId = new Map();
  for (const row of report.results ?? []) {
    if (row.documentId) byDocId.set(row.documentId, row);
  }
  console.log(`Using verify report: ${latest} (${byDocId.size} rows)\n`);
  return byDocId;
}

async function fetchRecurringPrograms(token) {
  const rows = [];
  let page = 1;
  let pageCount = 1;
  while (page <= pageCount) {
    const res = await fetch(
      `${STRAPI_URL}/api/external-resources?` +
        `filters[directoryTier][$eq]=recurring-program&` +
        `pagination[page]=${page}&pagination[pageSize]=100`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const json = await res.json();
    rows.push(...(json.data ?? []));
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    page += 1;
  }
  return rows;
}

function pickCareersHubUrl(row, verify) {
  if (verify?.genericLanding && verify.finalUrl) return verify.finalUrl;
  if (verify && !verify.ok && verify.finalUrl) return verify.finalUrl;
  if (row.careersHubUrl?.trim()) return row.careersHubUrl.trim();
  return row.url?.trim() ?? '';
}

async function updateEntry(token, documentId, payload) {
  const res = await fetch(`${STRAPI_URL}/api/external-resources/${documentId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${documentId} failed ${res.status}: ${text}`);
  }
}

async function main() {
  const token = loadApiKey();
  const verifyById = loadLatestVerifyReport();
  const rows = await fetchRecurringPrograms(token);

  console.log(`Enriching ${rows.length} recurring programs${DRY_RUN ? ' (dry-run)' : ''}…\n`);

  let updated = 0;
  for (const row of rows) {
    const verify = verifyById.get(row.documentId);
    const typicalOpenSeason =
      row.typicalOpenSeason ?? defaultSeasonForProgramType(row.programType);
    const careersHubUrl = pickCareersHubUrl(row, verify);
    const programSearchHint =
      row.programSearchHint?.trim() || deriveProgramSearchHint(row.title);
    const seasonalNote =
      OVERWRITE_NOTES || !row.seasonalNote?.trim()
        ? buildSeasonalNote({
            title: row.title,
            typicalOpenSeason,
            careersHubUrl,
            programSearchHint,
          })
        : row.seasonalNote.trim();

    const payload = {
      typicalOpenSeason,
      careersHubUrl,
      programSearchHint,
      seasonalNote,
    };

    const tag = verify?.genericLanding ? 'GENERIC' : verify && !verify.ok ? 'FAIL' : 'OK';
    console.log(`  [${tag}] ${row.title}`);

    if (!DRY_RUN) {
      await updateEntry(token, row.documentId, payload);
      updated += 1;
    }
  }

  console.log(`\nDone.${DRY_RUN ? ' Re-run without --dry-run to write.' : ` Updated ${updated} entries.`}`);
  console.log('Restart Strapi if new schema fields are not visible yet.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
