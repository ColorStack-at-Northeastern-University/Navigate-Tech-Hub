# Verification log — `colorstack-nsbe-afrotech-guide`

Phase A (synthesis). Source: read-only `synthesis/brief.md` (2026-05-10). `brief.md` was not modified.

---

## PENDING from brief — resolved

### 1. AfroTech — dates / location (high volatility)

**Verdict: Verified** (re-check headline dates and ticket names at publish).

- **Location / venue:** Official AfroTech global page states the conference is in **Houston** at the **George R. Brown Convention Center** (“WHY HOUSTON?”), with international visa guidance referencing **2026**. Source: [https://afrotechconference.com/afrotech-global](https://afrotechconference.com/afrotech-global).
- **Year / housing:** Footer and links use **AfroTech 2026**; attendee housing points to Resiada path **AfroTech2026**. Same page as above plus [https://afrotechconference.com/first-time-attendees](https://afrotechconference.com/first-time-attendees) (footer links).
- **Calendar dates:** Primary marketing homepage for the conference is titled **“AfroTech 2026”** with public materials consistently describing the **2026** Houston cycle; exact **day-level** dates and pass names should be taken from **registration / ticketing** at publish time (brief already flags volatility). Cross-check: [https://www.afrotechconference.com/](https://www.afrotechconference.com/) and the official registration flow when the draft is finalized.
- **Draft tag if needed:** `[FACT CHECK: AfroTech <year> exact dates, pass tier names, and any cited attendance figure]` if the article quotes numbers not copied verbatim from a single official page at publish time.

---

### 2. Code2040 — application open / close

**Verdict: Verified** (window **closed** for 2026 cohort as of this check; future cycles = newsletter / official pages).

- **Fellows hub (authoritative for application status):** [https://programs.code2040.org/pages/fellows](https://programs.code2040.org/pages/fellows) states **“The 2026 Fellows Application is now closed to new applicants”**; directs readers to the **Student Newsletter**; describes the program span **September 2025 – July 2026** and **summer 2026** internships; notes deadline passed and to check back for future programs.
- **Conflict / caution:** [https://www.code2040.org/programs](https://www.code2040.org/programs) FAQ still frames a **2025** Fellows cohort with **May 15 / June 28** open/close copy. Treat the **Fellows program subdomain page** above as the source of truth for **whether applications are open**; do not rely on the main site FAQ dates without re-fetching at publish.
- **Draft guidance:** Tell first-years to **subscribe to the student newsletter** and watch the Fellows page for the **next** cycle rather than citing specific open/close dates unless refreshed on publish day.

---

### 3. ColorStack — Stacked Up / summit dates

**Verdict: FactCheck at publish** (no durable 2026 summit schedule captured in this pass).

- **Brief’s own sources remain valid for framing** (e.g. summit recap for *positioning*: [https://www.colorstack.org/news/leveling-up-together-a-recap-of-the-2025-stacked-up-summit](https://www.colorstack.org/news/leveling-up-together-a-recap-of-the-2025-stacked-up-summit)).
- **This verification pass:** `stackedupsummit.org` could not be retrieved here (**HTTP 401**). [https://www.colorstack.org/summit](https://www.colorstack.org/summit) timed out in automated fetch — **human re-check** before publish.
- Older news posts (e.g. “ColorStack Announces Spring Stacked Up Summit,” **2022**) are **not** suitable for current dates.
- **Draft tag:** `[FACT CHECK: ColorStack Stacked Up Summit — next dates, registration URL, virtual vs in-person]` for any sentence that names specific days or “this semester.”

---

### 4. Optional — Navigate-specific examples (chapters, funding, travel)

**Verdict: Deferred (human / editorial)** with one **Verified** repo touchpoint only.

- **Verified (product context only):** Navigate’s public hero copy identifies the product as **“A Northeastern X ColorStack Project”** (`frontend/components/sections/Hero.tsx`). That supports a **light** “Navigate sits in this ecosystem” line if the author wants it; it is **not** a chapter roster or funding policy.
- **Not found in repo (do not invent):** Named NEU chapter rosters, travel stipends, or school-specific AfroTech/NSBE funding workflows. Add only if editors supply **verified** campus or org details.

---

## Brief meta line

- **“READY TO WRITE: awaiting your approval or adjustments”** — outside Phase A fact work; **no verification action**. Phase B can proceed once this log exists per `DRAFT_PIPELINE.md`.

---

## Summary for Phase B

| Topic | Safe for draft | Flag in draft |
|--------|----------------|----------------|
| AfroTech 2026 Houston / GRB | Yes (with official links) | Exact multi-day span, ticket names, big stats |
| Code2040 Fellows | Yes: narrative + newsletter; **closed** for 2026 apply | Any **calendar** dates — use Fellows page + newsletter, not stale FAQ |
| ColorStack summit timing | Recap / philosophy only | Any **specific** upcoming summit date or format |
| NEU / Navigate local color | Optional one-liner from Hero | Chapter names, money, travel |
