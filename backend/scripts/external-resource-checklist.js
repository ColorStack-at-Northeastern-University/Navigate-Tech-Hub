/**
 * Runs QA from docs/EXTERNAL_RESOURCE_COVERAGE_AND_MAINTENANCE.md (section 7 + coverage matrix).
 *
 * Usage (Strapi must be running):
 *   node scripts/external-resource-checklist.js
 *
 * Optional: STRAPI_URL=http://localhost:1337
 */

// Default to 127.0.0.1: on some Windows setups `localhost` resolves to ::1 first and Strapi is IPv4-only.
const STRAPI_URL = process.env.STRAPI_URL || 'http://127.0.0.1:1337';

const CATEGORIES = [
  'interview-prep',
  'classes',
  'projects',
  'hackathons',
  'community',
];
const RESOURCE_TYPES = [
  'learning-platform',
  'opportunities-board',
  'scholarship-funding',
  'community-network',
  'events-conference',
  'career-tool',
  'documentation-reference',
];

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function normalizeUrlKey(raw) {
  try {
    const u = new URL(String(raw).trim());
    const path = u.pathname.replace(/\/+$/, '') || '/';
    return `${u.protocol}//${u.hostname.toLowerCase()}${path}`.replace(/^http:\/\//i, 'https://');
  } catch {
    return String(raw).trim().toLowerCase();
  }
}

async function checkUrl(url, timeoutMs = 12000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res = await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      redirect: 'follow',
    });
    if (res.status === 405 || res.status === 501 || res.status === 403) {
      res = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        redirect: 'follow',
        headers: { Range: 'bytes=0-0' },
      });
    }
    const ok = res.ok || res.status === 304 || (res.status >= 200 && res.status < 400);
    return { ok, status: res.status, method: res.url !== url ? 'redirect' : 'head/get' };
  } catch (err) {
    return { ok: false, status: null, error: err.name === 'AbortError' ? 'timeout' : String(err.message) };
  } finally {
    clearTimeout(id);
  }
}

async function main() {
  const apiUrl = `${STRAPI_URL}/api/external-resources?pagination[pageSize]=200`;
  let res;
  try {
    res = await fetch(apiUrl);
  } catch (e) {
    console.error(`Cannot reach Strapi at ${STRAPI_URL}: ${e.message}`);
    process.exit(2);
  }
  if (!res.ok) {
    console.error(`Strapi returned ${res.status} for ${apiUrl}`);
    process.exit(2);
  }
  const json = await res.json();
  const rows = json.data || [];

  console.log('=== External resource checklist ===\n');
  console.log(`Strapi: ${STRAPI_URL}`);
  console.log(`Entries: ${rows.length}\n`);

  const issues = [];
  const matrix = Object.fromEntries(CATEGORIES.map((c) => [c, Object.fromEntries(RESOURCE_TYPES.map((t) => [t, 0]))]));

  const urlMap = new Map();

  for (const row of rows) {
    const title = row.title;
    const desc = row.description;
    const url = row.url;
    const cat = row.category;
    const rt = row.resourceType;

    if (!isNonEmptyString(title)) issues.push({ type: 'required', field: 'title', documentId: row.documentId });
    if (!isNonEmptyString(desc)) issues.push({ type: 'required', field: 'description', documentId: row.documentId, title });
    if (!isNonEmptyString(url)) issues.push({ type: 'required', field: 'url', documentId: row.documentId, title });
    if (!CATEGORIES.includes(cat)) {
      issues.push({ type: 'enum', field: 'category', value: cat, title });
    }
    if (!RESOURCE_TYPES.includes(rt)) {
      issues.push({ type: 'enum', field: 'resourceType', value: rt, title });
    }

    if (CATEGORIES.includes(cat) && RESOURCE_TYPES.includes(rt)) {
      matrix[cat][rt] += 1;
    }

    if (isNonEmptyString(url)) {
      const key = normalizeUrlKey(url);
      if (!urlMap.has(key)) urlMap.set(key, []);
      urlMap.get(key).push(title || row.documentId);
    }
  }

  const dupes = [...urlMap.entries()].filter(([, titles]) => titles.length > 1);

  console.log('--- 1) Required fields + enums ---');
  if (issues.length === 0) {
    console.log('PASS: all rows have required fields and valid enums.\n');
  } else {
    console.log(`FAIL: ${issues.length} issue(s)`);
    console.log(JSON.stringify(issues.slice(0, 30), null, 2));
    if (issues.length > 30) console.log(`... and ${issues.length - 30} more\n`);
    else console.log('');
  }

  console.log('--- 2) Duplicate URL intent (normalized key) ---');
  if (dupes.length === 0) {
    console.log('PASS: no duplicate URL keys detected.\n');
  } else {
    console.log(`REVIEW: ${dupes.length} duplicate key(s)`);
    for (const [key, titles] of dupes) {
      console.log(`  ${key}`);
      titles.forEach((t) => console.log(`    - ${t}`));
    }
    console.log('');
  }

  console.log('--- 3) Category × resourceType counts (coverage matrix) ---');
  for (const c of CATEGORIES) {
    const parts = RESOURCE_TYPES.map((t) => `${t}=${matrix[c][t]}`).join(', ');
    console.log(`${c}: ${parts}`);
  }
  console.log('');

  const emptyTypesGlobal = RESOURCE_TYPES.filter((t) => rows.filter((r) => r.resourceType === t).length === 0);
  if (emptyTypesGlobal.length > 0) {
    console.log('--- 4) Global gaps (no row uses this resourceType) ---');
    console.log(emptyTypesGlobal.join(', '));
    console.log('');
  }

  console.log('--- 5) URL reachability (HEAD/GET, may be slow) ---');
  const urlRows = rows.filter((r) => isNonEmptyString(r.url));
  const concurrency = 4;
  let idx = 0;
  const urlIssues = [];

  async function worker() {
    while (idx < urlRows.length) {
      const i = idx++;
      const row = urlRows[i];
      const r = await checkUrl(row.url);
      if (!r.ok) {
        urlIssues.push({
          title: row.title,
          url: row.url,
          status: r.status,
          error: r.error,
        });
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));

  if (urlIssues.length === 0) {
    console.log(`PASS: checked ${urlRows.length} URLs.\n`);
  } else {
    console.log(`REVIEW: ${urlIssues.length} URL(s) failed or timed out`);
    urlIssues.slice(0, 15).forEach((u) => console.log(`  - ${u.title}: ${u.url} (${u.error || `HTTP ${u.status}`})`));
    if (urlIssues.length > 15) console.log(`  ... and ${urlIssues.length - 15} more`);
    console.log('');
  }

  console.log('--- 6) UI / grouping (manual) ---');
  console.log('SKIP: automated UI grouping not run here; verify /external-resources in browser.\n');

  const hardFail = issues.length > 0;
  process.exit(hardFail ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
