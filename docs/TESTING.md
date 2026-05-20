# Testing

| Layer | Command | Target |
|-------|---------|--------|
| Local smoke | `cd frontend && npm run test:e2e` | Dev server (auto-start) |
| Prod health | `PLAYWRIGHT_BASE_URL=<production site URL> npm run test:e2e:prod` | Live site |

Detail: [`../frontend/e2e/README.md`](../frontend/e2e/README.md).

Production URL and CI secrets: email **odubiyi.a@northeastern.edu**.

## What prod health answers

**Is the public site healthy?** — CMS guides render, browse links work, no outage banner, key exports download.

## What prod health does not test

- Strapi Admin
- `POST /api/suggest-resource` (needs secrets; side effects)
- Exact counts of guides or opportunities
- Hardcoded launch slug lists (browse crawl discovers URLs)

## CI

Workflow: `.github/workflows/e2e-prod.yml` — **manual** `workflow_dispatch` only. Secret `PLAYWRIGHT_BASE_URL` = production URL.

Do not run prod tests on every PR against live production.

## Local dev

```powershell
cd frontend
Remove-Item Env:PLAYWRIGHT_BASE_URL -ErrorAction SilentlyContinue
npm run test:e2e
```

Clear `PLAYWRIGHT_BASE_URL` before local smoke or tests will hit prod instead of `npm run dev`.

## References

1. `frontend/playwright.config.ts`
2. `docs/INDEX.md`
