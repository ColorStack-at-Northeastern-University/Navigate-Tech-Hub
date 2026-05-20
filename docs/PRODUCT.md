# Navigate Tech Hub — product

A curated web hub for **Black and Latinx CS students at Northeastern** (especially underclassmen): student-written guides, a vetted external directory, and a ColorStack opportunity carousel. Not a generic link dump or job board.

## Primary journeys

| Journey | Route | What the student gets |
|---------|--------|------------------------|
| Start | `/` → Start Here / featured | Orientation into the hub |
| Guides | `/browse`, `/[category]/[slug]` | Internal articles (interview prep, projects, hackathons, community, classes) |
| Directory | `/external-resources` | Tools, communities, recurring programs (Strapi) |
| Opportunities | `/` carousel | Short-lived ColorStack Slack roles (static data + maintenance PRs) |
| Contribute | `/contributions`, `/suggest-resource` | Suggest links; GitHub issues for fixes and guide ideas |
| Resume | `/resume` | Template download (no account) |

There is **no user login** on the public site. Trust is editorial: humans publish guides in Strapi; students suggest via forms/issues.

## What we optimize for

- **Curated over complete** — fewer, explained links beat exhaustive lists.
- **Student voice** — guides are researched and edited by students; AI may assist drafting, humans ship.
- **Honest state** — when Strapi fails, the UI says guides are unavailable (see `docs/UX.md`), not a silent empty grid.

## What this product is not

- A replacement for ColorStack national membership flows
- An authenticated student portal
- Automated compliance or document generation (unlike SDD-style tooling)

## References

1. `docs/DOMAIN.md` — vocabulary (guide vs external resource vs carousel)
2. `docs/UX.md` — empty/error states and primary actions per route
3. `frontend/lib/faqContent.ts` — student-facing FAQ copy (must stay aligned with this doc)
