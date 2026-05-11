# Verification log — `portfolio-that-converts`

**Phase:** A (synthesis verification)  
**Brief:** `docs/internal_resources_drafts/portfolio-that-converts/synthesis/brief.md` (read-only; not modified in this phase)

This log resolves **PENDING ITEMS** and inline verification notes from the brief. Dispositions follow `docs/internal_resources_drafts/DRAFT_PIPELINE.md`: **Verified** (source or author-locked instruction), **Deferred** (human/asset), **FactCheck** (carry tags into draft / verify before publish).

---

## 1. Time-on-page, “6 seconds,” and eye-tracking (ShowProof / Ladders / NNG)

**Brief item:** Verify any time-on-portfolio or eye-tracking statistics; prefer “fast skim” if uncertain.

**Primary source reviewed:** [How Recruiters Read Developer Portfolios (The 6-Second Scan)](https://showproof.io/guides/how-recruiters-read-developer-portfolios/) (ShowProof; retrieved in Phase A).

| Disposition | **Verified** (with publish-safe framing) |
|-------------|-------------------------------------------|
| What is defensible | ShowProof states the **~6–7.4 second** figure comes from **The Ladders** eye-tracking work on **resumes** (2012; follow-up 2018), not from portfolio-specific peer-reviewed eye-tracking. The article explicitly says direct portfolio eye-tracking data does not exist in the same form and treats recruiter behavior on portfolio pages as **at least as fast, often faster**, anecdotally / from platform analytics. |
| F-pattern | ShowProof attributes **F-pattern** scanning to **Nielsen Norman Group** eye-tracking research (cited as 2006, updated 2017) for **web pages with dense text** — reasonable to describe as a **reading-pattern model** for above-the-fold layout, not a guarantee for every portfolio layout. |
| Engagement table | The same ShowProof page includes a section table with **“Approx. engagement” percentages** for portfolio sections; the page labels these as **directional — not peer-reviewed**, from mixed sources. **Do not** cite those percentages as measured facts in Navigate copy. |
| Phase B / C guidance | Prefer language like **“fast skim,” “first pass,” “above-the-fold decision”** unless you also cite **resume** methodology (Ladders) and the **portfolio ≠ resume** caveat in the same breath. Safe anchor: “recruiters pattern-match quickly; front-load signal,” matching the brief’s GEM without hard seconds-on-portfolio. |

---

## 2. ColorStack, Stacked Up Summit, and related public stats

**Brief item:** Fact-check ColorStack / summit claims, sponsor lists, and membership stats against current public pages.

**Primary sources reviewed:**

- [ColorStack 2025 Impact Report](https://www.colorstack.org/impact-report) (public page text as of Phase A).
- [Leveling Up, Together: A Recap of the 2025 Stacked Up Summit](https://www.colorstack.org/news/leveling-up-together-a-recap-of-the-2025-stacked-up-summit) (ColorStack news, Dec 15, 2025).

| Claim (from brief / typical use) | Disposition | Notes |
|-----------------------------------|-------------|--------|
| ColorStack scale (members, schools, FY growth) | **Verified** against **Impact Report** | Report states **16,000+** members, **1,606** schools (U.S. and Canada), **~70%** membership increase in FY 2025, and other census-style percentages (e.g. confidence graduating with full-time tech offer, alumni with full-time roles). Use **Impact Report** as the canonical numeric source if the article needs a figure. |
| Stacked Up Summit 2025 (attendance, partner count) | **Verified** against **recap post** | **450+** students and **19** partner companies for the 2025 summit. |
| “13,000+ members” in Stacked Up recap intro | **FactCheck** | The Dec 2025 recap opens with **13,000+** members, while the **2025 Impact Report** uses **16,000+** / **16,100+** with FY framing. **Do not mix** without explanation; for “current size,” prefer **Impact Report** numbers or avoid a hard count if the article only needs a qualitative “community / summit context” nod. |
| “50+ leading tech companies” (recap) | **FactCheck** | Appears in the recap narrative; treat as **ColorStack’s own positioning language**. OK if attributed (“ColorStack reports…”) — not independently audited in Phase A. |
| Named employer lists, eligibility, sponsor rosters | **FactCheck** | If the draft names **specific companies** or **program rules**, pull from the **current** ColorStack page or announcement for that program/date; lists churn. |
| AfroTech | **Deferred / light touch** | Official conference presence: [afrotechconference.com](https://afrotechconference.com/) and Blavity’s [afrotech](https://www.blavity.com/afrotech) hub. The brief only needs a **distribution-context nod**, not conference stats. Any attendance or sponsor numbers → **verify against the cited live page** at publish time. |

**Phase B guidance for Section 5 (short):** Keep “portfolio + ~30s pitch” without turning into a conference guide; any **numbers** → Impact Report + dated news posts only.

---

## 3. Vendor / secondary posts (GitReady, Scale.jobs-style, recruiter % surveys)

**Brief item:** Percentage claims in vendor posts — do not quote without primary source.

| Disposition | **FactCheck** (unchanged from brief) |
|-------------|--------------------------------------|
| Unsourced “X% of recruiters…” | Do not use in final copy unless tied to **primary methodology + date**. |
| ShowProof directional engagement % | Treat as **model**, not data (see §1). |

---

## 4. Cross-reference: `resume-for-tech-roles`

**Brief item:** Decide whether to link or cross-reference the published `resume-for-tech-roles` guide for shared bullet/ATS content.

| Disposition | **Verified (repo + product instruction)** |
|-------------|---------------------------------------------|
| Internal artifact | Companion pipeline exists: synthesis `docs/internal_resources_drafts/resume-for-tech-roles/synthesis/brief.md` and draft `docs/internal_resources_drafts/resume-for-tech-roles/draft/article.md`. |
| Authoring rule | **Cross-reference by slug/title** for ATS, one-page discipline, bullet formula, and “resume ↔ same keywords as site” — **do not** reproduce full resume doctrine inside the portfolio article. |
| Published URL | **Deferred** — Phase A did not find a production CMS/slug URL in-repo. At publish time, replace internal path language with the **live hub URL** for `resume-for-tech-roles` when that guide ships. |

---

## 5. Personal signal (“what worked once”)

**Brief default:** No personal signal unless author opts in.

| Disposition | **Deferred (author)** |
|-------------|------------------------|
| Action | If a concrete hiring-outcome example is desired, author confirms **one** line max, framed as individual experience, not a rule. Otherwise keep examples **generic or sourced** per brief. |

---

## Phase B handoff (quick)

- **Skim / seconds:** Lead with **pattern and above-the-fold signal**; optional footnote-style caveat if citing Ladders **resume** timing; **no** portfolio-specific seconds as peer-reviewed fact.
- **ColorStack / Stacked Up:** Prefer **2025 Impact Report** for org scale; use **recap post** for summit attendance/partner count; resolve **13k vs 16k** before asserting a single member number.
- **Tables / vendor %:** Omit or qualify; keep **`[FACT CHECK: …]`** anywhere lists or stats could go stale.
- **Resume alignment:** **Cross-link** `resume-for-tech-roles` when URL exists; until then, name the companion guide and keep portfolio scope on **site proof, demos, READMEs, and featured projects**.
