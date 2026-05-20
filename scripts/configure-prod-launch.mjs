/**
 * Prod launch visibility: unpublish non-launch guides, set featured + startHere flags.
 *
 * Usage (repo root, prod credentials in backend/.env):
 *   node scripts/configure-prod-launch.mjs --dry-run
 *   node scripts/configure-prod-launch.mjs
 *
 * Env overrides:
 *   STRAPI_URL (default PRODUCTION_STRAPI_URL from backend/.env)
 *   STRAPI_API_KEY (default PRODUCTION_FULL_ACCESS_API_TOKEN)
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  FEATURED_GUIDE_SLUGS,
  PUBLISHED_LAUNCH_SLUGS,
  START_HERE_SLUG,
} from './lib/launch-guides.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRY_RUN = process.argv.includes('--dry-run');

function loadEnv() {
  const raw = readFileSync(join(REPO_ROOT, 'backend', '.env'), 'utf8');
  const get = (key) => raw.match(new RegExp(`^${key}=(.+)$`, 'm'))?.[1]?.trim();
  return {
    baseUrl: (process.env.STRAPI_URL ?? get('PRODUCTION_STRAPI_URL') ?? '').replace(/\/$/, ''),
    apiKey: process.env.STRAPI_API_KEY ?? get('PRODUCTION_FULL_ACCESS_API_TOKEN'),
  };
}

const { baseUrl, apiKey } = loadEnv();
if (!baseUrl || !apiKey) {
  throw new Error('Set PRODUCTION_STRAPI_URL and PRODUCTION_FULL_ACCESS_API_TOKEN in backend/.env');
}

const publishedSet = new Set(PUBLISHED_LAUNCH_SLUGS);
const featuredSet = new Set(FEATURED_GUIDE_SLUGS);

async function strapiFetch(path, options = {}) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      ...options.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return text ? JSON.parse(text) : {};
}

async function fetchAllPublishedResources() {
  const rows = [];
  let page = 1;
  let pageCount = 1;
  while (page <= pageCount) {
    const json = await strapiFetch(
      `/api/resources?pagination[page]=${page}&pagination[pageSize]=100&publicationState=live&fields[0]=slug&fields[1]=documentId&fields[2]=featured&fields[3]=startHere`,
    );
    rows.push(...(json.data ?? []));
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    if ((json.data ?? []).length === 0) break;
    page += 1;
  }
  return rows;
}

/**
 * Strapi Cloud returns 405 for POST .../actions/unpublish on custom types.
 * DELETE with status=published removes the live version (repo + local Strapi keep copies).
 */
async function unpublishResource(documentId, slug) {
  if (DRY_RUN) {
    console.log(`  [dry-run] UNPUBLISH ${slug}`);
    return;
  }
  await strapiFetch(`/api/resources/${documentId}?status=published`, { method: 'DELETE' });
  console.log(`  UNPUBLISH ${slug}`);
}

async function updateFlags(documentId, slug, data) {
  if (DRY_RUN) {
    console.log(`  [dry-run] UPDATE ${slug}`, data);
    return;
  }
  await strapiFetch(`/api/resources/${documentId}?status=published`, {
    method: 'PUT',
    body: JSON.stringify({ data }),
  });
  console.log(`  UPDATE ${slug}`, Object.keys(data).join(', '));
}

async function main() {
  console.log(`Strapi: ${baseUrl}${DRY_RUN ? ' (dry-run)' : ''}`);
  console.log(`Published slugs (${publishedSet.size}): ${[...publishedSet].join(', ')}`);
  console.log(`Featured (${featuredSet.size}): ${[...featuredSet].join(', ')}\n`);

  const rows = await fetchAllPublishedResources();
  console.log(`Live resources on target: ${rows.length}\n`);

  let unpublished = 0;
  let flagUpdates = 0;

  for (const row of rows) {
    const slug = row.slug;
    const documentId = row.documentId;
    if (!slug || !documentId) continue;

    if (!publishedSet.has(slug)) {
      await unpublishResource(documentId, slug);
      unpublished++;
      continue;
    }

    const wantFeatured = featuredSet.has(slug);
    const wantStartHere = slug === START_HERE_SLUG;
    const patch = {};
    if (Boolean(row.featured) !== wantFeatured) patch.featured = wantFeatured;
    if (Boolean(row.startHere) !== wantStartHere) patch.startHere = wantStartHere;

    if (Object.keys(patch).length > 0) {
      await updateFlags(documentId, slug, patch);
      flagUpdates++;
    } else {
      console.log(`  OK      ${slug}`);
    }
  }

  const missingPublished = PUBLISHED_LAUNCH_SLUGS.filter(
    (slug) => !rows.some((row) => row.slug === slug),
  );
  if (missingPublished.length > 0) {
    console.warn(`\nNot currently live (publish first): ${missingPublished.join(', ')}`);
  }

  console.log(`\nDone. Unpublished: ${unpublished}, flag updates: ${flagUpdates}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
