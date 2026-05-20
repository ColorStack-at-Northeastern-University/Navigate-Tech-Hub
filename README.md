# Navigate Tech Hub

Curated guides and external resources for ColorStack CS students at Northeastern. Next.js frontend; articles and directory from Strapi Cloud.

## Run locally

**Prerequisites:** Node.js LTS, Git.

```powershell
git clone https://github.com/ColorStack-at-Northeastern-University/Navigate-Tech-Hub.git
cd Navigate-Tech-Hub
git checkout develop
cd frontend
npm install
```

Create `frontend/.env.local` (see [`frontend/README.md`](frontend/README.md)). Minimum for dev:

```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Or point `NEXT_PUBLIC_STRAPI_URL` at Strapi Cloud and set `STRAPI_API_TOKEN` (read-only).

```powershell
npm run dev
```

Open http://localhost:3000.

## Branches

Open pull requests against **`develop`**.

**Deployment or production hosting:** email **odubiyi.a@northeastern.edu** — not documented in this repo.

## Documentation

Full map: [`docs/INDEX.md`](docs/INDEX.md).

Agents: paste [`docs/AGENT_ONBOARDING.md`](docs/AGENT_ONBOARDING.md) before large changes.

## Tests

```powershell
cd frontend
npm run test:e2e
```

Prod health (manual): see [`docs/TESTING.md`](docs/TESTING.md).
