---
name: navigate-linked-docs
description: |
  Create or update Navigate Tech Hub documentation without duplication. Routes to
  canonical docs in docs/ and module READMEs. Apply technical-docs-writer structure,
  readme-writer tone, ux-product for UI routes. Activate when writing README, docs/*,
  AGENT_ONBOARDING, or "document this module".
---

# Navigate linked documentation (project)

This repo uses a **linked doc graph** — one canonical file per topic, everything else links.

## Before writing

1. Read `docs/INDEX.md` (authority + ownership table).
2. Classify the change:

| Type | Canonical file |
|------|----------------|
| Product / audience / journeys | `docs/PRODUCT.md` |
| Terms (guide, tier, loadStatus) | `docs/DOMAIN.md` |
| Strapi / GitHub / Actions flow | `docs/ARCHITECTURE.md` |
| Routes, empty states | `docs/UX.md` |
| E2E smoke vs prod | `docs/TESTING.md` + `frontend/e2e/README.md` |
| Draft/publish pipelines | `docs/EDITORIAL.md` + relevant `.cursor/skills/*` |
| Deployment / production hosting | **Not in repo** — `docs/INDEX.md` says email odubiyi.a@northeastern.edu |
| Module run/env | `frontend/README.md` or `backend/README.md` |

3. If no row fits, ask the user which doc should own the topic.

## Child skills (apply their rules; do not paste them whole)

| Skill | When |
|-------|------|
| `technical-docs-writer` | Structure: top-level vs module README, References |
| `readme-writer` | Tone: no banned AI patterns, exact commands, tables for env vars |
| `ux-product` | Documenting or reviewing UI flows → update `docs/UX.md` |

Personal copy of the parent workflow: `~/.cursor/skills/linked-documentation/` (same rules, any repo).

## Writing rules

- **Link, don’t repeat** — module README gets ≤2 paragraphs of overview + links to `docs/`.
- **Update routers** — rename → fix `docs/INDEX.md` read order and `docs/AGENT_ONBOARDING.md` list only.
- **No deploy runbooks in git** — one line in INDEX/README pointing to maintainer email.
- **Editorial trees** — `docs/internal_resources_drafts/` and `docs/opportunities-radar/` are pipelines; link from `docs/EDITORIAL.md`, do not mirror in ARCHITECTURE.
- **Forbidden** — Next.js tutorial boilerplate in `frontend/README.md`; launch slug lists in docs and tests.

## After editing

- Add new canonical files to `docs/INDEX.md` read order and ownership table.
- If UX-visible behavior changed, check alignment with `docs/PRODUCT.md` and `frontend/lib/faqContent.ts`.

## References

1. `docs/INDEX.md`
2. `docs/AGENT_ONBOARDING.md`
