# Program Opening Windows — Research Findings

Researched via Reddit (r/csMajors, r/quant), LinkedIn, Google AI Overviews, and official pages.  
Verified May 2026. Confidence ratings reflect source quality, not Navigate editorial judgment.

---

## 🟢 High-confidence dates

| Program | Opens | Deadline | Window | 2026 Status | Notes |
|---|---|---|---|---|---|
| **NVIDIA — Ignite** | Mid-September | Mid-October | ~1 month | Closed | Sept 16 → Oct 18 confirmed for 2024 cycle. Fills very fast — set early reminder. |
| **Jane Street — JSIP** | November | Rolling ~3 months | Several months | Open | Rolling basis; first-year apps reviewed separately. |
| **Jane Street — FTTP / IN FOCUS / INSIGHT / WiSE** | September–October | Late October | ~1–2 months | Some open | IN FOCUS 2025 deadline Oct 26. FTTP targets first-years. |
| **Goldman Sachs — Possibilities Series** | Early February | Late March | ~1 month | Closed | 2026: opened Feb 1, deadline March 1. Targets class of 2028/2029. |
| **Citadel — Launch Internship** | July (early–mid) | Rolling | Rolling (~8+ months) | Closed | Opened July 2025 for summer 2026 cycle; still accepting as late as March 2026. |
| **JPMorgan — Code for Good** | Early June–July | Mid-September | ~2–3 months | Unclear | Sep 19 deadline (Plano), Sep 24 (Columbus). Event in Oct/Nov → fast-tracks to internship. |
| **MLT Career Prep** | August 15 | Rolling: Oct 1 → Nov 1 → Dec 1 → Jan 15 | ~5 months | Not yet announced | Tech Trek is part of Career Prep — same application. |
| **Duolingo — Thrive** | Late September | Early October | ~3–4 weeks | Unclear | Invite notifications came Oct 2, 2024. Narrow window. |

---

## 🟡 Medium-confidence / partial data

| Program | Opens | Notes |
|---|---|---|
| **Microsoft — Explore** | Likely August–October | Reddit post timing suggests early fall, no confirmed date. |
| **Goldman Sachs — Engineering Essentials** | Likely spring (Virtual Insight) | 2025 cohort started May 27. Application timing unclear. |
| **IMC — Launchpad** | Likely July–August | Instagram post from ~July 2024 said "applications now open." 2-day event, sophomore-focused. |
| **SEO Tech Developer Program** | Likely January–March | Spring fellowship for summer placement. Recent Reddit acceptance posts from spring 2026. |
| **D.E. Shaw — Latitude / Nexus / Momentum** | Possibly May (for some) | One thread mentioned "May 2024" — may refer to interview dates, not open dates. |
| **Two Sigma — First Year SWE** | Likely fall | Limited Reddit data. Off-season intern opening mentioned September/October for interviews. |
| **Citadel Securities — Discover** | Likely fall | Limited public data. Probably similar cycle to Citadel Launch (July-ish). |

---

## 🔴 Status changes — remove or flag cards in Strapi

| Program | Status | Action |
|---|---|---|
| **Hack.Diversity** | **Shut down April 2025** — no further cohorts | Remove from directory or mark as inactive with note |
| **Google ASDI** | **Discontinued** — STEP was rebranded ASDI for summer 2025 (final US cycle) | Mark as discontinued; note Google STEP/ASDI no longer runs |
| **Amazon Propel** | Likely inactive/discontinued — no 2024-2025 public posts found | Flag as "verify before applying" |

---

## 📅 Events (not application-based programs)

| Event | Timing | Notes |
|---|---|---|
| **ColorStack Stacked Up Summit** | August (2025: Aug 1–3, San Francisco) | Conference/networking event — register to attend, no application |
| **NSBE Regional Conferences** | Late October – late November | 6 regions, all fall: Region 1 Oct 30–Nov 2, Region 3 Oct 24–26, Region 5 Nov 20–23, etc. |

---

## Recommended Strapi updates

Based on this research, these programs need their `typicalOpenSeason` or `seasonalNote` updated in Strapi admin:

1. **NVIDIA Ignite** → update `seasonalNote`: "Applications open mid-September for ~1 month — set a reminder for Sept 15."
2. **Jane Street programs** → update `seasonalNote`: "Most JS programs open September–November. Check the programs page regularly."
3. **Goldman Sachs Possibilities** → change `typicalOpenSeason` to `winter` (opens February). Update note.
4. **Citadel Launch** → update `seasonalNote`: "Opens early July — one of the earliest fall programs to open."
5. **JPMorgan Code for Good** → update `seasonalNote`: "Applications open June–July, deadlines mid-September. Event in Oct/Nov."
6. **MLT Career Prep** → update `seasonalNote`: "Opens August 15 with rolling deadlines through January 15."
7. **Duolingo Thrive** → update `seasonalNote`: "Opens late September, narrow ~3-week window."
8. **Hack.Diversity** → **unpublish** (program shut down April 2025)
9. **Google ASDI** → **unpublish** (discontinued after summer 2025)
10. **Amazon Propel** → add `riskFlag: verify-before-applying`; update description note

---

*Research date: 2026-05-18. Re-run targeted searches each August to refresh for the new recruiting season.*
