# Intake — Slack paste

## What to paste

Raw copy from **#opportunities** (link previews + surrounding text). Include:

- Full URLs (Greenhouse, Workday, company careers, program pages)
- Deadline lines when present (“Due June 14”, “apply by…”)

## User message template

```text
ingest colorstack opportunities

[paste Slack export below]
```

Or:

```text
ingest opportunities from file: docs/opportunities-radar/inbox/colorstack-raw-2026-05-18.txt
```

## Noise (parser skips)

LinkedIn feeds, Slack archive links, Google Forms, referral-only links — see `SKIP_PATTERNS` in `scripts/parse-opportunities.mjs`.

## After parse

Human must review every `(fill in title)` / `(fill in company)` before merge.
