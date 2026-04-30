/**
 * One-off script to seed Strapi with external resources from external-resources.seed.json.
 *
 * Loads env from backend/.env (STRAPI_URL, FULL_ACCESS_API_TOKEN). Run from backend:
 *   npm run seed:external
 *
 * Requires Strapi to be running. Uses FULL_ACCESS_API_TOKEN for create + publish.
 */

const path = require('path');
const fs = require('fs');

// Load backend .env (do not commit secrets; .env is gitignored)
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.FULL_ACCESS_API_TOKEN;

if (!API_TOKEN) {
  console.error('Missing FULL_ACCESS_API_TOKEN in .env. Create an API token in Strapi Admin with create permission on External Resource.');
  process.exit(1);
}

const SEED_PATH = path.join(__dirname, 'external-resources.seed.json');
const CATEGORY_ENUM = new Set([
  'interview-prep',
  'classes',
  'projects',
  'hackathons',
  'community',
]);
const RESOURCE_TYPE_ENUM = new Set([
  'learning-platform',
  'opportunities-board',
  'scholarship-funding',
  'community-network',
  'events-conference',
  'career-tool',
  'documentation-reference',
]);
const OFFICIAL_STATUS_ENUM = new Set(['official-org', 'community-vetted']);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidUrl(value) {
  if (!isNonEmptyString(value)) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function validateItem(item, index) {
  const label = `seed item ${index + 1}`;
  if (typeof item !== 'object' || item === null) {
    throw new Error(`${label}: expected an object`);
  }
  if (!isNonEmptyString(item.title)) {
    throw new Error(`${label}: missing required "title"`);
  }
  if (!isNonEmptyString(item.description)) {
    throw new Error(`${label}: missing required "description"`);
  }
  if (!isValidUrl(item.url)) {
    throw new Error(`${label}: invalid required "url"`);
  }
  if (!CATEGORY_ENUM.has(item.category)) {
    throw new Error(`${label}: invalid required "category" (${item.category})`);
  }
  if (!RESOURCE_TYPE_ENUM.has(item.resourceType)) {
    throw new Error(`${label}: invalid required "resourceType" (${item.resourceType})`);
  }
  if (
    item.officialStatus !== undefined
    && item.officialStatus !== null
    && !OFFICIAL_STATUS_ENUM.has(item.officialStatus)
  ) {
    throw new Error(`${label}: invalid "officialStatus" (${item.officialStatus})`);
  }

  return {
    title: item.title.trim(),
    description: item.description.trim(),
    url: item.url.trim(),
    category: item.category,
    resourceType: item.resourceType,
    ...(isNonEmptyString(item.badge) && { badge: item.badge.trim() }),
    ...(isNonEmptyString(item.officialStatus) && { officialStatus: item.officialStatus }),
  };
}

/**
 * Creates a single external resource via Strapi REST API and publishes it.
 */
async function createExternalResource(item) {
  const url = `${STRAPI_URL}/api/external-resources?status=published`;
  const body = {
    data: {
      title: item.title,
      description: item.description,
      url: item.url,
      category: item.category,
      resourceType: item.resourceType,
      ...(item.badge && { badge: item.badge }),
      ...(item.officialStatus && { officialStatus: item.officialStatus }),
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }

  return res.json();
}

/**
 * Reads seed JSON and creates each external resource in Strapi.
 */
async function main() {
  let raw;
  try {
    raw = fs.readFileSync(SEED_PATH, 'utf8');
  } catch (err) {
    console.error('Could not read seed file:', SEED_PATH, err.message);
    process.exit(1);
  }

  let items;
  try {
    items = JSON.parse(raw);
  } catch (err) {
    console.error('Invalid JSON in seed file:', err.message);
    process.exit(1);
  }

  if (!Array.isArray(items)) {
    console.error('Seed file must be a JSON array.');
    process.exit(1);
  }

  console.log(`Seeding ${items.length} external resources to ${STRAPI_URL}...`);

  let created = 0;
  let failed = 0;

  const validatedItems = [];
  for (let i = 0; i < items.length; i++) {
    try {
      validatedItems.push(validateItem(items[i], i));
    } catch (err) {
      console.error(`Validation error: ${err.message}`);
      process.exit(1);
    }
  }

  for (let i = 0; i < validatedItems.length; i++) {
    const item = validatedItems[i];
    const label = item.title || `item ${i + 1}`;
    try {
      await createExternalResource(item);
      created++;
      console.log(`  [${created}/${validatedItems.length}] ${label}`);
    } catch (err) {
      failed++;
      console.error(`  FAIL ${label}:`, err.message);
    }
  }

  console.log(`Done. Created: ${created}, Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

main();
