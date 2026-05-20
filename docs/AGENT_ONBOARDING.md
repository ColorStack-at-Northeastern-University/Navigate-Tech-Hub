# Agent onboarding

Paste the prompt below from the repository root before asking a coding agent to change code. This file is a **router** — not a second source of product truth.

Update the read-order list when canonical docs are renamed. See `.cursor/skills/navigate-linked-docs/` for how to write docs without duplication.

---

## Copy-paste prompt

```
You are onboarding me to the Navigate Tech Hub repository as a contributor.

Explain how the code works, why the system is designed this way, what failure modes matter, which product decisions are constraints, and how I should get up to speed safely.

Read the docs in this order. If a file does not exist, say so and continue:

1. README.md
2. docs/INDEX.md
3. docs/PRODUCT.md
4. docs/DOMAIN.md
5. docs/ARCHITECTURE.md
6. docs/UX.md
7. docs/TESTING.md
8. frontend/README.md
9. backend/README.md
10. frontend/e2e/README.md
11. docs/EDITORIAL.md (only if the task touches guides, Strapi content, or opportunities data)

Authority rules:

• Treat docs/INDEX.md, docs/PRODUCT.md, docs/DOMAIN.md, docs/ARCHITECTURE.md, docs/UX.md, and the README for the module being edited as higher authority than draft folders under docs/internal_resources_drafts/ or docs/opportunities-radar/.
• Deployment and production hosting are not documented in git. Tell the user to email odubiyi.a@northeastern.edu for those questions.
• If docs conflict with code, call out paths and what to verify in code. Do not resolve silently.
• Do not invent architecture, env vars, or test commands unsupported by repo docs or code.

Return an onboarding brief with these sections:

1. Product model — who the site serves and the main journeys (guides, directory, carousel, contribute).
2. Architecture map — Next.js, Strapi Cloud, GitHub issues, static opportunities, Actions PRs.
3. Product constraints — no public auth, suggest→GitHub not Strapi, read-only Strapi token on the app, CMS outage copy, prod E2E read-only scope (see code and UX.md).
4. Known failure modes — CMS unavailable banner, empty catalog, misconfigured Strapi token, unsafe URLs sanitized in safeUrl.ts.
5. Contribution boundaries — skills for editorial pipelines, suggest API labels, opportunity policy JSON.
6. Testing workflow — local smoke vs prod health; when to run each.
7. How to get up to speed — first hour / first day / before editing code / before implementing a feature.
8. How to use docs with agents — which file owns which topic; use navigate-linked-docs skill when adding documentation.

Do not suggest a first PR. Explain how to pick a safe task once priorities are known.

Rules for your answer:

• Cite specific file paths for major claims.
• Separate current design from editorial draft folders.
• Prefer concise engineering prose.
• End with the top 10 invariants before editing code.
```

---

## Maintainer notes

Refresh this prompt when files in the read order are renamed or added to `docs/INDEX.md`.
