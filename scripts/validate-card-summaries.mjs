/**
 * Ensures every inventory slug has a card summary before publish.
 * Usage: node scripts/validate-card-summaries.mjs
 */
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const INVENTORY_PATH = join(REPO_ROOT, 'docs', 'INTERNAL_GUIDE_INVENTORY.md');
const CARD_SUMMARIES_PATH = join(REPO_ROOT, 'docs', 'config', 'article-card-summaries.json');

function parseInventorySlugs(markdown) {
  const slugs = [];
  for (const line of markdown.split('\n')) {
    if (!line.startsWith('|') || line.includes('---') || line.includes('Slug')) continue;
    const cols = line.split('|').map((c) => c.trim()).filter(Boolean);
    if (cols.length < 8) continue;
    const slug = cols[0];
    if (/^[a-z0-9-]+$/.test(slug)) slugs.push(slug);
  }
  return slugs;
}

const inventorySlugs = parseInventorySlugs(readFileSync(INVENTORY_PATH, 'utf8'));
const summaries = JSON.parse(readFileSync(CARD_SUMMARIES_PATH, 'utf8'));

const missing = inventorySlugs.filter((slug) => !summaries[slug]?.trim());
const orphan = Object.keys(summaries).filter((slug) => !inventorySlugs.includes(slug));

if (missing.length > 0) {
  console.error('Missing card summaries for inventory slugs:\n', missing.join('\n '));
  process.exit(1);
}

if (orphan.length > 0) {
  console.warn('Card summaries not in inventory (ok if unpublished extras):\n', orphan.join('\n '));
}

console.log(`Card summaries: ok (${inventorySlugs.length} inventory slugs)`);
