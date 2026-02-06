# API Endpoints for Navigate Tech Hub

Design doc for how the frontend will get data from Strapi. Not building yet - just figuring out what endpoints we need and how they should work.

---

## Design Process

**Step 1: Mapped frontend to what data it needs**

I went through each page and wrote down what data it needs:
- Homepage (page.tsx): First 6 resources → need a way to get 6
- Browse (browse/page.tsx): All resources → need full list
- Category pages ([category]/page.tsx): Only resources in that category (e.g. interview-prep)
- Article pages ([category]/[slug]/page.tsx): One specific resource by slug, plus 3 related from same category
- External resources page: All external links, frontend groups by category

**Step 2: Realized we can use one endpoint with different params**

At first I thought we might need separate endpoints like /api/resources/featured or /api/resources/:category. Then I read the Strapi docs and found the filters + pagination system. So we can use ONE endpoint `GET /api/resources` and just change the query params (pageSize, filters, sort). Way simpler - no custom routes.

Same idea for external resources - one `GET /api/external-resources` and the frontend groups by category like it already does.

**Step 3: Tested in Strapi**

I created a test content type (title, content as rich text, category) and added test data. Hit the API in the browser. That's where I found out:
- Rich Text returns nested JSON, not markdown so we're going Long Text for content
- Strapi auto-adds createdAt, updatedAt, publishedAt so we use those instead of custom publishedDate
- Filter syntax: I tried ?category=interview-prep first and it didn't work. Had to use filters[category][$eq]=interview-prep (see Tests I Ran below)

**Step 4: Made design decisions**

Based on that:
- Long Text for content (not Rich Text) → matches our current markdown + react-markdown
- Use Strapi's publishedAt for "most recent" (not custom field) → auto-managed
- Tags as JSON array on Resource → simpler than a Tag collection + relations for v1
- Slug lookup via filter (not custom route) → works with zero custom code, frontend uses data[0]

**Open questions for Ade:**
- Should we enable Draft & Publish? (I'm assuming yes so we get publishedAt)
- Do we need CORS config for localhost:3000 → 1337?
- Is the filter approach for slug lookup fine or do we want a custom /slug/:slug route that returns one object + 404?

---

## Content types we need

**Resource** (collection type) - this is the main one for our articles. Maps to the `Resource` interface in types.ts.

Fields I think we need:
- slug (text, required) - URL-safe, unique. Like "leetcode-patterns-guide"
- category (enum, required) - one of interview-prep, classes, projects, hackathons, community
- title (text, required)
- description (long text, required) is the short summary for cards
- content (long text, required) is full article content as markdown. Using plain text instead of rich text so frontend can keep using its existing markdown renderer (react-markdown). If we used Rich Text, Strapi would return nested JSON like `[{"type":"paragraph","children":[...]}]` and we'd need a different renderer. Admin will write markdown manually, which is fine for technical content.
- tags. not sure if this should be a separate content type or just JSON? JSON seems easier for now so we don't have to manage tag relations. Could change later if we need tag filtering
- difficulty (enum, optional) - beginner, intermediate, advanced
- author (text, optional)
- (no custom publishedDate) - using Strapi's built-in publishedAt for "most recent" sorting. Strapi auto-adds createdAt, updatedAt, publishedAt when you use Draft & Publish. Frontend can map updatedAt → lastUpdated.

**External Resource** (collection type) - different from Resource, these are just links. Maps to `ExternalResource` in types.ts.

Fields:
- title (text, required)
- description (long text, optional)
- url (text, required)
- category (enum, same values as Resource)
- badge (text, optional) - like "Paid" or "External Link"

No separate Tag or Category content types - tags as JSON array on Resource, category as enum on both. Category labels/colors stay in the frontend constants.

---

## Resources endpoint

Base URL is localhost:1337 for dev. All of these use the same `GET /api/resources` endpoint with different query params - Strapi gives you that automatically when you create the content type. I looked up the filter syntax in the Strapi docs.

### 1. Featured resources (homepage)

**Use case:** `page.tsx` currently does `resources.slice(0, 6)` for the featured section.

`GET /api/resources?pagination[pageSize]=6&pagination[page]=1`

I'm using pageSize=6 because that's what the homepage grid shows (the 6 featured cards). Could also do something like ?limit=6 but I read Strapi uses the pagination[pageSize] syntax so going with that. Maybe add `sort=publishedAt:desc` so we get the most recent 6 (Strapi's auto field when you publish). Not sure if we care about order for featured.

Response is the usual Strapi list - something like:
```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123...",
      "slug": "leetcode-patterns-guide",
      "category": "interview-prep",
      "title": "LeetCode Patterns Guide",
      "description": "Master common DSA patterns...",
      "tags": ["LeetCode", "Interview", "DSA"],
      "difficulty": "intermediate",
      "author": "...",
      "publishedAt": "2025-01-15T...",
      "updatedAt": "..."
      // Strapi 5 puts fields at top level not in attributes. Frontend maps updatedAt → lastUpdated
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 6, "total": 12 } }
}
```

(Note: Strapi 5 uses flattened format - fields are right on the object, not nested under `attributes`. Confirmed when I tested - see "What I Learned from Testing" below.)

### 2. All resources (browse page)

**Use case:** `browse/page.tsx` - right now it imports all resources and filters client-side by category + search.

`GET /api/resources?pagination[pageSize]=25&sort=publishedAt:desc`

We only have like 12 resources so pagination might be overkill for now but the backend config has defaultLimit 25 so might as well use it. Could add `fields` to exclude content if we don't need full article body for the list view - need to check.

### 3. Resources by category (category pages)

**Use case:** `[category]/page.tsx` - e.g. /interview-prep shows only interview prep resources.

`GET /api/resources?filters[category][$eq]=interview-prep&sort=publishedAt:desc`

I had to look up how to filter - first I tried ?category=interview-prep but Strapi docs say you need filters[category][$eq]=interview-prep. The $eq means "equals". They also have $ne (not equals), $gt (greater than), etc. Frontend already has category in the URL so we just pass it through.

### 4. Single resource by slug (article page)

**Use case:** `[category]/[slug]/page.tsx` - need one full resource for the article. Right now it's `resources.find(r => r.category === category && r.slug === slug)`.

**Why I did it this way:** Strapi's default singular endpoint is GET /api/resources/:documentId but our URLs use slug, not documentId. I could build a custom route like /api/resources/slug/:slug that returns a single object and 404 when not found, but that would need custom controller code. Using the filter approach works with zero custom code because Strapi handles it. So we use the list endpoint with filters and pageSize=1:

`GET /api/resources?filters[slug][$eq]=leetcode-patterns-guide&filters[category][$eq]=interview-prep&pagination[pageSize]=1`

We add the category filter so if someone has the slug in the URL but wrong category we don't return the wrong article. Frontend: if data.length === 0, call notFound() (404). Otherwise use data[0].

**Trade-off:** Filter always returns an array so frontend has to use data[0]. A custom route could return a single object and 404 from the API. For v1 the filter approach is simpler - we can add a custom route later if we want.

**Update:** I tested this in the browser and it works. Hit http://localhost:1337/api/resources?filters[slug][$eq]=test-slug and it returns the data array (empty until we have content, but the endpoint exists).

### 5. Related resources (article page)

**Use case:** Same page - "Related" section wants 3 other resources from same category, most recent first, excluding current article.

`GET /api/resources?filters[category][$eq]=interview-prep&filters[slug][$ne]=leetcode-patterns-guide&sort=publishedAt:desc&pagination[pageSize]=3`

The $ne is "not equal" - so we get same category, exclude current slug, sort by date, take 3. If there's fewer than 3 in the category we just get what's there.

---

## External resources endpoint

**Use case:** `external-resources/page.tsx` - fetches all external links and groups by category (interview-prep, projects, community, etc.).

`GET /api/external-resources?pagination[pageSize]=100&sort=category:asc,title:asc`

Separate content type from Resource since these don't have slug/content - just title, description, url, category, badge. We have ~31 in the data file so 100 page size should be plenty. Frontend does the grouping by category like it does now.

Response shape is same idea - data array, each item has title, description, url, category, badge.

---

## Edge cases I thought about

- **Slug not found:** Filter returns data: []. Frontend checks and calls notFound(). Good.
- **Invalid category in URL:** Frontend already validates against CATEGORIES before calling - invalid category hits notFound() on the route. So we might not even hit the API with a bad category. If we did, Strapi would just return no matches I think.
- **Empty list (no resources / no external):** data: [], total: 0. Frontend can show empty state. Didn't dig into whether Strapi returns an error for that or just empty - assume just empty.

Not sure what happens if we filter by a category value that doesn't exist in the enum - need to test.

---

## Stuff I'm unsure about

**Tags:** JSON array vs separate Tag collection? I went with JSON for now because we're not filtering by tag on the backend (browse page filters client-side). If we want tag filtering or a tag admin later we could add a Tag type and a relation.

**Draft & Publish:** Should these content types use it? If yes we need to pass status=published on all these requests and set up the Public role to only see published. I'm assuming we will - that's when Strapi gives you publishedAt.

---

## What I Learned from Testing

I created a test content type in Strapi and tested the API. Here's what I found:

**Response format:** Strapi 5 uses flattened format - fields are at top level of data objects, not nested under `attributes`. Confirmed this works as expected when I hit the endpoint in the browser.

**Content field decision:** I tested Rich Text and it returns complex nested JSON:
```json
"content": [{"type": "paragraph", "children": [{"type": "text", "text": "..."}]}]
```
Our current frontend expects plain markdown strings (we use react-markdown). Two options:
1. **Long Text (plain text)** - admin writes markdown, no frontend changes needed ✅
2. **Rich Text** - nicer editor in admin but frontend would need something like @strapi/blocks-react-renderer to convert that JSON to HTML

**Recommendation: Use Long Text** to match current frontend. We can switch to Rich Text later if we want a fancier editor.

**Auto-generated fields:** Strapi adds `createdAt`, `updatedAt`, `publishedAt` automatically when you use Draft & Publish. So we don't need a custom publishedDate field and we can use `publishedAt` for sorting "most recent" and the frontend can map `updatedAt` → lastUpdated (and publishedAt → publishedDate if the frontend type expects that).

**Filtering works:** Tested `filters[category][$eq]=interview-prep` and it correctly filters. Also tested pagination and the slug filter - all work as designed.

---

## Tests I Ran

Created a test content type in Strapi (e.g. test-article with title, content, category), added a couple entries, then hit the API in the browser:

- `GET /api/test-articles` → returned both entries, meta.pagination looks right
- `GET /api/test-articles?filters[category][$eq]=interview-prep` → filtered to only that category
- `GET /api/test-articles?pagination[pageSize]=1` → only 1 item in data, pageSize in meta is 1
- `GET /api/test-articles?category=interview-prep` → didn't work (no filter applied). Strapi needs filters[category][$eq]=..., not ?category=

That last one is why I use the filters[field][$eq] syntax everywhere the simple ?category= doesn't do anything. Confirmed the endpoint design works with Strapi's actual API.

---

## TODO

- [x] Content field: using Long Text (markdown) - no frontend changes needed
- [x] publishedDate vs publishedAt: using Strapi's publishedAt, map updatedAt → lastUpdated
- [x] Strapi 5 response format: confirmed flattened (tested in browser)
- [x] Test in Strapi admin: did it, saw the real response shape
- [ ] Test what Strapi actually returns for invalid category filter
- [ ] Test the slug lookup with multiple resources - make sure category filter works when slug exists in different category
- [ ] Decide if we need a custom /api/resources/slug/:slug route or filter is fine
- [ ] Figure out: do we need API keys or is this public read?
- [ ] Figure out: CORS settings for localhost:3000 → localhost:1337
- [ ] Clean up test content type before finalizing / when we build the real Resource type

---

## References I used

- frontend/lib/types.ts - Resource and ExternalResource interfaces
- frontend/data/resources.ts and externalResources.ts - current field usage
- frontend app pages: page.tsx, browse/page.tsx, [category]/page.tsx, [category]/[slug]/page.tsx, external-resources/page.tsx
- Strapi docs: REST API, Filters (the filters[field][$eq] syntax), pagination/sort
