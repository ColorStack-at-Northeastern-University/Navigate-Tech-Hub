---
name: colorstack-opportunities-ingest
description: |
  Ingest ColorStack Slack #opportunities paste into homepage carousel data.
  Parse URLs, curate entries, merge into frontend/data/opportunities.ts, run link check.
  Activate when user says: ingest opportunities, parse colorstack slack, update opportunity
  carousel, paste opportunities, refresh homepage opportunities.
---

# ColorStack Opportunities Ingest

## Product context

Homepage **ColorStack Opportunities** carousel (`ColorStackOpportunities.tsx`) reads `COLORSTACK_OPPORTUNITIES` from `frontend/data/opportunities.ts`. Students trust this block — dead links and stale deadlines hurt chapter credibility.

## How this skill uses `.md` files

| Topic | Read |
| ----- | ---- |
| User paste format | `references/intake.md` |
| Parse + merge rules | `references/merge-and-sort.md` |
| Link verification | `references/link-check.md` |

---

## User intake

User pastes raw Slack export **or** provides path to `raw-opps.txt`. See `references/intake.md`.

---

## Orchestration

1. Save paste to `docs/opportunities-radar/inbox/colorstack-raw-{YYYY-MM-DD}.txt` (create `inbox/` if needed) — audit trail.
2. Run parser:
   ```bash
   node scripts/parse-opportunities.mjs docs/opportunities-radar/inbox/colorstack-raw-{date}.txt > docs/opportunities-radar/inbox/parsed-{date}.json
   ```
3. Read `references/merge-and-sort.md` — hand-merge into `frontend/data/opportunities.ts`:
   - Fill `(fill in title)` / `(fill in company)` from `_lineContext` when `DEBUG=1` parse
   - Dedupe by `url` against existing entries
   - Assign `id` sequentially; preserve comment sections in TS file
4. Run link check (`references/link-check.md`):
   ```bash
   node scripts/check-opportunity-links.mjs
   ```
5. Present **diff summary** for user approval before considering done.

## Sub-agents (optional)

For large pastes (30+ URLs):

- **Child 1:** Parse only → JSON file (no TS edit).
- **Child 2:** Propose title/company/deadline fixes from link previews (web) for rows marked fill-in.
- **Parent:** merges JSON + runs link check once.

Each child gets absolute paths; forbid editing `opportunities.ts` unless assigned merge step.

---

## Output

```text
## ColorStack ingest — {date}

Parsed: N URLs → M after dedupe/skips
Added: X | Updated: Y | Skipped: Z
Link check: OK / FAIL / GENERIC (list failures)
Manual review needed: [rows with fill-in fields]

Next: user approves diff → deploy
```

## Hard rules

- Never store Slack member names in repo data (ColorStack as source only).
- Do not skip `check-opportunity-links` before calling ingest complete.
- Escape quotes in TS strings — run TypeScript check or `npm run build` in frontend if unsure.
- Parser is authoritative for URL extraction — do not hand-roll regex over full paste in parallel.
