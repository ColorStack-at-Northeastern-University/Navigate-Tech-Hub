# Phase: Editorial metadata

## Artifacts

| Artifact | Path |
| -------- | ---- |
| Inventory | `docs/INTERNAL_GUIDE_INVENTORY.md` |
| Card one-liner | `docs/config/article-card-summaries.json` |
| Related guides | `docs/config/article-related-articles.json` |
| External links | `docs/config/article-external-links.json` |
| Draft frontmatter | `docs/internal_resources_drafts/{slug}/draft/article.md` |

Strapi `description` = card summary JSON at publish time.

## Card summary

- One sentence, plain English, **no markdown** (`>`, `##`).
- Under ~160 chars when possible.
- Vary openers; never truncate article body into summary.

## Steps

1. Load inventory row for slug.
2. Read `draft/article.md` if present (link ideas only).
3. Write card summary to JSON.
4. Set 2–3 related slugs + 2–6 external link labels (match `frontend/data/externalResources.ts` names when possible).
5. Sync YAML frontmatter if draft exists.
6. Run `node scripts/validate-card-summaries.mjs`.

## Hard rules

- No invented program names — `[FACT CHECK]` if unsure.
- Valid JSON after edits.
- Do not add inventory rows without user confirmation.
