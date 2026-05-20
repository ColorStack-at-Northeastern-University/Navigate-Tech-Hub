# Domain vocabulary

Terms used across code, Strapi, and docs. If a doc uses a different word for the same thing, fix the doc.

## Content types

| Term | Where it lives | Meaning |
|------|----------------|---------|
| **Internal guide** | Strapi `resource` → routes `/[category]/[slug]` | Long-form markdown article in five browse categories (`interview-prep`, `classes`, `projects`, `hackathons`, `community`). Not `programs` on browse. |
| **External resource** | Strapi `external-resource` → `/external-resources` | Vetted outbound link with description; tools, communities, or recurring programs. |
| **Opportunity row** | `frontend/data/opportunities.ts` | Ephemeral job/program link from ColorStack Slack; homepage carousel only. |
| **Start Here** | Strapi flag / home | One featured onboarding guide when configured. |

## Directory tiers (external resources)

| Tier | UX | Typical URL pattern |
|------|-----|---------------------|
| `tools-and-communities` | Whole card → `resource.url` | Stable tool or community homepage |
| `recurring-program` | Card → careers hub; cycle callout for season/reminders | Company program landing, not a single req ID |

## Catalog load status (guides)

Returned by `frontend/lib/strapi.ts` as `GuidesCatalogLoadStatus`:

| Status | User-visible signal |
|--------|---------------------|
| `loaded` | Normal grid |
| `empty` | “No guides published yet” (or category-specific empty) |
| `unavailable` | “Guides temporarily unavailable” — CMS/token failure in production |

Prod E2E treats both **unavailable** and **empty** on home/browse as failures when content is expected live.

## Contribution channels

| Channel | Entry | Backend |
|---------|--------|---------|
| Suggest resource | `/suggest-resource` | `POST /api/suggest-resource` → GitHub issue |
| Fix content / pitch guide | `/contributions` | GitHub `issues/new` with labels |
| Code / UI | `/contributions` | PRs to `develop` |

## Editorial vs runtime

| Path | Role |
|------|------|
| `docs/internal_resources_drafts/` | Draft markdown pipeline before Strapi publish |
| `docs/opportunities-radar/` | Research notes for carousel ingest (not served) |
| `.cursor/skills/ship-internal-guide/` | Agent workflow for guide → Strapi |

See `docs/EDITORIAL.md` — not part of the request path for a page view.

## References

1. `frontend/lib/types.ts` — TypeScript enums and shapes
2. `docs/ARCHITECTURE.md` — where Strapi vs static files vs GitHub fit
3. `docs/PRODUCT.md` — who the site serves and why
