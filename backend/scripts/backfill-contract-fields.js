/**
 * Backfills existing Strapi entries to satisfy required contract fields.
 *
 * Run from backend:
 *   node scripts/backfill-contract-fields.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_TOKEN = process.env.FULL_ACCESS_API_TOKEN;

if (!API_TOKEN) {
  console.error('Missing FULL_ACCESS_API_TOKEN in .env');
  process.exit(1);
}

const DEFAULT_AUDIENCE_STAGE = 'all-levels';
const DEFAULT_CONTENT_VOLATILITY = 'medium';
const DEFAULT_RESOURCE_TYPE_BY_CATEGORY = {
  'interview-prep': 'learning-platform',
  classes: 'learning-platform',
  projects: 'career-tool',
  hackathons: 'opportunities-board',
  community: 'community-network',
};

async function request(pathname, init = {}) {
  const res = await fetch(`${STRAPI_URL}${pathname}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}

function estimateReadTimeMinutes(content) {
  if (typeof content !== 'string' || content.trim().length === 0) return 1;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function defaultOutcome(resource) {
  if (typeof resource.description === 'string' && resource.description.trim().length > 0) {
    return resource.description.trim().slice(0, 140);
  }
  if (typeof resource.title === 'string' && resource.title.trim().length > 0) {
    return `Learn key actions from ${resource.title.trim()}.`;
  }
  return 'Learn practical next steps from this guide.';
}

async function backfillResources() {
  const res = await request(
    '/api/resources?pagination[pageSize]=200&fields[0]=title&fields[1]=description&fields[2]=content&fields[3]=audienceStage&fields[4]=timeToReadMinutes&fields[5]=outcome&fields[6]=contentVolatility&fields[7]=lastReviewedAt&fields[8]=updatedAt&fields[9]=featured&fields[10]=slug'
  );

  let updated = 0;
  for (const resource of res.data) {
    const patch = {};

    if (!resource.audienceStage) {
      patch.audienceStage = DEFAULT_AUDIENCE_STAGE;
    }
    if (!resource.timeToReadMinutes || resource.timeToReadMinutes < 1) {
      patch.timeToReadMinutes = estimateReadTimeMinutes(resource.content);
    }
    if (!resource.outcome || String(resource.outcome).trim() === '') {
      patch.outcome = defaultOutcome(resource);
    }
    if (!resource.contentVolatility) {
      patch.contentVolatility = DEFAULT_CONTENT_VOLATILITY;
    }
    if (!resource.lastReviewedAt && resource.updatedAt) {
      patch.lastReviewedAt = resource.updatedAt;
    }

    if (Object.keys(patch).length > 0) {
      await request(`/api/resources/${resource.documentId}?status=published`, {
        method: 'PUT',
        body: JSON.stringify({ data: patch }),
      });
      updated++;
      console.log(`Updated resource: ${resource.slug || resource.documentId}`);
    }
  }

  console.log(`Resource backfill complete. Updated ${updated} entries.`);
}

async function backfillExternalResources() {
  const res = await request(
    '/api/external-resources?pagination[pageSize]=500&fields[0]=title&fields[1]=description&fields[2]=category&fields[3]=resourceType'
  );

  let updated = 0;
  for (const item of res.data) {
    const patch = {};

    if (!item.description || String(item.description).trim() === '') {
      patch.description = item.title
        ? `Resource link: ${String(item.title).trim()}`
        : 'External resource link.';
    }
    if (!item.resourceType) {
      patch.resourceType =
        DEFAULT_RESOURCE_TYPE_BY_CATEGORY[item.category] || 'documentation-reference';
    }

    if (Object.keys(patch).length > 0) {
      await request(`/api/external-resources/${item.documentId}?status=published`, {
        method: 'PUT',
        body: JSON.stringify({ data: patch }),
      });
      updated++;
      console.log(`Updated external resource: ${item.title || item.documentId}`);
    }
  }

  console.log(`External resource backfill complete. Updated ${updated} entries.`);
}

async function main() {
  await backfillResources();
  await backfillExternalResources();
  console.log('Contract backfill finished successfully.');
}

main().catch((err) => {
  console.error('Backfill failed:', err.message);
  process.exit(1);
});
