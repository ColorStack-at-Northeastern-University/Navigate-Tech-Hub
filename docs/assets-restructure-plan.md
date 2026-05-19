# Static assets restructure plan

## Assessment (May 2026)

| Finding | Risk |
|---------|------|
| UI images/fonts already in `frontend/public/images` and `public/fonts` | None — no move needed |
| Resume `.docx` filename ≠ `siteAssets.ts` href | **High** — 404 on download |
| `SITE_ASSETS` only covered resume; images hardcoded in 3 components | Low — consistency debt |
| Orphan files: `vercel.svg`, `file.svg`, `window.svg`, `dontuselowquality.png` | Low — safe to remove |
| Sample PDF paths declared but files not on disk | Med — still `#` in UI |
| Strapi `/uploads/` | Out of scope — CMS-hosted |

## Phased rollout (test after each step)

| Step | Action | Verify |
|------|--------|--------|
| 1 | Align resume template path with committed filename | `node scripts/verify-static-assets.mjs` |
| 2 | Centralize image paths in `siteAssets.ts`; update Navbar, Hero, footer | Same + `npm run test:e2e` smoke |
| 3 | Remove unreferenced `public/` orphans | verify script + smoke |
| 4 | Add Playwright checks for key static URLs | e2e `static assets` describe |

## Target layout

```
public/
  images/     # Brand & UI raster
  fonts/      # @font-face OTF
  assets/     # User downloads (resume, future guides)
```

Registry: `frontend/lib/siteAssets.ts` — single source for paths used in TS.
