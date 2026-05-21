# Documentation index

Read in this order for a full picture. **Do not duplicate** these topics in module READMEs — link here instead.

## Authority

| Tier | Files | Use |
|------|--------|-----|
| **Canonical** | This index, `PRODUCT.md`, `DOMAIN.md`, `ARCHITECTURE.md`, `UX.md`, module READMEs | Current behavior |
| **Workflow** | `.cursor/skills/*`, `docs/EDITORIAL.md` | How to run pipelines |
| **Historical** | `docs/internal_resources_drafts/`, `docs/opportunities-radar/` | Drafts and research, not runtime spec |

If docs conflict with code, **code wins** until the doc is updated. Call out conflicts in PRs; do not guess.

## Deployment

This repo does not document production deploy steps. Email **odubiyi.a@northeastern.edu** for deployment or hosting questions.

## Read order

1. [`../README.md`](../README.md) — clone, branch, run frontend
2. [`PRODUCT.md`](PRODUCT.md) — product model and journeys
3. [`DOMAIN.md`](DOMAIN.md) — vocabulary
4. [`ARCHITECTURE.md`](ARCHITECTURE.md) — Strapi, GitHub, Actions, static data
5. [`UX.md`](UX.md) — routes, empty/error states
6. [`TESTING.md`](TESTING.md) — smoke vs prod Playwright
7. [`../frontend/README.md`](../frontend/README.md) — env vars, dev commands
8. [`../frontend/e2e/README.md`](../frontend/e2e/README.md) — prod health suite detail
9. [`../backend/README.md`](../backend/README.md) — Strapi Cloud + CORS
10. [`EDITORIAL.md`](EDITORIAL.md) — guides and opportunities pipelines
11. [`AGENT_ONBOARDING.md`](AGENT_ONBOARDING.md) — paste prompt for coding agents

## Topic ownership

| Topic | Owner doc | Do not copy into |
|--------|-----------|------------------|
| Audience & journeys | `PRODUCT.md` | `frontend/README.md` |
| Terms (guide, tier, loadStatus) | `DOMAIN.md` | `ARCHITECTURE.md` |
| Request/data flow | `ARCHITECTURE.md` | `PRODUCT.md` |
| Routes and CMS empty states | `UX.md` | `PRODUCT.md` |
| E2E commands | `TESTING.md` + `frontend/e2e/README.md` | root README (link only) |
| Ship a guide to Strapi | `EDITORIAL.md` + ship-internal-guide skill | `ARCHITECTURE.md` |
| Biweekly email drafts (Buttondown) | Local `docs/newsletter/` (gitignored) + GitHub issue reminder | `PRODUCT.md` |
| Deployment / production access | Email maintainer (above) | any tracked doc |

Contributors on PRs need items **1–9**; add **10–11** when touching content pipelines or agent workflows.
