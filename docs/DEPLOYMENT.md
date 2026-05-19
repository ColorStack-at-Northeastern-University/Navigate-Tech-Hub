# Deployment

## Frontend Environment Variables

### Local Next.js (`frontend/.env.local`)

| Variable | Scope | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_STRAPI_URL` | Public (browser + server) | Strapi API base URL. |
| `STRAPI_API_TOKEN` | Server only | Bearer token for `frontend/lib/strapi.ts`. |
| `GITHUB_SUGGEST_TOKEN` | Server only | GitHub token used by `/api/suggest-resource`. |
| `GITHUB_REPO_OWNER` | Server only | GitHub owner for suggestion issues. |
| `GITHUB_REPO_NAME` | Server only | GitHub repository for suggestion issues. |
| `NEXT_PUBLIC_SUBMIT_RESOURCE_URL` | Public (optional) | Override for the suggest-resource link. |
| `STRAPI_REVALIDATE_SECONDS` | Server only (optional) | ISR revalidate interval; default `180` in code. |
| `STRAPI_CACHE` | Server only (optional) | Set `no-store` to disable Strapi fetch caching. |
| `SUGGEST_RATE_LIMIT_MAX` | Server only (optional) | Max suggestion submissions per IP per window; default `5`. |
| `SUGGEST_RATE_LIMIT_WINDOW_SECONDS` | Server only (optional) | Suggestion rate-limit window; default `3600`. |

### Vercel Project Environment Variables

Set these per environment in Vercel Project Settings.

| Variable | Production | Preview | Notes |
|----------|------------|---------|-------|
| `NEXT_PUBLIC_STRAPI_URL` | Strapi Cloud production URL | Same or staging Strapi | Inlined at build; redeploy after changing. |
| `STRAPI_API_TOKEN` | Read-only Strapi token | Preview read-only token | Server-only. |
| `GITHUB_SUGGEST_TOKEN` | If form enabled | Optional | Fine-grained PAT with Issues:write. |
| `GITHUB_REPO_OWNER` | Yes | Yes | |
| `GITHUB_REPO_NAME` | Yes | Yes | |
| `NEXT_PUBLIC_SUBMIT_RESOURCE_URL` | Optional | Optional | Public link override. |
| `STRAPI_REVALIDATE_SECONDS` | `180` | `60` or unset | Production ISR TTL in seconds; dev uses `no-store`. |
| `SUGGEST_RATE_LIMIT_MAX` | `5` | `5` or unset | Best-effort per-instance API limit. |
| `SUGGEST_RATE_LIMIT_WINDOW_SECONDS` | `3600` | `3600` or unset | Rate-limit window in seconds. |

Do not put backend-only Strapi secrets such as `APP_KEYS`, `JWT_SECRET`, `DATABASE_*`, or `FULL_ACCESS_API_TOKEN` in Vercel.
