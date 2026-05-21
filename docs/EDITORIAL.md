# Editorial pipelines

Runtime docs (`ARCHITECTURE.md`) describe what students **see** in production. This file describes how content **gets there** — via drafts, agents, and maintainer review.

## Internal guides (Strapi articles)

| Stage | Location |
|-------|----------|
| Draft markdown | `docs/internal_resources_drafts/<slug>/` |
| Publish workflow | `.cursor/skills/ship-internal-guide/` (local skill; may be gitignored) |
| Live content | Strapi `resource` → Next.js routes |

Flow: research/draft in repo → editorial metadata → Strapi publish → site picks up published content.

Do not document every draft folder here. The skill owns step-by-step commands.

## Biweekly email (Buttondown)

| Piece | Location |
|-------|----------|
| Draft markdown | `docs/newsletter/` (gitignored — local only) |
| Push draft to Buttondown | `node scripts/draft-buttondown-newsletter.mjs <path-to-draft.md>` |
| Reminder | GitHub Action `.github/workflows/newsletter-draft-reminder.yml` opens an issue ~every 14 days |

Site signup is `POST /api/newsletter` on the frontend; sending the digest is manual in Buttondown.

## External resources

Edited in **Strapi Admin** (`external-resource` type). Frontend reads published entries only.

Student suggestions arrive via `/suggest-resource` → GitHub issue → human adds to Strapi.

## Homepage opportunities (carousel)

| Stage | Location |
|-------|----------|
| Slack paste ingest | `.cursor/skills/colorstack-opportunities-ingest/` |
| Live data | `frontend/data/opportunities.ts` |
| Link maintenance | `scripts/maintain-opportunities.mjs` + scheduled PR |

Optional research: `docs/opportunities-radar/findings/` — not served to users.

## What contributors on PRs need

- **Code/UI PRs:** `README.md`, `frontend/README.md`, `docs/TESTING.md` — no editorial skill required.
- **New guide:** follow ship-internal-guide skill; do not hand-edit Strapi without a reviewed draft.
- **Carousel update:** colorstack-opportunities-ingest skill or approved maintenance PR.

## References

1. `docs/PRODUCT.md` — curated-not-dump principle
2. `docs/DOMAIN.md` — guide vs external resource vs opportunity
3. `docs/INDEX.md` — read order
