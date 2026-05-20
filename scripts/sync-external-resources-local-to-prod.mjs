/**
 * Upsert external-resources from local Strapi → production Strapi.
 * Never reads or deletes on local. Match prod rows by `url`.
 *
 * Usage (repo root):
 *   node scripts/sync-external-resources-local-to-prod.mjs --dry-run
 *   node scripts/sync-external-resources-local-to-prod.mjs
 *
 * Env (backend/.env):
 *   STRAPI_URL, FULL_ACCESS_API_TOKEN — source (local)
 *   PRODUCTION_STRAPI_URL, PRODUCTION_FULL_ACCESS_API_TOKEN — target (prod)
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRY_RUN = process.argv.includes('--dry-run');

function loadEnvFile() {
  const raw = readFileSync(join(REPO_ROOT, 'backend', '.env'), 'utf8');
  const get = (key) => {
    const match = raw.match(new RegExp(`^${key}=(.+)$`, 'm'));
    return match?.[1]?.trim();
  };
  return {
    localUrl: (process.env.LOCAL_STRAPI_URL ?? get('STRAPI_URL') ?? 'http://localhost:1337').replace(
      /\/$/,
      '',
    ),
    prodUrl: (process.env.PRODUCTION_STRAPI_URL ?? get('PRODUCTION_STRAPI_URL'))?.replace(/\/$/, ''),
    localKey: process.env.LOCAL_STRAPI_API_KEY ?? get('FULL_ACCESS_API_TOKEN'),
    prodKey: process.env.PRODUCTION_STRAPI_API_KEY ?? get('PRODUCTION_FULL_ACCESS_API_TOKEN'),
  };
}

const { localUrl, prodUrl, localKey, prodKey } = loadEnvFile();

if (!prodUrl || !prodKey) {
  throw new Error('Set PRODUCTION_STRAPI_URL and PRODUCTION_FULL_ACCESS_API_TOKEN in backend/.env');
}
if (!localKey) {
  throw new Error('Set FULL_ACCESS_API_TOKEN in backend/.env');
}

const SYNC_FIELDS = [
  'title',
  'description',
  'url',
  'category',
  'directoryTier',
  'resourceType',
  'badge',
  'officialStatus',
  'programType',
  'seasonalNote',
  'typicalOpenSeason',
  'careersHubUrl',
  'programSearchHint',
  'audienceSpecific',
  'bostonLocal',
  'riskFlag',
  'lastVerified',
  'relatedArticleSlug',
];

function flattenEntry(entry) {
  if (entry?.attributes && typeof entry.attributes === 'object') {
    return { ...entry.attributes, documentId: entry.documentId, id: entry.id };
  }
  return entry;
}

function pickPayload(flat) {
  const data = {};
  for (const key of SYNC_FIELDS) {
    if (flat[key] !== undefined && flat[key] !== null) {
      data[key] = flat[key];
    }
  }
  if (!data.directoryTier) {
    data.directoryTier =
      data.category === 'programs' ? 'recurring-program' : 'tools-and-communities';
  }
  return data;
}

async function fetchAllPages(baseUrl, apiKey, label) {
  const pageSize = 100;
  let page = 1;
  const all = [];
  for (;;) {
    const url = `${baseUrl}/api/external-resources?pagination[page]=${page}&pagination[pageSize]=${pageSize}&publicationState=preview`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${apiKey}` } });
    if (!res.ok) {
      throw new Error(`${label} GET failed ${res.status}: ${(await res.text()).slice(0, 200)}`);
    }
    const json = await res.json();
    const rows = json.data ?? [];
    all.push(...rows);
    const pageCount = json.meta?.pagination?.pageCount ?? 1;
    if (page >= pageCount || rows.length === 0) break;
    page += 1;
  }
  return all;
}

async function strapiWrite(baseUrl, apiKey, method, path, data) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ data }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return text ? JSON.parse(text) : {};
}

async function main() {
  console.log(`Source:  ${localUrl}`);
  console.log(`Target:  ${prodUrl}${DRY_RUN ? ' (dry-run)' : ''}\n`);

  const localRows = await fetchAllPages(localUrl, localKey, 'local');
  const prodRows = await fetchAllPages(prodUrl, prodKey, 'prod');
  const prodByUrl = new Map();
  for (const row of prodRows) {
    const flat = flattenEntry(row);
    const key = flat.url?.trim();
    const documentId = row.documentId ?? flat.documentId;
    if (key && documentId) prodByUrl.set(key, String(documentId));
  }

  console.log(`Local: ${localRows.length} | Prod before: ${prodRows.length}\n`);

  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const row of localRows) {
    const flat = flattenEntry(row);
    const data = pickPayload(flat);
    const label = data.title ?? data.url ?? 'row';
    const documentId = prodByUrl.get(data.url?.trim() ?? '');

    try {
      if (DRY_RUN) {
        console.log(`  [dry-run] ${documentId ? 'UPDATE' : 'CREATE'} ${label}`);
        continue;
      }
      if (documentId) {
        await strapiWrite(
          prodUrl,
          prodKey,
          'PUT',
          `/api/external-resources/${documentId}?status=published`,
          data,
        );
        console.log(`  UPDATE  ${label}`);
        updated++;
      } else {
        await strapiWrite(
          prodUrl,
          prodKey,
          'POST',
          '/api/external-resources?status=published',
          data,
        );
        console.log(`  CREATE  ${label}`);
        created++;
      }
    } catch (err) {
      failed++;
      console.error(`  FAIL    ${label}: ${err.message}`);
    }
  }

  console.log(`\nDone. Created: ${created}, updated: ${updated}, failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
