# API Endpoints for Navigate Tech Hub

Design doc for how the frontend gets data from Strapi. Documents the finalized endpoint design, content models, and configuration decisions.

This document is aligned with `docs/CONTENT_CONTRACT_AND_EDITORIAL_TAXONOMY.md`.

---

## Design Process

**Step 1: Mapped frontend pages to data requirements**

Each page was analyzed for what data it needs:
- Homepage (`page.tsx`): 6 featured resources (editor-curated via `featured` boolean)
- Browse (`browse/page.tsx`): All resources for client-side search + category filtering
- Category pages (`[category]/page.tsx`): Resources filtered by category
- Article pages (`[category]/[slug]/page.tsx`): Single resource by slug + 3 related from same category
- External resources (`external-resources/page.tsx`): All external links, frontend groups by category

**Step 2: One endpoint per content type, different query params**

Strapi's built-in filters + pagination + sort means we use ONE endpoint `GET /api/resources` and change the query params. Same for `GET /api/external-resources`. No custom routes needed.

**Step 3: Tested in Strapi**

A test content type was created and the API was verified in-browser. Key findings:
- Rich Text (Blocks) returns nested JSON, not markdown -- so we use Long Text for content
- Strapi auto-adds `createdAt`, `updatedAt`, `publishedAt` with Draft & Publish enabled
- Filter syntax requires `filters[category][$eq]=value` (not `?category=value`)
- Strapi 5 uses flattened response format (fields at top level, not nested under `attributes`)

**Step 4: Finalized design decisions**

- Long Text for content (not Rich Text) -- matches existing `react-markdown` renderer
- Strapi's `publishedAt` for "most recent" sorting (not a custom field) -- auto-managed
- Tags as JSON array on Resource -- simpler than a Tag collection for v1
- Slug lookup via filter (not custom route) -- zero custom code, frontend uses `data[0]`
- `featured` boolean for homepage curation -- editors pin articles manually
- Optional image (media) field on Resource -- cover images for cards
- `fields` parameter to exclude `content` from list queries -- smaller payloads
- `audienceStage` replaces `difficulty` as primary audience-fit signal (`difficulty` retained for backward compatibility)
- `contentVolatility` drives staleness thresholds (`high` 15d, `medium` 30d, `low` 45d)
- External resources require `resourceType`; `officialStatus` is optional

---

## Content Types

### Resource (Collection Type)

The main content type for articles. Maps to the `Resource` interface in `frontend/lib/types.ts`.

| Field             | Strapi Type         | Required | Notes |
|-------------------|---------------------|----------|-------|
| slug              | Text (unique)       | Yes      | URL-safe identifier, e.g. `leetcode-patterns-guide` |
| category          | Enumeration         | Yes      | `interview-prep`, `classes`, `projects`, `hackathons`, `community` |
| title             | Text                | Yes      | Display title |
| description       | Long Text           | Yes      | Short summary shown on cards |
| content           | Long Text           | Yes      | Full article as markdown. Using Long Text so frontend keeps its existing `react-markdown` renderer. Rich Text would return nested JSON requiring a different renderer. |
| audienceStage     | Enumeration         | Yes      | `first-semester`, `first-year`, `underclassmen`, `all-levels` |
| timeToReadMinutes | Integer             | Yes      | Estimated reading time in minutes |
| outcome           | Text                | Yes      | One-line expected outcome for the reader |
| contentVolatility | Enumeration         | Yes      | `high`, `medium`, `low`; controls staleness thresholds |
| tags              | JSON                | No       | Array of strings, e.g. `["LeetCode", "DSA"]`. JSON is simpler than a Tag collection type for v1 since we don't filter by tag on the backend. |
| difficulty        | Enumeration         | No       | Legacy compatibility field (`beginner`, `intermediate`, `advanced`) |
| author            | Text                | No       | Freeform author name |
| featured          | Boolean             | No       | Default `false`. Editors toggle to pin articles to homepage. |
| image             | Media (single)      | No       | Optional cover image / thumbnail for cards |
| lastReviewedAt    | Datetime            | No       | Operational editorial freshness timestamp |

Auto-generated fields (via Draft & Publish):
- `publishedAt` -- maps to frontend `publishedDate`, used for "most recent" sorting
- `updatedAt` -- maps to frontend `lastUpdated`
- `createdAt` -- available but not currently used by frontend

### External Resource (Collection Type)

Curated links to third-party tools and platforms. Maps to `ExternalResource` in `frontend/lib/types.ts`.

| Field          | Strapi Type   | Required | Notes |
|----------------|---------------|----------|-------|
| title          | Text          | Yes      | |
| description    | Long Text     | Yes      | |
| url            | Text          | Yes      | Full URL to external platform |
| category       | Enumeration   | Yes      | Same 5 values as Resource |
| resourceType   | Enumeration   | Yes      | `learning-platform`, `opportunities-board`, `scholarship-funding`, `community-network`, `events-conference`, `career-tool`, `documentation-reference` |
| badge          | Text          | No       | Freeform label, e.g. "Paid" |
| officialStatus | Enumeration   | No       | `official-org`, `community-vetted` |

No separate Tag or Category content types. Category labels, colors, and descriptions live in `frontend/lib/constants.ts`.

---

## API Endpoints

Base URL: `http://localhost:1337` (dev), production URL TBD.

All endpoints use Strapi's default REST API. No custom controllers or routes.

### Shared: List field selection

List views (homepage, browse, category pages) exclude the `content` field to keep responses small. The frontend API client builds these query strings directly.

```ts
const RESOURCE_LIST_FIELDS = [
  'slug', 'category', 'title', 'description',
  'audienceStage', 'timeToReadMinutes', 'outcome',
  'contentVolatility', 'tags', 'difficulty', 'author', 'featured',
  'publishedAt', 'updatedAt', 'lastReviewedAt',
];
```

The image field (media relation) requires `populate` to include in responses:
```ts
const IMAGE_POPULATE = {
  image: { fields: ['url', 'alternativeText'] },
};
```

### 1. Featured Resources (Homepage)

**Page:** `page.tsx` -- shows editor-curated featured articles in a 3-column grid.

```
GET /api/resources
  ?filters[featured][$eq]=true
  &pagination[pageSize]=6
  &sort=publishedAt:desc
  &fields=slug,category,title,description,audienceStage,timeToReadMinutes,outcome,contentVolatility,tags,difficulty,author,featured,publishedAt,updatedAt,lastReviewedAt
  &populate[image][fields][0]=url
  &populate[image][fields][1]=alternativeText
```

Editors control which articles appear by toggling the `featured` boolean in Strapi admin. If fewer than 6 are featured, fewer cards show.

### 2. All Resources (Browse Page)

**Page:** `browse/page.tsx` -- fetches all resources, search + category filtering is client-side.

```
GET /api/resources
  ?pagination[pageSize]=25
  &sort=publishedAt:desc
  &fields=slug,category,title,...  (same list fields)
  &populate[image][fields]=url,alternativeText
```

Client-side filtering is fine for ~12 articles. Strapi backend config has `defaultLimit: 25`.

### 3. Resources by Category

**Page:** `[category]/page.tsx` -- e.g. `/interview-prep` shows only interview prep articles.

```
GET /api/resources
  ?filters[category][$eq]=interview-prep
  &sort=publishedAt:desc
  &fields=slug,category,title,...  (same list fields)
  &populate[image][fields]=url,alternativeText
```

Frontend passes the category from the URL param directly to the filter.

### 4. Single Resource by Slug (Article Page)

**Page:** `[category]/[slug]/page.tsx` -- full article view with content.

```
GET /api/resources
  ?filters[slug][$eq]=leetcode-patterns-guide
  &filters[category][$eq]=interview-prep
  &pagination[pageSize]=1
  &populate[image][fields]=url,alternativeText
```

No `fields` param -- we want everything including `content`. Frontend uses `data[0]` and calls `notFound()` if `data.length === 0`.

The category filter is included so a slug in the wrong category URL doesn't return the article.

### 5. Related Resources (Article Page)

**Page:** Same article page -- "Related Resources" section shows 3 other articles from the same category.

```
GET /api/resources
  ?filters[category][$eq]=interview-prep
  &filters[slug][$ne]=leetcode-patterns-guide
  &sort=publishedAt:desc
  &pagination[pageSize]=3
  &fields=slug,category,title,...  (same list fields)
  &populate[image][fields]=url,alternativeText
```

`$ne` excludes the current article. Returns up to 3 results.

### 6. External Resources

**Page:** `external-resources/page.tsx` -- all external links, frontend groups by category.

```
GET /api/external-resources
  ?pagination[pageSize]=100
  &sort=category:asc,title:asc
  &fields=title,description,url,category,resourceType,badge,officialStatus,updatedAt,publishedAt
```

No `fields` exclusion needed (no heavy content field). No image field on this type.

---

## Strapi Response Shape (Strapi 5)

Strapi 5 uses a flattened response format. Fields are at the top level, not nested under `attributes`:

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123def456",
      "slug": "leetcode-patterns-guide",
      "category": "interview-prep",
      "title": "LeetCode Patterns Guide",
      "description": "Master common DSA patterns...",
      "audienceStage": "first-year",
      "timeToReadMinutes": 5,
      "outcome": "Apply common interview problem patterns with confidence",
      "contentVolatility": "medium",
      "tags": ["LeetCode", "Interview", "DSA"],
      "difficulty": "intermediate",
      "author": "Navigate Tech Hub Team",
      "featured": true,
      "lastReviewedAt": "2025-01-19T10:00:00.000Z",
      "image": {
        "url": "/uploads/cover_abc123.jpg",
        "alternativeText": "LeetCode patterns diagram"
      },
      "publishedAt": "2025-01-15T12:00:00.000Z",
      "updatedAt": "2025-01-20T08:30:00.000Z",
      "createdAt": "2025-01-15T12:00:00.000Z"
    }
  ],
  "meta": {
    "pagination": { "page": 1, "pageSize": 6, "pageCount": 1, "total": 4 }
  }
}
```

The frontend mapping layer converts `publishedAt` to `publishedDate` and `updatedAt` to `lastUpdated` to match existing interfaces.

---

## Configuration

### CORS

`backend/config/middlewares.ts` -- the `strapi::cors` entry is configured with allowed origins:

```ts
{
  name: 'strapi::cors',
  config: {
    origin: ['http://localhost:3000'],  // Add Vercel URL for production
  },
}
```

### Draft & Publish

Enabled on both Resource and External Resource content types. This gives us `publishedAt` and ensures only published content is returned by default (`status=published` is the default -- omitting the parameter returns only published entries).

### Public Role Permissions

In Strapi admin (Settings > Users & Permissions > Roles > Public), enable:
- **Resource:** `find` and `findOne`
- **External Resource:** `find` and `findOne`

This allows unauthenticated frontend requests. No API token needed for public reads.

### API Config

`backend/config/api.ts` sets `defaultLimit: 25` and `maxLimit: 100`.

---

## Edge Cases

- **Slug not found:** Filter returns `data: []`. Frontend checks `data.length === 0` and calls `notFound()`.
- **Invalid category in URL:** Frontend validates against `CATEGORIES` before calling the API. Invalid categories hit `notFound()` on the route, never reaching the API.
- **Empty list:** Strapi returns `data: [], meta: { pagination: { total: 0 } }`. Frontend shows an empty state.
- **Invalid enum filter value:** Strapi returns no matches (empty data array), not an error.
- **Stale featured content:** Freshness policy removes `featured` from stale entries; content remains published.

---

## Resolved Decisions

| Question | Decision |
|----------|----------|
| Draft & Publish? | Yes. `status=published` is the default behavior. `publishedAt` comes free. |
| CORS for localhost:3000 to 1337? | Yes. Configured in `strapi::cors` middleware. |
| Filter vs custom `/slug/:slug` route? | Filter approach. Zero custom code, frontend uses `data[0]`. |
| Tags: JSON vs collection? | JSON array. No backend tag filtering needed for v1. |
| API auth? | Public role with `find`/`findOne`. No token needed for reads. |
| Featured resources? | `featured` boolean field. Editors pin articles manually. |
| Cover image? | Optional media field on Resource. Populated in queries. |
| Content exclusion on lists? | Yes. Use `fields` param to exclude `content` from list views. |
| Primary audience-fit field? | `audienceStage` (keep `difficulty` for backward compatibility). |
| Staleness model? | `contentVolatility` with 15/30/45 day thresholds; stale content is auto-unfeatured. |
| External resource classification? | `resourceType` required, `officialStatus` optional. |

---

## References

- `frontend/lib/types.ts` -- Resource and ExternalResource interfaces
- `frontend/data/resources.ts` and `externalResources.ts` -- current hardcoded data (to be replaced)
- `frontend/lib/constants.ts` -- category metadata, colors, site config
- Frontend pages: `page.tsx`, `browse/page.tsx`, `[category]/page.tsx`, `[category]/[slug]/page.tsx`, `external-resources/page.tsx`
- [Strapi 5 REST API docs](https://docs.strapi.io/cms/api/rest)
- [Strapi 5 Filters](https://docs.strapi.io/cms/api/rest/filters)
- [Strapi 5 Sort & Pagination](https://docs.strapi.io/cms/api/rest/sort-pagination)
