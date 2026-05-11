# Verification log — AI Fundamentals Roadmap (Phase A)

**Brief (read-only):** `docs/internal_resources_drafts/ai-fundamentals-roadmap/synthesis/brief.md`  
**Date:** 2026-05-10  
**Scope:** Pending items, author-facing notes, and checkable factual claims tied to those items. No statistics invented; URLs are evidence anchors.

---

## Summary

Primary **PENDING ITEMS** are correctly scoped: institution-specific numbering and optional local-module links remain **human / program-local** work. **Coordinate with `coding-with-ai-*`:** verified in-repo draft trees for `coding-with-ai-foundations`, `coding-with-ai-learning-path`, `coding-with-ai-debugging`, and `coding-with-ai-code-review`. Curriculum and flagship literacy papers cited in the brief (**Eaton & Epstein AAAI-24**, **Candon et al. AAAI-25**, **UT CS 109 / PAR record**, **HSI AAAI Symposium paper**, **Kapor Leaky Tech Pipeline**, **NSF PAR “Black and Latine youth”**, **ColorStack SambaNova announcement**) are **Verified** at the citation level. Tighten before publish: **SambaNova eligibility** is **three** coursework options (Architecture, OS, or ML), not ML-only; **driver’s-license analogy** for Yale is **not** confirmed from abstract-level sources in this pass; **“Ng et al.”** is **ambiguous**—replace with a named module or drop “et al.”

---

## Item-by-item

### PENDING ITEMS (explicit)

#### 1. Institution-specific course numbers — manual mapping

- **Status:** **Deferred** (human must decide / execute).
- **Evidence:** The brief itself states synthesis cannot name every school’s ML gate course. CS2023 explicitly frames instantiation per program (courses ≠ knowledge areas). **Verified (framing):** [Eaton & Epstein (AAAI-24)](https://ojs.aaai.org/index.php/AAAI/article/view/30352) — “KAs are not equivalent to courses—one course might cover one or more KAs, or a KA might be addressed by multiple courses” (Figure 1 discussion in paper body; same theme in [CS2023 PDF](https://ieeecs-media.computer.org/media/education/reports/CS2023.pdf), e.g. curriculum structured in terms of courses, not knowledge areas).

#### 2. Optional: link or excerpt local AI literacy / responsible-AI module

- **Status:** **Deferred** (human must decide: pick one program’s public syllabus or module page).
- **Evidence:** N/A at hub level; depends on each institution’s public materials.

#### 3. Coordinate with Navigate `coding-with-ai-*` slugs (tooling literacy cross-links)

- **Status:** **Verified** (repo inventory).
- **Evidence:** Under `docs/internal_resources_drafts/`, the following `coding-with-ai-*` trees exist: `coding-with-ai-foundations`, `coding-with-ai-learning-path`, `coding-with-ai-debugging`, `coding-with-ai-code-review` (each with `synthesis/` and/or `draft/article.md`). Phase B should link to those slugs where the roadmap mentions editor/LLM workflow without re-expanding guardrails.

---

### Author notes & draft-tagged blocks

#### Frontmatter — “Personal signal available: no” / “Synthesis-only: yes”

- **Status:** **Deferred** (editorial policy — confirm unchanged at publish kickoff).
- **Evidence:** Stated only in brief frontmatter; no external URL.

#### Frontmatter — word target ~900–1,100 words

- **Status:** **Deferred** (editorial target; verify length in Phase B draft, not in synthesis).

#### “WHAT YOU’LL LEAVE WITH” **DRAFT**

- **Status:** **FactCheck** (draft tag: bullets are accurate *if* the article body cites the same sources the synthesis relies on; no independent new claims).
- **Evidence:** Align bullets with Verified sources below; avoid implying every university offers a one-credit literacy course like UT’s.

#### “READY TO WRITE: awaiting your approval or adjustments.”

- **Status:** **Deferred** (workflow — parent/editor approval).
- **Evidence:** N/A.

#### DOMAIN ASSESSMENT — Black/Latinx layer via ColorStack, NSBE, AfroTech-reported programs

- **Status:** **Partially Verified** (org + scholarship facts); **Deferred** for “AfroTech-reported” specifics until a named article is chosen for Phase B.
- **Evidence:** ColorStack nonprofit and programs: [colorstack.org](https://colorstack.org/), [About](https://www.colorstack.org/about). NSBE scholarships hub: [nsbe.org/scholarships](https://www.nsbe.org/scholarships). ColorStack→NSBE convention scholarships (example program writeup): [ColorStack Provides Scholarships … NSBE Convention](https://www.colorstack.org/news/colorstack-provides-scholarships-for-computer-science-students-to-attend-nsbe-convention). **FactCheck:** Replace vague “AfroTech reporting” with a concrete headline/URL when drafting.

#### KEY FINDINGS — SambaNova scholarship “ML coursework at B− or better”

- **Status:** **FactCheck** (over-narrow vs source).
- **Evidence:** ColorStack inaugural SambaNova post states applicants must have completed **Computer Architecture, Operating Systems, or Machine Learning** with **B− or higher** (not ML alone): [ColorStack announces its Inaugural SambaNova Scholarship](https://www.colorstack.org/news/colorstack-announces-its-inaugural-sambanova-scholarship) (2022-12-13). **Note:** That post also tied eligibility to a **June 2024** graduation window for the inaugural cycle—Phase B should confirm whether current partner scholarships use updated rules.

#### KEY FINDINGS — Yale “Future Presidents” / “no math, no programming” / driver’s-license analogy

- **Status:** **Partially Verified.** “No programming” / informed-user vs builder: **Verified** from abstract. **FactCheck:** exact phrase **“driver’s license”** / “no math” not confirmed in this pass (abstract stresses no programming/math *background* for conveying technical content; it does not use “driver’s license” on the AAAI landing page).
- **Evidence:** [Candon et al., AAAI-25](https://ojs.aaai.org/index.php/AAAI/article/view/35168) — abstract: non-CS students seeking to be “safe, effective, and informed users” rather than builders; design for students without programming or mathematics **background**. NSF PAR mirror: [par.nsf.gov biblio 10669105](https://par.nsf.gov/biblio/10669105-artificial-intelligence-future-presidents-teaching-ai-literacy-everyone).

#### KEY FINDINGS — “Ng et al.-style ‘evaluate + ethical issues’ literacy slice”

- **Status:** **FactCheck** (citation and claim coupling).
- **Evidence:** “Ng et al.” is not a defined reference in the brief. Andrew Ng’s public ML specialization materials emphasize **evaluation / application practice** (e.g. DeepLearning.AI [Machine Learning Specialization](https://www.deeplearning.ai/specializations/machine-learning/) and related “advice for applying ML” content). **Action:** Either cite a specific week/module title + URL or remove “et al.” and separate “ethics/governance” onto a SEP/literacy source already in the brief.

#### SOURCES — (1) Eaton & Epstein AAAI-24 title + AAAI + CS2023 AI role + 17 KAs + sunflower + AI across SE/OS/etc.

- **Status:** **Verified.**
- **Evidence:** Paper: [AAAI article view 30352](https://ojs.aaai.org/index.php/AAAI/article/view/30352). AAAI invited 2020, joint CS2023 task force, 17 KAs, sunflower figure, examples of AI in SE/OS/networks/DB appear in extracted paper text (AAAI-24 proceedings). **CS2023 “seventeen knowledge areas”:** [CS2023 PDF](https://ieeecs-media.computer.org/media/education/reports/CS2023.pdf) (preamble: “Body of Knowledge consisting of seventeen knowledge areas”).

#### SOURCES — (2) ACM / IEEE-CS CS2023 global stakeholder scale

- **Status:** **Verified** (light touch — official joint curriculum site + report).
- **Evidence:** [CS2023 – ACM/IEEE-CS/AAAI Computer Science Curricula](https://csed.acm.org/) and [CS2023 PDF](https://ieeecs-media.computer.org/media/education/reports/CS2023.pdf); Eaton & Epstein describe volunteer subcommittees and broad community feedback.

#### SOURCES — (3) Candon et al. AAAI-25 “Artificial Intelligence for Future Presidents” (Yale)

- **Status:** **Verified** (title, venue, intent).
- **Evidence:** [AAAI article view 35168](https://ojs.aaai.org/index.php/AAAI/article/view/35168); published 2025-04-11, Proceedings of AAAI, 39(28).

#### SOURCES — (4) UT Austin one-credit AI literacy / NSF PAR / AAAI family

- **Status:** **Verified.**
- **Evidence:** NSF PAR: [The Essentials of AI for Life and Society…](https://par.nsf.gov/biblio/10631157-essentials-ai-life-society-ai-literacy-course-university-community) (documents rapid deployment, guest lectures, broad audience, literacy measures). UT CS course page: [CS109 Fall 2023](https://www.cs.utexas.edu/~pstone/Courses/109fall23/). Department news: [New “Essentials of AI” Course Launches This Fall](https://cs.utexas.edu/news/2023/new-essentials-ai-course-launches-fall) (1-credit Fall 2023 framing).

#### SOURCES — (5) “AI Literacy for Hispanic-Serving Institution (HSI) Students” (AAAI Symposium)

- **Status:** **Verified.**
- **Evidence:** [Proceedings of the AAAI Symposium Series article view 31267](https://ojs.aaai.org/index.php/AAAI-SS/article/view/31267) — title matches; symposium track context indexed as AAAI Spring Symposium Series.

#### SOURCES — (6) Kapor “Leaky Tech Pipeline,” Harlem STEM Up, NSF “Black and Latine youth”

- **Status:** **Verified** (named artifacts exist and match brief use).
- **Evidence:** Kapor Center framework page: [The Leaky Tech Pipeline](https://www.kaporcenter.org/the-leaky-tech-pipeline/) (and report PDF linked there). Harlem STEM Up org: [harlemstemup.com](https://harlemstemup.com/) (nonprofit STEM access framing; site essays discuss CS/AI literacy themes — Phase B should quote narrowly from a single page if asserting specific claims). NSF PAR project title aligning with brief wording: [Leveraging AI to Improve STEM Engagement for Black and Latine Youth](https://par.nsf.gov/biblio/10557872-leveraging-ai-improve-stem-engagement-black-latine-youth).

#### SOURCES — (7) ColorStack + AfroTech coverage (aggregate)

- **Status:** **Partially Verified** for ColorStack/SambaNova/NSBE; **Deferred** for unspecified AfroTech pieces.
- **Evidence:** ColorStack + SambaNova: see SambaNova URL above. ColorStack + NSBE convention: scholarship news URL above.

#### SOURCES — (8) Medium — self-study roadmaps (Thu Vu, Halder, others)

- **Status:** **Deferred** (no URLs in brief; optional Phase B: cite 1–2 named posts or drop names).

#### SOURCES — (9) DEV — beginner AI/ML roadmaps

- **Status:** **Deferred** (aggregate “multiple authors”; pick concrete dev.to URLs in Phase B or keep unattributed).

#### RECOMMENDED STRUCTURE / Close — “24-hour action,” time boxes (“60–90 minutes,” “2–3 hours”)

- **Status:** **Deferred** (reasonable coaching heuristics; not externally fact-checkable).

#### DISCARDED — Reddit excluded

- **Status:** **Verified** as process note (brief states Reddit excluded); no URL required.

---

## For the drafter (Phase B)

1. **SambaNova / ML grade copy:** State the **actual** coursework options (Architecture **or** OS **or** ML at B−+) and link the ColorStack news post; add a line that partner programs change year to year.
2. **Yale literacy framing:** Prefer **Verified** language from the Candon abstract (“safe, effective, and informed users”; no programming/math **background** assumed). If you keep a **driver’s license** analogy, **pull exact wording** from the full PDF or an authorized Yale course description—do not rely on synthesis memory.
3. **“Ng et al.”:** Replace with a **specific** public module (with URL) or point readers to **SEP / responsible-AI** readings already grounded in the brief.
4. **AfroTech / press:** When you need a second-party signal, **one** concrete article URL beats “AfroTech-reported programs.”
5. **Cross-links:** Use the four existing **`coding-with-ai-*`** slugs for tooling depth; keep this roadmap focused on **catalog, prerequisites, lanes, and first ML slice**.
6. **Institution table:** Keep the **Deferred** mapping work visible (worksheet or sidebar), not buried.
7. **“WHAT YOU’LL LEAVE WITH”:** Remove **DRAFT** tag once bullets are tied to cited sources in the published article.

---

**Output path (this log):** `docs/internal_resources_drafts/ai-fundamentals-roadmap/synthesis/verification-log.md`  
**Brief path (unchanged):** `docs/internal_resources_drafts/ai-fundamentals-roadmap/synthesis/brief.md`
