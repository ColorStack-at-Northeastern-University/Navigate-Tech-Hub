# Opportunity Radar — helper scripts

## `verify-findings.mjs`

Deterministic pass over `../findings/*.md` (optional `../findings/_orgs/*.md` with `--include-orgs`). Loads `../sources/deny-list.md` and `../sources/aliases.md`, assigns each parsed program to **Tier A / B / C** with explicit machine-readable reasons.

- **Tier A** — `https` `official_url`, known `program_type`, file not `NO_PROGRAMS_FOUND`, not deny-listed company, not alias-dead program name match.
- **Tier B** — default when something is incomplete or soft-signal (generous: do not drop from human review).
- **Tier C** — hard excludes: deny-list company slug, alias row with dead RHS matching program title (and company slug when present), or file-level `NO_PROGRAMS_FOUND` / `BLOCKED`.

Outputs go to **`output/`** (often gitignored during merges):

```bash
node docs/opportunities-radar/scripts/verify-findings.mjs
node docs/opportunities-radar/scripts/verify-findings.mjs --include-orgs
node docs/opportunities-radar/scripts/verify-findings.mjs --strict
```

From repo root, `REPO_ROOT` is resolved as three levels above this `scripts/` folder.
