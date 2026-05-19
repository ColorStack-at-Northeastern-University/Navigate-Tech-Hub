---
name: ship-internal-guide
description: |
  End-to-end Navigate internal guide workflow: metadata, Phase A→B→C draft pipeline,
  and Strapi publish. One invocation from slug + optional mode.
  Activate when user says: ship guide, ship internal guide, publish guide [slug],
  finish and publish [slug], run full pipeline [slug], guide to production.
  Replaces separate publish-gate, draft-pipeline-runner, editorial-metadata-packager calls.
---

# Ship Internal Guide (orchestrator)

## How this skill uses `.md` files

Cursor loads **this** `SKILL.md` first (routing + intake). **Detailed steps live in `references/`** — read each file only when executing that phase:

| Phase | Read this file |
| ----- | ---------------- |
| Card summary, links, frontmatter | `references/metadata.md` |
| Verification → draft → style | `references/draft-pipeline.md` |
| Validate + Strapi publish | `references/publish.md` |
| User paste formats | `references/intake.md` |

Do not duplicate those files in chat — **Read** them at runtime.

---

## User intake (one paste)

See `references/intake.md`. Minimum:

```text
slug: resume-for-tech-roles
mode: full
```

**Modes:** `full` | `metadata` | `pipeline` | `publish` | `from-brief` (synthesis already done)

---

## Orchestration (parent agent)

1. Parse slug + mode from user message (`references/intake.md`).
2. Resolve **absolute paths** for this repo (pass to all sub-agents):
   - `docs/internal_resources_drafts/{slug}/…`
   - `docs/config/article-card-summaries.json`
   - `docs/INTERNAL_GUIDE_INVENTORY.md`
3. **If no `synthesis/brief.md` and mode needs writing:** stop — user must run **article-synthesizer** first.
4. Execute phases in order (skip per mode):

| Step | When | Action |
| ---- | ---- | ------ |
| **1 Metadata** | `full`, `metadata`, `from-brief` (if configs missing) | Read `references/metadata.md`, apply |
| **2 Pipeline** | `full`, `pipeline`, `from-brief` | Read `references/draft-pipeline.md`; run A→B→C |
| **3 Publish** | `full`, `publish` | Read `references/publish.md`; validate + publish |

5. **Sub-agents (Task tool):** For `full` on 2+ slugs or heavy Phase A web verification, fan out **one slug per sub-agent** for pipeline step only. Parent runs metadata + publish. Each child prompt must include:
   - Absolute paths (no repo search on OneDrive)
   - “Read `.cursor/skills/ship-internal-guide/references/draft-pipeline.md` and execute phases A→B→C for slug X only”
   - “Do not publish; do not edit synthesis/brief.md”

6. End with unified report (template below).

---

## Unified report

```text
## Ship internal guide — {slug or batch}

Mode: …
| Step | Status | Notes |
|------|--------|-------|
| Metadata | … | … |
| Phase A | … | … |
| Phase B | … | … |
| Phase C | … | … |
| Publish | … | … |

Strapi spot-check: …
Frontend: hard refresh / restart dev if needed
Blockers: …
```

---

## Hard rules (all phases)

- `synthesis/brief.md` is never overwritten.
- Card `description` in Strapi comes only from `article-card-summaries.json` (see `references/publish.md`).
- Phase C never rewrites facts — style only.
- Repo on OneDrive: bounded paths; see `docs/internal_resources_drafts/DRAFT_PIPELINE.md` TOOL ALLOWLIST for children.

---

## Legacy skill names

Same workflow — invoke **ship-internal-guide** instead of: `publish-gate`, `draft-pipeline-runner`, `editorial-metadata-packager`.
