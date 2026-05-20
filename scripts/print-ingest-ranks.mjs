/**
 * Print global pasteIndex values for a parser JSON file (stdout).
 * Use when merging new rows into frontend/data/opportunities.ts.
 *
 * Usage:
 *   node scripts/parse-opportunities.mjs --anchor-date=YYYY-MM-DD inbox/raw.txt > inbox/parsed.json
 *   node scripts/print-ingest-ranks.mjs internal-docs/opportunities-radar/inbox/parsed.json
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  globalRanksForParsedBatch,
  maxRankFromOpportunitiesFile,
} from './lib/opportunity-ingest-rank.mjs';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OPPORTUNITIES_PATH = join(REPO_ROOT, 'frontend', 'data', 'opportunities.ts');

const parsedPath = process.argv[2];
if (!parsedPath) {
  console.error('Usage: node scripts/print-ingest-ranks.mjs <parsed.json>');
  process.exit(1);
}

const parsed = JSON.parse(readFileSync(parsedPath, 'utf8'));
if (!Array.isArray(parsed)) {
  console.error('Expected JSON array from parse-opportunities.mjs');
  process.exit(1);
}

const base = maxRankFromOpportunitiesFile(OPPORTUNITIES_PATH);
const ranks = globalRanksForParsedBatch(parsed, base);

console.log(`Base rank in opportunities.ts: ${base}\n`);
for (const row of parsed) {
  const global = ranks.get(row.url);
  console.log(
    `${global}\tbatch pasteIndex ${row.pasteIndex}\t${row.company || '?'}\t${row.url}`,
  );
}
console.log('\nSet pasteIndex on each new/updated row to the first column (higher = newer in carousel).');
