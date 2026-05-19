# ColorStack #opportunities ingest

## Parse a Slack paste

```bash
node scripts/parse-opportunities.mjs --anchor-date=2026-05-18 path/to/raw-opps.txt > parsed.json
```

- **`--anchor-date`**: Date you copied from Slack (required for `Today` / `Yesterday`).
- **`postedAt`**: Parsed from Slack timestamps when confident; otherwise omitted.
- **`pasteIndex`**: Order URLs appear in the paste (higher = newer). Used when `postedAt` is missing.
- **`postedAtSource`**: `slack` | `inferred` | `paste-order` | `override`

## Manual overrides

Edit `docs/config/opportunities-overrides.json`:

```json
{
  "overrides": [
    { "url": "https://example.com/job", "postedAt": "2026-05-10" }
  ]
}
```

## Sort on the site

`COLORSTACK_OPPORTUNITIES` is sorted at build time:

1. Rows with `deadline` first (earliest due first)
2. Then `postedAt` descending
3. Then `pasteIndex` descending
4. Then `id`

Existing curated rows without `postedAt` keep current order via `pasteIndex` fallback from file position.

## Tests

```bash
node scripts/test-slack-post-dates.mjs
```
