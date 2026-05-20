/**
 * Global ingest rank for carousel sort (pasteIndex field).
 * Higher number = added more recently = closer to front (after deadline rows).
 */

import { readFileSync } from 'fs';

/**
 * @param {Array<{ id?: number, pasteIndex?: number }>} items
 */
export function maxIngestRank(items) {
  let max = 0;
  for (const item of items) {
    max = Math.max(max, item.pasteIndex ?? 0, item.id ?? 0);
  }
  return max;
}

/**
 * Parser rows use batch-local pasteIndex (1 = top of Slack paste, higher = newer in batch).
 * @param {Array<{ url: string, pasteIndex?: number }>} parsedRows
 * @param {number} baseRank max rank already in opportunities.ts
 * @returns {Map<string, number>} url → global pasteIndex
 */
export function globalRanksForParsedBatch(parsedRows, baseRank) {
  const sorted = [...parsedRows].sort(
    (a, b) => (a.pasteIndex ?? 0) - (b.pasteIndex ?? 0),
  );
  let next = baseRank;
  const byUrl = new Map();
  for (const row of sorted) {
    next += 1;
    byUrl.set(row.url, next);
  }
  return byUrl;
}

/**
 * Read max(id) and max(pasteIndex) from opportunities.ts without importing TS.
 * @param {string} filePath
 */
export function maxRankFromOpportunitiesFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const numbers = [];
  for (const match of content.matchAll(/\b(?:id|pasteIndex):\s*(\d+)/g)) {
    numbers.push(Number.parseInt(match[1], 10));
  }
  return numbers.length === 0 ? 0 : Math.max(...numbers);
}
