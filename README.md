# Navigate Tech Hub

Curated guides and external resources for ColorStack CS students at Northeastern and beyond.

## Stack

Next.js (App Router), Strapi Cloud, Vercel.

## Run locally

Node.js LTS and Git.

```powershell
git clone https://github.com/ColorStack-at-Northeastern-University/Navigate-Tech-Hub.git
cd Navigate-Tech-Hub\frontend
npm install
```

Clone checks out `develop` (GitHub default).

Create `frontend/.env.local` — variable list in [`frontend/README.md`](frontend/README.md). Local Strapi:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Strapi Cloud: set `NEXT_PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN` (read-only).

```powershell
npm run dev
```

http://localhost:3000

## Branches

| Branch | Use |
|--------|-----|
| `develop` | Default on GitHub. Land features here; open PRs against `develop`. Push → Vercel preview. |
| `main` | [navigatetechhub.com](https://navigatetechhub.com). Merge `develop` into `main`, then push. |

```powershell
git checkout develop
git checkout -b your-feature
# open PR → develop
# release (maintainers): merge develop → main, push origin main
```

Production deploy access: [odubiyi.a@northeastern.edu](mailto:odubiyi.a@northeastern.edu).

## Docs

| Path | Contents |
|------|----------|
| [`docs/INDEX.md`](docs/INDEX.md) | Doc map |
| [`docs/AGENT_ONBOARDING.md`](docs/AGENT_ONBOARDING.md) | Paste into agent sessions for large changes |

## Tests

```powershell
cd frontend
npm run test:e2e
```

Prod Playwright: [`docs/TESTING.md`](docs/TESTING.md).
