# Link check

```bash
node scripts/check-opportunity-links.mjs
```

## Result codes

- **OK** — resolves
- **FAIL** — 404 / connection error → fix URL or remove row
- **GENERIC** — landed on generic careers hub → likely dead program page; verify manually

## Policy

Ingest is **not complete** while any FAIL remains unless user explicitly defers a row with comment in report.

For GENERIC: user decides keep vs remove vs update URL.
