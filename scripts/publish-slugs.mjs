/**
 * Publish selected internal guides from repo drafts into Strapi.
 *
 * Usage (repo root):
 *   node scripts/publish-slugs.mjs --only slug-a,slug-b
 *   node scripts/publish-slugs.mjs --only slug-a,slug-b --dry-run
 *
 * Env: STRAPI_URL, STRAPI_API_KEY (or FULL_ACCESS_API_TOKEN from backend/.env)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { prepareArticleMarkdown } from './lib/article-markdown.mjs';
import { LAUNCH_GUIDE_SLUGS, START_HERE_SLUG } from './lib/launch-guides.mjs';
import { DOCS_ROOT } from './lib/docs-root.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INVENTORY_PATH = join(DOCS_ROOT, 'INTERNAL_GUIDE_INVENTORY.md');
const CARD_SUMMARIES_PATH = join(DOCS_ROOT, 'config', 'article-card-summaries.json');
const DRAFTS_ROOT = join(DOCS_ROOT, 'internal_resources_drafts');
const STRAPI_URL = (process.env.STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '');
const DRY_RUN = process.argv.includes('--dry-run');

function parseOnlySlugs() {
  const flag = process.argv.find((arg) => arg.startsWith('--only'));
  if (!flag) return null;
  const value = flag.includes('=') ? flag.split('=').slice(1).join('=') : process.argv[process.argv.indexOf(flag) + 1];
  if (!value || value.startsWith('--')) {
    throw new Error('Pass slugs: --only slug-a,slug-b or --only=slug-a,slug-b');
  }
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadApiKey() {
  if (process.env.STRAPI_API_KEY) return process.env.STRAPI_API_KEY.trim();
  const envPath = join(REPO_ROOT, 'backend', '.env');
  const raw = readFileSync(envPath, 'utf8');
  const match = raw.match(/^FULL_ACCESS_API_TOKEN\s*=\s*(.+)$/m);
  if (!match) throw new Error('FULL_ACCESS_API_TOKEN not found in backend/.env');
  return match[1].trim();
}

const API_KEY = loadApiKey();
const ONLY_SLUGS = parseOnlySlugs();

function loadCardSummaries() {
  const parsed = JSON.parse(readFileSync(CARD_SUMMARIES_PATH, 'utf8'));
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('article-card-summaries.json must be a slug → string map');
  }
  return parsed;
}

const CARD_SUMMARIES = loadCardSummaries();

function resolveCardDescription(slug, outcome) {
  const summary = CARD_SUMMARIES[slug];
  if (typeof summary === 'string' && summary.trim()) return summary.trim();
  if (typeof outcome === 'string' && outcome.trim()) return outcome.trim();
  throw new Error(`No card summary for "${slug}" in article-card-summaries.json`);
}

function parseInventoryTable(markdown) {
  const guides = [];
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|') || line.includes('---') || line.includes('Slug')) continue;
    const cols = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cols.length < 8) continue;
    const slug = cols[0];
    if (!/^[a-z0-9-]+$/.test(slug)) continue;
    guides.push({
      slug,
      title: cols[1],
      category: cols[2],
      audienceStage: cols[3].replace(/\s+/g, '-'),
      outcome: cols[4],
      timeToReadMinutes: Number.parseInt(cols[5], 10),
      contentVolatility: cols[6],
    });
  }
  return guides;
}

function readArticleBody(slug) {
  const path = join(DRAFTS_ROOT, slug, 'draft', 'article.md');
  if (!existsSync(path)) throw new Error(`Missing draft: ${path}`);
  return readFileSync(path, 'utf8');
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

async function fetchExistingBySlug() {
  const map = new Map();
  let page = 1;
  let pageCount = 1;
  while (page <= pageCount) {
    const json = await strapiFetch(
      `/api/resources?pagination[page]=${page}&pagination[pageSize]=100&fields[0]=slug&fields[1]=documentId`,
    );
    for (const row of json.data ?? []) {
      const slug = row.slug ?? row.attributes?.slug;
      const documentId = row.documentId ?? row.id;
      if (slug && documentId) map.set(slug, String(documentId));
    }
    pageCount = json.meta?.pagination?.pageCount ?? 1;
    if ((json.data ?? []).length === 0) break;
    page += 1;
  }
  return map;
}

function buildPayload(guide, content) {
  return {
    slug: guide.slug,
    title: guide.title,
    category: guide.category,
    description: resolveCardDescription(guide.slug, guide.outcome),
    content,
    audienceStage: guide.audienceStage,
    timeToReadMinutes: guide.timeToReadMinutes,
    outcome: guide.outcome,
    contentVolatility: guide.contentVolatility,
    tags: [],
    author: 'Navigate Tech Hub Team',
    featured: false,
    startHere: false,
  };
}

async function upsertGuide(guide, existingBySlug) {
  const content = prepareArticleMarkdown(readArticleBody(guide.slug), {
    articleTitle: guide.title,
  });
  const data = buildPayload(guide, content);
  const documentId = existingBySlug.get(guide.slug);

  if (DRY_RUN) {
    console.log(`  [dry-run] ${documentId ? 'UPDATE' : 'CREATE'} ${guide.slug} (${guide.category})`);
    return;
  }

  if (documentId) {
    await strapiFetch(`/api/resources/${documentId}?status=published`, {
      method: 'PUT',
      body: JSON.stringify({ data }),
    });
    console.log(`  UPDATE  ${guide.slug}`);
    return;
  }

  await strapiFetch('/api/resources?status=published', {
    method: 'POST',
    body: JSON.stringify({ data }),
  });
  console.log(`  CREATE  ${guide.slug}`);
}

async function main() {
  const slugFilter = ONLY_SLUGS ?? LAUNCH_GUIDE_SLUGS;
  const inventoryMd = readFileSync(INVENTORY_PATH, 'utf8');
  const allGuides = parseInventoryTable(inventoryMd);
  const guides = allGuides.filter((g) => slugFilter.includes(g.slug));

  const missing = slugFilter.filter((slug) => slug !== START_HERE_SLUG && !guides.find((g) => g.slug === slug));
  if (slugFilter.includes(START_HERE_SLUG)) {
    console.warn(
      `Note: "${START_HERE_SLUG}" is not in inventory — publish it separately or via configure-prod-launch.`,
    );
  }
  if (missing.length > 0) {
    throw new Error(`Slugs not in inventory: ${missing.join(', ')}`);
  }
  if (guides.length === 0) {
    throw new Error('No guides matched --only filter');
  }

  console.log(`Strapi: ${STRAPI_URL}${DRY_RUN ? ' (dry-run)' : ''}`);
  console.log(`Publishing ${guides.length} slug(s): ${guides.map((g) => g.slug).join(', ')}\n`);

  const existingBySlug = DRY_RUN ? new Map() : await fetchExistingBySlug();
  let failed = 0;

  for (const guide of guides) {
    try {
      await upsertGuide(guide, existingBySlug);
    } catch (err) {
      failed++;
      console.error(`  FAIL    ${guide.slug}: ${err.message}`);
    }
  }

  console.log(`\nDone.${failed > 0 ? ` Failed: ${failed}` : ''}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
