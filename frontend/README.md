# frontend/

Next.js App Router app. Server components fetch Strapi; one API route creates GitHub issues.

## Run

```powershell
npm install
npm run dev
```

http://localhost:3000

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Yes | Strapi API base URL |
| `STRAPI_API_TOKEN` | Prod / cloud dev | Read-only token; server-only (no `NEXT_PUBLIC_`) |
| `GITHUB_SUGGEST_TOKEN` | For suggest form | Issues write on this repo |
| `GITHUB_REPO_OWNER` | For suggest form | `ColorStack-at-Northeastern-University` |
| `GITHUB_REPO_NAME` | For suggest form | `Navigate-Tech-Hub` |
| `STRAPI_REVALIDATE_SECONDS` | Optional | ISR interval; default `180` |
| `STRAPI_CACHE` | Optional | Set `no-store` to disable fetch cache |
| `SUGGEST_RATE_LIMIT_MAX` | Optional | Default `5` per IP per instance |
| `SUGGEST_RATE_LIMIT_WINDOW_SECONDS` | Optional | Default `3600` |
| `BUTTONDOWN_API_KEY` | Newsletter signup | Server-only; Buttondown API token |
| `BUTTONDOWN_NEWSLETTER_TAG` | Optional | Tag on new subscribers (e.g. `navigate-updates`) |
| `NEWSLETTER_RATE_LIMIT_MAX` | Optional | Default `10` signup attempts per IP per instance |
| `NEWSLETTER_RATE_LIMIT_WINDOW_SECONDS` | Optional | Default `3600` |

Copy from `.env.example`. Do not commit `.env.local`.

## Key paths

| Path | Role |
|------|------|
| `app/` | Routes and `api/suggest-resource` |
| `lib/strapi.ts` | Strapi client and mappers |
| `lib/safeUrl.ts` | http(s) link sanitization |
| `data/opportunities.ts` | Homepage carousel (static) |
| `e2e/` | Playwright smoke + prod health |

## Value metrics

Use **Vercel Analytics → Visitors** for site-wide unique visitors. Use **Vercel Analytics → Events** for value outcomes: opportunity clicks, external-resource clicks, article reads over one minute, asset downloads, contribution CTAs, and suggestions.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run test:e2e` | Local smoke |
| `npm run test:e2e:prod` | Prod health (`PLAYWRIGHT_BASE_URL` required) |

## References

1. [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)
2. [`docs/DOMAIN.md`](../docs/DOMAIN.md)
3. [`e2e/README.md`](e2e/README.md)
