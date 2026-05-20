# backend/

Strapi 5 project for **Strapi Cloud** (CMS). Separate from the Next.js frontend.

## Role

| Content type | Consumed by |
|--------------|-------------|
| `resource` | Internal guides (`/browse`, `/[category]/[slug]`) |
| `external-resource` | `/external-resources` |

Public site reads via Content API. Editors use Strapi Admin (credentials).

## CORS

`config/middlewares.ts` allows the public site origin, localhost, and `STRAPI_CORS_ORIGINS` env entries.

## Local Strapi (optional)

Maintainers run Strapi locally only when debugging CMS behavior. Most contributors touch `frontend/` and published Cloud content.

```powershell
npm install
npm run develop
```

Env: see `.env.example`.

## References

1. [`docs/ARCHITECTURE.md`](../docs/ARCHITECTURE.md)
2. [`docs/EDITORIAL.md`](../docs/EDITORIAL.md)
3. [`docs/DOMAIN.md`](../docs/DOMAIN.md)
