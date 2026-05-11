# Phase A — Verification log

**Slug:** `shipping-fullstack-projects`
**Brief (read-only):** `docs/internal_resources_drafts/shipping-fullstack-projects/synthesis/brief.md`
**This log:** `docs/internal_resources_drafts/shipping-fullstack-projects/synthesis/verification-log.md`
**Publish-year context:** 2026
**Today:** 2026-05-10

Legend: **Verified** = corroborated against a primary or authoritative source and safe to use as framed · **FactCheck** = needs primary source at draft time, reframe, or drop · **Deferred (human / scope)** = only verify if the draft commits to a specific name, number, or program in that area.

---

## Scope

Phase A per `docs/internal_resources_drafts/DRAFT_PIPELINE.md`: resolve **PENDING ITEMS** and inline `[FACT CHECK: …]` notes from the brief **without** editing `brief.md`.

---

## PENDING ITEMS (from brief)

### 1. Editorial stance: opinionated stack vs neutral mini-table

| Status | **Resolved (author decision)** |
| --- | --- |
| Author note in brief | "neutral mini table is better" |
| Implication for Phase B | Section 2 should present a **small decision table** (frontend host vs full-stack host vs serverless / BaaS) rather than a single opinionated happy path. Keep the table tight — three to five rows max — so readers don't freeze. Do not pretend the table is exhaustive; it is a starting tool, not a vendor matrix. |

### 2. Current PaaS free tiers, limits, and Heroku disclaimers — **Verified**

Author note: "search for links we can point to". Resolutions and authoritative URLs below; see also items 4–9 of this log for per-vendor breakdowns.

Summary the draft can rely on:

- **Heroku free tier was discontinued on November 28, 2022.** Treat older Heroku tutorials (including the Codecademy reference in the brief) as **pattern reference**, not current pricing truth.
- **Render** still offers a meaningful free web service tier (750 hours/month, spins down after 15 minutes idle).
- **Vercel Hobby** is still free for personal, non-commercial projects with a 100 GB/month Fast Data Transfer cap.
- **Netlify** free plan still offers 100 GB bandwidth and 300 build minutes/month.
- **Railway** no longer has an unlimited free tier — new users get a 30-day, $5-credit trial, then $1/month free credit on the Free plan.
- **Fly.io** removed its legacy hobby free tier for new organizations in January 2024 (pay-as-you-go with a $5/month minimum invoice; invoices under $5 are waived).
- **GitHub Student Developer Pack** is the most reliable way for students to keep credits flowing across these vendors.

Action for draft: when Section 2 / Section 6 names hosts, link to the vendor's own pricing or limits page (URLs in items 4–9 below). Do **not** quote dollar amounts or hour counts in the article without a current link — these change often.

### 3. ColorStack (or other org) stats, partner counts, or program names

| Status | **Deferred (scope)** |
| --- | --- |
| Author note in brief | "okay" |
| Resolution | Per the brief's existing posture: only commit to specific ColorStack numbers, partner counts, or named programs if the draft chooses to cite them. The Section 9 audience bridge can stand on the **portable-proof framing** alone (live URL > localhost in fairs, DMs, application screens) without naming program counts. |
| For Phase B | If the draft does name a ColorStack program / partner count / member number, attach a `[FACT CHECK: source needed]` tag and verify against `colorstack.org` or a current ColorStack public report at draft time. |

### 4. Volatility note — vendor UIs, flags, and CLI commands change

| Status | **Resolved (author acknowledged)** |
| --- | --- |
| Author note in brief | "thats fine" |
| Implication for Phase B | The article should not include vendor UI screenshots or copy-paste CLI flag strings that will rot in a year. When a vendor flow is referenced, link to the **vendor docs** rather than reproducing the click path. The draft can name commands (`vercel env pull`, `prisma migrate deploy`) but should keep them at the level of "what concept this maps to," not "which menu to click." |

---

## Inline `[FACT CHECK: …]` notes from the brief

### 5. Brief line 19 — "Heroku's free tier is gone; treat as pattern reference, not current pricing truth" — **Verified**

| Source | Snippet |
| --- | --- |
| Heroku Help — *Removal of Heroku Free Product Plans FAQ* (`https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq`) | Confirms free Dynos, Heroku Postgres, and Heroku Data for Redis were removed. |
| Heroku Dev Center — *Deprecation of Heroku free resources* (`https://devcenter.heroku.com/changelog-items/2461`) | Effective date: **November 28, 2022**. |
| TechCrunch — Aug 2022 (`https://techcrunch.com/2022/08/25/heroku-announces-plans-to-eliminate-free-plans-blaming-fraud-and-abuse/`) | Independent corroboration of the policy change. |

Action for draft: when Codecademy's Heroku tutorial is used as the "split-build mental model" reference, write something like *"the mental model still applies; the free tier referenced in older tutorials no longer exists — students with active GitHub Education status can use the Heroku for GitHub Students credits or pick another host"*. **Do not** present Heroku free dynos as a current option.

### 6. Brief line 26 / Section 9 — ColorStack stats, partner counts, program names — **Deferred (scope)**

See item 3. No partner counts or program names are surfaced in this article unless the author commits to a specific cite at draft time. Audience bridge framing ("deployed work survives org fairs, DMs, and application screens for Black and Latinx CS students in community pipelines") is defensible from the **portable-proof argument** alone and does not require a numeric claim.

### 7. Brief line 42 — Per-vendor billing, free-tier limits, "they change often" — **Verified (per vendor)**

The four hosts most likely to be named in Section 2 / Section 6:

| Vendor | Status | Key fact (today) | Authoritative link |
| --- | --- | --- | --- |
| **Render** | Verified | Free web service tier exists; 750 instance hours/month; spins down after **15 minutes** of no inbound traffic (HTTP or WebSocket as of Feb 2026); cold start can take up to ~1 minute. | `https://render.com/docs/free` |
| **Vercel** | Verified | Hobby plan is free for **personal, non-commercial** use; **100 GB/month** Fast Data Transfer included. | `https://vercel.com/docs/plans/hobby` and `https://vercel.com/docs/limits` |
| **Netlify** | Verified | Free plan: **100 GB bandwidth**, **300 build minutes** per month; site suspended for the rest of the calendar month if exceeded. Two structures coexist (legacy plan vs credit-based plan, depending on signup date). | `https://www.netlify.com/pricing/` |
| **Railway** | Verified (and **important caveat**) | New users get a **30-day, $5-credit trial**, then **Free plan with $1/month credit**. No dedicated student plan. Realistic ongoing student use generally requires Hobby ($5/month minimum). | `https://docs.railway.app/reference/pricing/free-trial` and `https://www.railway.com/pricing` |
| **Fly.io** | Verified (and **important caveat**) | Legacy free Hobby allowances **removed for new organizations** in January 2024. Pay-as-you-go with a **$5/month minimum invoice** (invoices under $5 are waived). | `https://fly.io/docs/about/billing/` and `https://fly.io/plans` |

Action for draft:

- If Section 6 mentions "free tier sleep behavior," anchor it on **Render's 15-minute spin-down** as the canonical example (well documented, still real).
- **Do not** call Railway or Fly.io "free" without a qualifier — it misleads underclassmen who will burn through trial credit and then hit a $5 floor unexpectedly. Frame these as "low-cost / credit-trial," not "free."
- When billing alerts are mentioned, link to the vendor's spending-cap or usage-alert docs rather than asserting a default behavior.

### 8. Brief line 75 — Section 6 production hygiene, "vendor specifics" — **Verified (covered by item 7) + Deferred (drift)**

The vendor-specific facts the draft is likely to rely on (sleep behavior, free-tier hours, secrets locations) are covered in item 7. Anything else specific (e.g. exact billing-alert UI path, specific CLI subcommand names) should be linked rather than reproduced — see item 4. If the draft commits to a specific CLI flag, leave a `[FACT CHECK: confirm against current vendor CLI docs]` tag and verify at draft time.

### 9. Student credit programs (added during verification)

| Status | **Verified — useful to mention, optional to include** |
| --- | --- |
| Source | `https://education.github.com/pack/` (GitHub Student Developer Pack) and `https://www.heroku.com/github-students` |
| Snippet | GitHub Student Developer Pack provides Heroku credits ($13/month for 24 months, total $312), DigitalOcean credits, Azure credits, and other developer tooling free for verified students. |
| Why this matters | The brief already tells underclassmen to ship a live URL. **Cost is the most common silent reason students don't deploy.** A one-sentence pointer to GitHub Student Developer Pack in Section 6 (or the close) is fair game and aligned with the "deployed work converts to recruiter-visible proof" framing. |

Action for draft: optional. If included, link to the GitHub Education pack page itself and **do not** quote credit dollar amounts in prose — link instead. Vendor-credit terms drift as much as free-tier limits.

---

## Items the brief did **not** ask to verify, but are worth flagging

### 10. Build-time vs runtime env var confusion (brief Section 3)

| Status | **Verified** |
| --- | --- |
| Source | Vercel docs on env var environments and sensitive flags (`https://vercel.com/docs/environment-variables`); Render docs on environment variables / `fromDatabase` blueprint linking (`https://render.com/docs/configure-environment-variables`). |
| Note for draft | The naming-prefix rule (`NEXT_PUBLIC_*`, `REACT_APP_*`, `VITE_*` for browser-exposed values vs server-only secrets) is well documented and safe to teach. Frame it as **"the variable name itself controls who can see it"** — that is the part students miss. |

### 11. CORS as a "works locally, fails in prod" failure mode (brief supporting point on line 46)

| Status | **Verified (process-level claim, no number)** |
| --- | --- |
| Note for draft | Safe to teach as a named failure mode: when frontend and API live on different origins (e.g. Vercel + Render), the production browser request is a cross-origin call and the API must allow the deployed frontend's origin explicitly. No specific stat needed. |

---

## Phase A gate

- **PENDING items resolved as:** editorial stance → **Resolved (author)**; PaaS free tiers → **Verified**; ColorStack stats → **Deferred (scope)**; volatility note → **Resolved (author)**.
- **Inline `[FACT CHECK]` notes resolved as:** Heroku free tier gone → **Verified**; ColorStack numbers → **Deferred (scope)**; per-vendor billing/free tiers → **Verified**; Section 6 vendor specifics → **Verified (covered) + Deferred (drift)**.
- **`brief.md`:** not modified.
- **Ready for Phase B.**

---

## Summary the writer should respect in Phase B

1. **Heroku is not a current free option.** Use it only as a "split-build mental model" reference; if Heroku is named at all, mention GitHub Student Pack credits as the realistic path for students.
2. **"Free" varies more than students expect.** Render and Vercel Hobby and Netlify still have real free tiers. Railway and Fly.io are credit-trial / low-cost — call them that.
3. **Render's 15-minute spin-down** is the cleanest example for the "what sleeps on free tiers" point.
4. **Section 9 audience bridge stands on portable-proof framing.** Do not add ColorStack partner counts or named programs unless the draft commits to a verified cite.
5. **Link the vendor docs; don't reproduce UI paths or dollar amounts.** Vendor pricing and CLI flags drift fast — that is the volatility risk the author already accepted.
6. **Build-time vs runtime env naming** (`NEXT_PUBLIC_*`, `VITE_*`) is the highest-leverage technical concept in Section 3 and is well sourced.
