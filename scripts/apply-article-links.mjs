/**
 * Apply editorial link graph to Strapi:
 *   1) relatedArticleSlug on External Resources (guide ↔ directory)
 *   2) relatedArticles on Resources (guide ↔ guide)
 *
 * Config:
 *   internal-docs/config/article-external-links.json
 *   internal-docs/config/article-related-articles.json
 *   internal-docs/INTERNAL_GUIDE_INVENTORY.md (slug → category)
 *
 * Usage:
 *   node scripts/apply-article-links.mjs
 *   node scripts/apply-article-links.mjs --dry-run
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { DOCS_ROOT } from './lib/docs-root.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337';
const DRY_RUN = process.argv.includes('--dry-run');

function loadApiKey() {
  if (process.env.STRAPI_API_KEY) return process.env.STRAPI_API_KEY.trim();
  const envPath = join(REPO_ROOT, 'backend', '.env');
  const raw = readFileSync(envPath, 'utf8');
  const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
  if (!match) throw new Error('FULL_ACCESS_API_TOKEN not found in backend/.env');
  return match[1].trim();
}

const API_KEY = loadApiKey();

function parseSlugCategoryMap(markdown) {
  const map = new Map();
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|') || line.includes('---') || line.includes('Slug')) continue;
    const cols = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cols.length >= 3 && /^[a-z0-9-]+$/.test(cols[0])) {
      map.set(cols[0], cols[2]);
    }
  }
  return map;
}

function loadJson(path) {
  const raw = JSON.parse(readFileSync(path, 'utf8'));
  const { _comment, ...rest } = raw;
  return rest;
}

async function strapiFetch(path, options = {}) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
      ...options.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} → ${res.status}: ${text.slice(0, 400)}`);
  }
  return text ? JSON.parse(text) : {};
}

async function fetchAll(endpoint, fields) {
  const rows = [];
  let page = 1;
  let pageCount = 1;
  const fieldParams = fields.map((f, i) => `fields[${i}]=${encodeURIComponent(f)}`).join('&');
  while (page <= pageCount) {
    const json = await strapiFetch(
      `/api/${endpoint}?pagination[page]=${page}&pagination[pageSize]=100&${fieldParams}`,
    );
    const batch = json.data ?? [];
    rows.push(...batch);
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    if (batch.length === 0) break;
    page += 1;
  }
  return rows;
}

function flatten(row) {
  if (row.attributes && typeof row.attributes === 'object') {
    return { ...row.attributes, documentId: row.documentId, id: row.id };
  }
  return row;
}

async function applyExternalLinks(slugToCategory, externalTitleMap) {
  const externals = await fetchAll('external-resources', ['title', 'documentId', 'relatedArticleSlug']);
  let updated = 0;

  for (const raw of externals) {
    const row = flatten(raw);
    const title = row.title ?? '';
    const documentId = row.documentId ?? row.id;
    if (!documentId || !title) continue;

    let targetSlug = null;
    let targetCategory = null;

    for (const [slug, patterns] of Object.entries(externalTitleMap)) {
      if (!Array.isArray(patterns)) continue;
      const category = slugToCategory.get(slug);
      if (!category) continue;
      const hit = patterns.some((p) => title.toLowerCase().includes(p.toLowerCase()));
      if (hit) {
        targetSlug = slug;
        targetCategory = category;
        break;
      }
    }

    if (!targetSlug || !targetCategory) continue;

    const relatedArticleSlug = `${targetCategory}/${targetSlug}`;
    if (row.relatedArticleSlug === relatedArticleSlug) continue;

    if (DRY_RUN) {
      console.log(`  [dry-run] external "${title}" → ${relatedArticleSlug}`);
    } else {
      await strapiFetch(`/api/external-resources/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({ data: { relatedArticleSlug } }),
      });
      console.log(`  external "${title}" → ${relatedArticleSlug}`);
    }
    updated++;
  }

  return updated;
}

async function applyRelatedArticles(relatedMap) {
  const resources = await fetchAll('resources', ['slug', 'documentId']);
  const slugToDocId = new Map();
  for (const raw of resources) {
    const row = flatten(raw);
    if (row.slug && row.documentId) slugToDocId.set(row.slug, row.documentId);
  }

  let updated = 0;

  for (const [slug, relatedSlugs] of Object.entries(relatedMap)) {
    if (!Array.isArray(relatedSlugs)) continue;
    const documentId = slugToDocId.get(slug);
    if (!documentId) {
      console.warn(`  SKIP relatedArticles — no resource for slug ${slug}`);
      continue;
    }

    const connect = relatedSlugs
      .slice(0, 3)
      .map((s) => slugToDocId.get(s))
      .filter(Boolean)
      .map((id) => ({ documentId: id }));

    if (connect.length === 0) continue;

    if (DRY_RUN) {
      console.log(`  [dry-run] resource ${slug} → ${relatedSlugs.slice(0, 3).join(', ')}`);
    } else {
      await strapiFetch(`/api/resources/${documentId}`, {
        method: 'PUT',
        body: JSON.stringify({
          data: {
            relatedArticles: { set: connect },
          },
        }),
      });
      console.log(`  resource ${slug} → ${relatedSlugs.slice(0, 3).join(', ')}`);
    }
    updated++;
  }

  return updated;
}

async function main() {
  console.log(`Apply article links — ${STRAPI_URL}${DRY_RUN ? ' (dry-run)' : ''}\n`);

  const slugToCategory = parseSlugCategoryMap(
    readFileSync(join(DOCS_ROOT, 'INTERNAL_GUIDE_INVENTORY.md'), 'utf8'),
  );
  const externalTitleMap = loadJson(join(DOCS_ROOT, 'config', 'article-external-links.json'));
  const relatedMap = loadJson(join(DOCS_ROOT, 'config', 'article-related-articles.json'));

  console.log('External resources (relatedArticleSlug):');
  const extCount = await applyExternalLinks(slugToCategory, externalTitleMap);

  console.log('\nInternal guides (relatedArticles):');
  const relCount = await applyRelatedArticles(relatedMap);

  console.log(`\nDone. External updates: ${extCount}, Resource relation updates: ${relCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
