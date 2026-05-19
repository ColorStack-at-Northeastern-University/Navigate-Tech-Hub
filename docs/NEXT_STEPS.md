# What’s next (local Strapi → ship)

Operational checklist after the External Resources pivot and article graph work.

---

## 1. Strapi data — external resources (`directoryTier`)

**Required field:** every external-resource row needs **`directoryTier`**.

| Rule | Value |
|------|--------|
| `category === 'programs'` | `recurring-program` |
| Any other category | `tools-and-communities` |

**Automated migration (repo root):**

```bash
node scripts/migrate-external-resource-directory-tier.mjs
```

Uses `FULL_ACCESS_API_TOKEN` from `backend/.env` or override with `STRAPI_API_KEY`. If Strapi returns errors on `PUT`, confirm your REST **document id** path matches your Strapi version (`PUT /api/external-resources/:documentId`) and adjust the script.

**Seasonal notes:** If you still have a CSV/export from before `applicationStatus` / `applicationDeadline` were removed, paste human-readable timing into **`seasonalNote`** manually in Admin. The migration script does **not** invent seasonal text.

**Radar seed script:** `docs/opportunities-radar/scripts/seed-programs.mjs` now maps legacy `applicationStatus` → **`seasonalNote`** and sets **`directoryTier`** on POST.

---

## 2. Article ↔ article linking (`relatedArticles`)

**Status:** **Implemented in code.** Editors finish it in **Strapi Admin**.

- Content-Type **Resource** has a **many-to-many self-relation** `relatedArticles`.
- The article page loads **`populate[relatedArticles]`** with slug, category, title, description, time, and dates.
- **“Continue reading”** uses linked articles **first** (max **3** shown — enforced in the frontend; prefer selecting ≤3 in CMS).
- If nothing is linked, the UI **falls back** to the three latest articles in the **same category** (excluding the current slug).

**Your workflow:** Open each article → relate **1–3** follow-on guides → publish.

**Inverse links:** Strapi many-to-many can store one-sided links; you do **not** have to mirror B→A when you set A→B unless you want symmetry.

---

## 3. External directory ↔ article pairing (`relatedArticleSlug`)

**Already wired:** External Resource entries can set **`relatedArticleSlug`** to `{hub-category}/{slug}` (e.g. `interview-prep/leetcode-guide`). The article page shows **“Related external links & programs”** for matching rows.

---

## 4. Publish internal guides (bulk from repo)

**Not via Strapi MCP** — MCP often times out in Cursor; use the repo script instead (same token as migration).

```bash
# Strapi running on :1337
node scripts/publish-internal-guides-from-drafts.mjs --dry-run
node scripts/publish-internal-guides-from-drafts.mjs
```

Reads **`docs/INTERNAL_GUIDE_INVENTORY.md`** + **`docs/internal_resources_drafts/{slug}/draft/article.md`**. Creates or updates published **Resource** rows (~30 guides).

Then wire links:

```bash
node scripts/apply-article-links.mjs
```

Config: **`docs/config/article-external-links.json`** (`relatedArticleSlug` on externals) and **`docs/config/article-related-articles.json`** (`relatedArticles` on guides). Edit those JSON files, re-run the script.

From `backend/`: `npm run publish:guides` / `npm run apply:article-links`.

---

## 5. Start Here (homepage) — your anchor article

**Status:** **Logic is in place** — you write the one-off “why Navigate / how to use the hub / where to go next” guide.

- Create it in Strapi (or add a draft folder later); set **`startHere: true`** on **one** published Resource.
- Query: **`startHere: true`**, **`publishedAt` not null** (`getStartHereArticle`). Until then, the homepage block does not render.
- **`relatedArticles`** on that anchor can point at batch-1 guides once they are published (run link script or set in Admin).

---

## 6. GitHub suggestion flow (optional — local test only)

**`/suggest-resource`** is a form that **creates a GitHub Issue** in your repo (for triage). It does **not** write to Strapi.

Only needed if you want to **test** that flow locally. Add to **`frontend/.env.local`**:

- `GITHUB_SUGGEST_TOKEN` — PAT with **Issues: write** on this repo
- `GITHUB_REPO_OWNER` — GitHub org or username
- `GITHUB_REPO_NAME` — e.g. `Navigate-Tech-Hub`

Without these, the form still loads but submit returns “not configured.” **Skip until you care about contributions in prod.**

---

## 7. Deploy (later)

- Production **`NEXT_PUBLIC_STRAPI_URL`**, **`STRAPI_API_TOKEN`** (if Public role is locked down).
- GitHub env vars above if using the suggestion API in prod.
- Run **`directoryTier`** migration against production Strapi once schemas match.

---

## 8. Opportunity Radar redesign

Tracked as a **separate epic**: see [`epics/radar-redesign.md`](./epics/radar-redesign.md). Not blocking the hub UX above.

---

## 9. Post-MVP product ideas

See [`post_mvp_features.md`](./post_mvp_features.md) (e.g. export / tracker experiments).
