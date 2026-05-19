# Merge and sort — opportunities.ts

## Target file

`frontend/data/opportunities.ts` — `COLORSTACK_OPPORTUNITIES` array.

## Sort order (match existing convention)

1. **Entries with `deadline`** — earliest deadline first (INSIGHT / dated programs at top).
2. **Programs / insight / fellowship** (`type: 'program'`) before generic internships when no deadline.
3. **Internships / co-op / new-grad** — roughly by company name or recency at curator discretion.
4. Keep section comment: `// ── Entries with explicit deadlines …` when applicable.

## Merge rules

- **Dedupe:** same `url` → update existing row, do not duplicate `id`.
- **New rows:** next `id` = max(existing id) + 1.
- **Fields:** `title`, `company`, `url`, `type`, optional `description`, `location`, `deadline`, `tags`.
- **Tags:** optional — e.g. `['SWE']`, `['Quant']`, `['Insight']` when obvious from post.
- **Description:** one line from link preview when trustworthy; omit if unknown.

## Type heuristic (parser)

Align with `guessType()` in parse script; override when post clearly says insight day vs intern.

## TS hygiene

- Single quotes in strings; escape `'` inside titles.
- Trailing commas on objects.
- Run `cd frontend && npx tsc --noEmit` after edit if large change.
