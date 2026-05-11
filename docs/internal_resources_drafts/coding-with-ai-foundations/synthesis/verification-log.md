# Verification log — `coding-with-ai-foundations`

**Phase:** A (synthesis verification only)  
**Date:** 2026-05-10  
**Input:** `synthesis/brief.md` (read-only; not modified)

## Executive summary

University-level Northeastern anchors for integrity and AI are **Verified** with live catalog and policy links. GitHub Copilot training/opt-out and “at rest” vs active-use language are **Verified** against the March 25, 2026 GitHub announcement (effective **from April 24, 2026**). Cursor Privacy Mode, Legacy mode, API-key routing, and codebase indexing are **Verified** against the current privacy overview. Pricing, request limits, and settings UI copy remain **FactCheck** at publish on official product pages. Course-specific rules and any ColorStack stats or anecdotes stay **Deferred** to syllabus and human-supplied material.

---

## PENDING ITEMS (from brief)

| Item | Resolution | Notes / evidence |
|------|------------|------------------|
| Northeastern academic integrity / GenAI language — link live policy pages; do not invent “allowed at NEU” rules | **Verified** (institution-level) + **Deferred** (course-specific) | **Catalog — Academic Integrity (2025–2026):** https://catalog.northeastern.edu/handbook/policies-regulations/academic-integrity — defines cheating to include unauthorized use of aids including **“artificial intelligence, chatbots”** among examples; stresses instructor/syllabus direction per course. **NU-RES policy hub:** https://nu-res.research.northeastern.edu/northeastern-university-policy-on-the-use-of-artificial-intelligence — points to **Policy on the Use of Artificial Intelligence Systems:** https://policies.northeastern.edu/policy125/ (page updated July 22, 2025). **Draft instruction:** Link these (or current replacements if URLs move); always pair with “follow your syllabus and instructor” — never assert blanket permission for NEU. |
| Re-verify GitHub Copilot and Cursor pricing, limits, and settings UI strings on publish date | **FactCheck** (draft tag) | **Canonical pricing / plans:** https://github.com/features/copilot/plans — **Cursor pricing:** https://cursor.com/pricing — **Cursor usage / limits detail:** https://cursor.com/docs/account/pricing — **Copilot settings:** https://github.com/settings/copilot — Third-party comparison posts remain non-authoritative for numbers and feature parity (per brief). |
| Optional ColorStack Slack/events anecdote — only if user supplies; no fabrication | **Deferred** (human) | Do not add community narrative unless sourced from the user or an attributable first-party quote with permission. Brief already flags: no unverified partner counts from secondary summaries. |

---

## Inline brief notes → resolution

### Source list — GitHub Blog (Copilot interaction data)

- **Resolution:** **Verified** (+ **FactCheck** for exact settings labels at publish)  
- **URL:** https://github.blog/news-insights/company-news/updates-to-github-copilot-interaction-data-usage-policy/  
- **Snippet (paraphrase aligned with post):** Posted **March 25, 2026**. **From April 24 onward**, interaction data from **Copilot Free, Pro, and Pro+** may be used for training unless the user opts out in **https://github.com/settings/copilot** under **“Privacy.”** **Copilot Business** and **Copilot Enterprise** are **not affected**. Post distinguishes content in issues/discussions/private repos **“at rest”** from code **processed when actively using Copilot** (interaction data may be used for training unless opted out).  
- **Clarification for Phase B:** Brief source #1 cites “Mar 25, 2026” (announcement date) and KEY FINDINGS cite “Apr 24, 2026” (effective date)—both match the same official post; wording in the article should avoid implying a contradiction.

### Source list — Cursor privacy overview

- **Resolution:** **Verified** (+ **FactCheck** if Legacy footnote or provider list changes)  
- **URL:** https://cursor.com/privacy-overview  
- **Verified against page (2026-05-10):** Privacy Mode → zero data retention with model providers; training/storage implications when Privacy Mode is off; **Privacy Mode (Legacy)** defined; footnote that data is not shared with model providers if the account was created **before Oct 15, 2025**; **“Even if you use your API key, your requests will still go through our backend”**; codebase indexing uploads chunks for embeddings with plaintext not retained after the request; temporary encrypted caching described. Full **Privacy Policy:** https://www.cursor.com/privacy  

### Source list — DEV comparison posts (pricing, limits, parity)

- **Resolution:** **FactCheck** (draft) — treat as framing only, not facts.

### Source list — ColorStack / AfroTech

- **Resolution:** **Deferred** for any named programs, cohort sizes, or impact stats — cite current **ColorStack** (or other) first-party pages if the draft names them. Audience context without numeric claims is acceptable.

### Recommended structure — Section 1 (NEU / registrar link)

- **Resolution:** Same as PENDING NEU row: **Verified** links above + **Deferred** per-course language to syllabus/instructor.

### Recommended structure — Section 4 (vendor bullets vs official pages)

- **Resolution:** **FactCheck** at publish; official list under pricing row above plus GitHub Copilot announcement and settings.

---

## Secondary sources named in brief (no URL verification required this pass)

| Source | Resolution |
|--------|--------------|
| MRQ — “Best Practices for AI Pair Programming” | **Deferred** — cite and quote accurately when drafting; no web pull in this pass. |
| DEV — Alex Cloudstar, testing AI-generated code | **Deferred** — same. |
| arXiv 2603.17060; arXiv 2602.04023 | **FactCheck** (light) — confirm titles/versions on https://arxiv.org/ at publish if cited verbatim. |

---

## Phase B handoff

- Preserve **`[FACT CHECK: …]`** where this log marks **FactCheck** (pricing, limits, UI strings, arXiv metadata, any new vendor wording).  
- **Matt Pocock link** is required in Phase B for this slug per `DRAFT_PIPELINE.md` — not part of the synthesis brief; track during draft, not in this log’s scope beyond this reminder.
