# Phase: Publish gate

## Scripts

```bash
node scripts/validate-card-summaries.mjs
node scripts/publish-internal-guides-from-drafts.mjs --dry-run   # optional first
node scripts/publish-internal-guides-from-drafts.mjs
```

Strapi: `STRAPI_URL` (default `http://localhost:1337`). Token: `backend/.env` → `FULL_ACCESS_API_TOKEN`.

Optional after publish (user asked): `node scripts/apply-article-links.mjs` — read script header first.

## Preflight per slug

- `draft/article.md` exists
- `article-card-summaries.json` has plain one-liner (not article text)
- At least two `##` in body
- Frontmatter slug matches folder

## Post-publish

- Spot-check Strapi `description` for 1–2 slugs (must match card JSON).
- Tell user: hard refresh browse; restart `npm run dev` if stale cards.

## Hard rules

- Never publish if validate fails.
- Never use truncated article as description.
