# E2E tests (Playwright)

Two suites, one goal for prod: **is the public deployed site healthy?** Local smoke checks that core pages work in dev.

| Command | Suite | Target |
|---------|--------|--------|
| `npm run test:e2e` | Smoke (`smoke.spec.ts` + static assets) | Local dev server (auto-starts) |
| `npm run test:e2e:prod` | Public health (`public-health*.spec.ts`, tag `@prod`) | `PLAYWRIGHT_BASE_URL` (Vercel prod) |
| `npm run test:e2e:ui` | Either (pick in UI) | Depends on env |

---

## One-time setup

```powershell
cd frontend
npm ci
npx playwright install chromium
```

---

## Local smoke

**File:** `smoke.spec.ts`

Starts `npm run dev` on `http://127.0.0.1:3000` unless `PLAYWRIGHT_BASE_URL` is already set.

```powershell
cd frontend

# Important: clear prod URL so Playwright starts the dev server
Remove-Item Env:PLAYWRIGHT_BASE_URL -ErrorAction SilentlyContinue

npm run test:e2e
```

**Article tests** open the **first guide link from `/browse`** (not a fixed slug). That way smoke still passes when prod-only launch guides differ from local sample data—as long as browse shows at least one published guide.

**Includes:** home, browse, external resources, category hub, article prose/frontmatter, FAQ, contributions, suggest form, static assets (logo, fonts, resume template).

---

## Prod public health

**Files:** `public-health.spec.ts`, `public-health-edge.spec.ts`, `public-health-stress.spec.ts`  
**Tag:** `@prod` — skipped automatically when `PLAYWRIGHT_BASE_URL` is unset or points at localhost.

```powershell
cd frontend
$env:PLAYWRIGHT_BASE_URL = "https://navigate-tech-hub.vercel.app"
npm run test:e2e:prod
```

Does **not** start a local dev server.

### Suite breakdown

| File | Focus |
|------|--------|
| `public-health.spec.ts` | CMS outage/empty banners, **full UI crawl** of up to 50 browse articles, featured link, CSV/ICS downloads, key pages |
| `public-health-edge.spec.ts` | 404 pages, nav/footer routes, category hubs, about/resume, Start Here, mobile viewport, external link `noopener` sample, GET `/api/suggest-resource` guard |
| `public-health-stress.spec.ts` | Parallel route burst, parallel article HTTP GETs, rapid nav loop, browse reloads, dual CSV download, multi-context load |

### Article coverage (prod)

- **Every guide linked from `/browse`** (max 50): full page load + `.article-prose` + no `slug:` / `draftStatus:` leak + at least one `h2`.
- Stress suite also **GETs the same URLs in parallel** (status only, faster).
- Featured / Start Here: one extra article path each when present.

Unpublished slugs not on browse are **not** tested (by design).

### What prod tests skip

- Strapi Admin, auth
- POST `/api/suggest-resource` (GitHub issues)
- Exact guide/opportunity counts, deep CSV/ICS parsing
- Hardcoded launch slug lists

---

## Useful commands

```powershell
# Interactive UI (pick tests, watch browser)
npm run test:e2e:ui

# Prod: one file
npm run test:e2e:prod -- e2e/public-health-edge.spec.ts

# Prod: one test by title
npm run test:e2e:prod -- -g "CSV download"

# Headed browser
npm run test:e2e:prod -- --headed

# Debug
npm run test:e2e:prod -- --debug

# HTML report after a failure
npx playwright show-report
```

---

## CI (GitHub Actions)

Workflow: **E2E prod health** (`.github/workflows/e2e-prod.yml`)

- Trigger: **Run workflow** (manual `workflow_dispatch` only)
- Secret: `PLAYWRIGHT_BASE_URL` = production Vercel URL (e.g. `https://navigate-tech-hub.vercel.app`)
- Command: `npm run test:e2e:prod`

Later (optional): nightly cron or run after production deploy. Avoid running prod tests on every PR.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|----------------|-----|
| Smoke hits prod and article tests 404 | `PLAYWRIGHT_BASE_URL` still set | `Remove-Item Env:PLAYWRIGHT_BASE_URL` then `npm run test:e2e` |
| Prod tests all skipped | URL unset or localhost | Set `PLAYWRIGHT_BASE_URL` to your Vercel URL |
| “No guides published yet” / “Guides temporarily unavailable” | Strapi down or empty catalog | Fix CMS/token/content; not a Playwright bug |
| Article crawl slow | Up to 50 full page loads | Normal (~1 min); stress GET test is lighter |

---

## Layout

```
e2e/
  README.md
  smoke.spec.ts              # local / PR smoke
  public-health.spec.ts      # prod core @prod
  public-health-edge.spec.ts # prod edge @prod
  public-health-stress.spec.ts
  helpers/
    public-health.ts         # shared helpers (browse hrefs, CMS checks, parallel GET)
```

Config: `frontend/playwright.config.ts` (60s timeout when prod URL is set).
