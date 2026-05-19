# Phase: Draft pipeline (A → B → C)

Authoritative repo doc: `docs/internal_resources_drafts/DRAFT_PIPELINE.md`

## Paths

```
docs/internal_resources_drafts/{slug}/synthesis/brief.md          # read-only
docs/internal_resources_drafts/{slug}/synthesis/verification-log.md
docs/internal_resources_drafts/{slug}/draft/article.md
.cursor/rules/navigate-writing.mdc
```

## Phase A — Verification

- **Write:** `verification-log.md` only.
- Resolve PENDING ITEMS from brief; web for checkable claims.
- `cs-course-planning-neu`: no fabricated catalog facts.

## Phase B — Draft

- **Write:** `draft/article.md` (full).
- Reads: brief, verification-log, navigate-writing.mdc.
- YAML frontmatter; sections from brief; `[FACT CHECK]` preserved.
- Web layout: `##` headers, bullets, `---`, optional `> ### Key takeaways`.
- **MOTT slugs:** `coding-with-ai-foundations`, `coding-with-ai-debugging`, `coding-with-ai-code-review`, `coding-with-ai-learning-path` — substantive Total TypeScript link.
- **`selecting-electives-intentionally`:** third person only.

## Phase C — Style gate

- **Write:** `draft/article.md` patches only.
- Fix banned patterns (navigate-writing.mdc); no summary closer.
- `draftStatus: phase-c` in frontmatter when present.
- Do not edit `synthesis/*` or rules files.

## Order

A → B → C. No B without verification-log.
