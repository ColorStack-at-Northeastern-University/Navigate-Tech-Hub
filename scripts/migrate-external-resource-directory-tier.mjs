/**
 * One-off migration: set `directoryTier` on existing Strapi external-resources.
 *
 * Rules:
 *   - category === 'programs'  → recurring-program
 *   - else                       → tools-and-communities
 *
 * Does not set seasonalNote (old application fields are gone from the API).
 * Run Strapi locally first, review a few rows in Admin, then production.
 *
 * Usage (from repo root):
 *   node scripts/migrate-external-resource-directory-tier.mjs
 *
 * Env:
 *   STRAPI_URL              default http://localhost:1337
 *   STRAPI_API_KEY          overrides token read from backend/.env (FULL_ACCESS_API_TOKEN)
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';

function loadApiKey() {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const envPath = join(scriptDir, '..', 'backend', '.env');
  try {
    const raw = readFileSync(envPath, 'utf8');
    const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
    if (!match) throw new Error('FULL_ACCESS_API_TOKEN not found');
    return match[1].trim();
  } catch (err) {
    throw new Error(`Could not read backend/.env: ${err.message}. Set STRAPI_API_KEY.`);
  }
}

const API_KEY = process.env.STRAPI_API_KEY ?? loadApiKey();

function flattenEntry(entry) {
  if (entry.attributes && typeof entry.attributes === 'object') {
    return {
      ...entry.attributes,
      documentId: entry.documentId,
      id: entry.id,
    };
  }
  return entry;
}

function tierForEntry(flat) {
  const cat = flat.category;
  return cat === 'programs' ? 'recurring-program' : 'tools-and-communities';
}

function pickDocumentId(entry) {
  return entry.documentId ?? entry.document_id ?? entry.id;
}

async function fetchAllPages() {
  const pageSize = 100;
  let page = 1;
  const all = [];
  for (;;) {
    const url = `${STRAPI_URL}/api/external-resources?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!res.ok) {
      throw new Error(`GET failed ${res.status}: ${await res.text()}`);
    }
    const json = await res.json();
    const rows = json.data ?? [];
    const flat = Array.isArray(rows) ? rows : [rows];
    all.push(...flat);
    const pageCount = json.meta?.pagination?.pageCount ?? 1;
    if (page >= pageCount || flat.length === 0) break;
    page += 1;
  }
  return all;
}

async function updateEntry(documentId, directoryTier) {
  const url = `${STRAPI_URL}/api/external-resources/${documentId}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ data: { directoryTier } }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PUT ${documentId} failed ${res.status}: ${text}`);
  }
}

async function main() {
  console.log(`Strapi: ${STRAPI_URL}`);
  const entries = await fetchAllPages();
  console.log(`Found ${entries.length} external-resource rows.\n`);

  let updated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const flat = flattenEntry(entry);
    const currentTier = flat.directoryTier;
    const desired = tierForEntry(flat);
    const documentId = pickDocumentId(entry);

    if (!documentId) {
      console.warn('  SKIP (no id)', flat.title ?? JSON.stringify(entry).slice(0, 80));
      skipped++;
      continue;
    }

    if (currentTier === desired) {
      console.log(`  OK    ${flat.title ?? documentId} (${desired})`);
      skipped++;
      continue;
    }

    await updateEntry(documentId, desired);
    console.log(`  SET   ${flat.title ?? documentId} → ${desired}`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, unchanged/skip: ${skipped}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
