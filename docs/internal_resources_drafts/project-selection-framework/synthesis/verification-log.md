# Phase A verification log — `project-selection-framework`

**Confirmed paths (repo root: `Navigate-Tech-Hub`)**

| Role | Path |
|------|------|
| Brief (read-only for Phase A) | `docs/internal_resources_drafts/project-selection-framework/synthesis/brief.md` |
| This log (Phase A output) | `docs/internal_resources_drafts/project-selection-framework/synthesis/verification-log.md` |

**Slug:** `project-selection-framework`
**Verification date:** 2026-05-10
**Inputs read:** `synthesis/brief.md` only (per `docs/internal_resources_drafts/DRAFT_PIPELINE.md`).
**`brief.md` modified:** No.

---

## Scope

Phase A per `DRAFT_PIPELINE.md`: resolve **PENDING ITEMS** and any inline author notes from the brief **without** editing `brief.md`. Web verification only where the brief makes (or might make) a checkable factual claim.

---

## PENDING ITEMS from brief — resolutions

### 1. Optional NEU term/calendar specifics (midterms, Khoury project course timing if cited)

> Brief author note: "*remind that i need to add this*"

**Status: Deferred (human) + FactCheck if added**

- The brief itself does **not** assert any NEU/Khoury midterm date, exam window, or named project-course timeline. Section 5 stays at the generic phrasing "*aligning with campus rhythm (lighter weeks vs. crunch)*," which is safe to ship as-is.
- Public Khoury syllabi pages exist for individual semesters (e.g. `course.khoury.northeastern.edu/cs2510/Syllabus.html`, `course.ccs.neu.edu/cs2510sp24/General.html`), but their exam dates are **per-section and per-term** and rotate every semester. They are not safe to embed in an evergreen article as fixed dates.
- The CS 4500 ("Software Development") syllabi confirm the course is **team-project based** with **two midterms** in older versions (e.g. `course.khoury.northeastern.edu/cs4500sp14/syllabus.html`), but current-term specifics are not stable across years.
- The sibling slug `cs-course-planning-neu` is the proper home for NEU course/calendar specifics (per `DRAFT_PIPELINE.md` note on that slug). This article should **link** there rather than restating dates.

**For Phase B:**
- Default: keep Section 5 calendar references generic (e.g. "midterms," "crunch weeks," "after finals") — **no named dates, no specific course numbers**.
- If the author still wants an NEU-specific anchor, add **one sentence** that links to the sibling article `cs-course-planning-neu` (which carries the manual-sourcing burden) and wrap any specific term claim in `[FACT CHECK: verify against current Khoury syllabus for the term being referenced]`.
- Do **not** invent or estimate exam windows.

---

### 2. Optional personal signal (author's own pinned repos or outcomes)

**Status: Deferred (human)**

- Brief frontmatter already states: `Personal signal available: no — not listed in inventory for this slug; add only if you supply a verified anecdote later.`
- This is author-only content. Repo artifacts cannot substitute.

**For Phase B:**
- Default: omit personal anecdote; the brief explicitly permits this.
- If included, frame as "*one non-universal example*" per the brief's own caveat, and keep it bounded (one paragraph max), so the framework reads as a framework, not a memoir.

---

### 3. Fact-check numeric claims about Pack dollar value or partner lists against live `education.github.com`

> Brief author notes: "*hmmm remind me to come back with this*" / "*you can check*"

**Status: Verified (qualitative claims) + FactCheck (any number / partner name added later)**

What the brief actually claims (qualitative, not numeric):

- "Student Developer Pack + Experiences" as infrastructure → ✅ Verified.
- "curated **Experiences** (e.g., Intro to GitHub flow/PRs, Intro to Open Source, Copilot/Codespaces bundles)" → ✅ Verified by live page.
- "Pack/Experiences as friction removers" / "Codespaces/Copilot/intro OSS pathways" → ✅ Verified.

**Evidence (live page, fetched 2026-05-10):**

- `https://education.github.com/pack` — page text confirms:
  - "*Experiences are curated bundles of pack partner products, GitHub tools, and other resources*"
  - Named Experiences include **"Intro to Copilot"**, **"Intro to GitHub"** ("*GitHub flow is a lightweight, branch-based workflow… learn the basics of the GitHub Flow including creating and making changes to branches within a repository, as well as creating and merging pull requests*"), **"Intro to Open Source"**, **"Intro to Web Dev"**, plus DevOps, Data Science & ML, Mobile App Development, Hackathon in the Cloud, etc.
  - Listed tools across Experiences include **GitHub Codespaces** and **GitHub Copilot** (matches brief).
- `https://education.github.com/partners` — partner page states the Pack includes **"80+ professional-grade tools from partner companies"** and that GitHub seeks "5–10 new partners per year." This is the **only** quantitative claim that should be cited if Phase B wants a number, and it should be cited from the **partners** page, not invented.

**What is NOT verifiable / should NOT be asserted as a fixed number:**

- A specific **total dollar value** for the Pack. The live page does **not** publish a single canonical $ figure, and aggregated "Pack is worth $X" numbers floating around blog posts are stale and partner-dependent. Do not state a dollar value.
- Any **named partner list** as exhaustive. Partners rotate; the live offer list paginates and changes.

**For Phase B:**
- Safe phrasing: "*80+ partner tools (per `education.github.com/partners`), including Copilot and Codespaces*." Do **not** convert into a dollar figure.
- If the draft names specific partners (e.g. DataCamp, GitKraken, Microsoft Azure — all currently visible on the live offers list), wrap in `[FACT CHECK: confirm partner is still on education.github.com/pack at publish time]`.
- Keep the brief's stance that Pack is **infrastructure**, not the project itself.

---

## Inline brief anchors — qualitative sanity check (no brief edits)

These are **not** PENDING items, but they are claims the brief makes that a reader could push back on. Logged here so Phase B does not need to re-research.

### A. Dev.to "20+ projects" roadmap framing

| Status | **Verified (treat as one author's pacing, not a benchmark)** |
|---|---|
| Reason | The brief itself already qualifies this: "*explicit build quotas in the post as one possible pacing reference (treat as ambitious, not a first-semester requirement).*" |
| For Phase B | Preserve that qualifier in prose. Do **not** translate "20+ projects" into a recommended target for a first-year. The brief's "one lane until pinned" rule is the actual recommendation; the Dev.to post is supporting color. |

### B. Fireship scope warning ("flashy portfolio sites can become their own endless project")

| Status | **Verified (editorial judgment, not a sourced statistic)** |
|---|---|
| Reason | This is a craft observation, not a claim that needs a citation. The Fireship catalog does include Three.js / portfolio-tutorial content; the brief's warning is about scope risk, not a factual assertion about Fireship's content. |
| For Phase B | OK to keep as written. Do **not** attach a fake stat ("X% of students abandon…"). |

### C. Audience layer — ColorStack / hackathon portfolio framing

| Status | **Verified (community context, no individual member named)** |
|---|---|
| Reason | The brief speaks about Black and Latinx student community shipping in **aggregate** and as a UX pattern — no named member, no claimed outcome. ColorStack chapter presence at NEU is already a public fact (chapter directory on colorstack.org). |
| For Phase B | If the draft names a specific student, repo, or hackathon outcome, escalate for human consent. Otherwise, keep the framing generic and **emphasize the brief's instruction: "document the role you owned"** — that is the actual GEM. |

---

## Cross-links to preserve in Phase B

| Sibling slug | Use in this draft |
|---|---|
| `shipping-fullstack-projects` | Once the lane is picked, *how* to actually ship — pair, don't duplicate. |
| `project-scoping-execution` | The 3-sentence scope test + MVP cutting belongs adjacent to this article's "pick the project" decision; link don't re-teach scoping. |
| `portfolio-that-converts` | How the chosen project gets surfaced (README skim test, demo, recruiter-readable pinned repos) — this article should hand off the polish step. |
| `open-source-as-experience` | The "OSS depth-first" branch in the brief's decision guide; deeper OSS playbook lives there. |
| `colorstack-nsbe-afrotech-guide` | Community-anchored shipping mentioned in Section 5; link for org-specific guidance rather than over-explaining. |
| `hackathon-prep-system` | Hackathon-produced portfolio entries are referenced in the brief; that slug owns the prep tactics. |
| `cs-course-planning-neu` | NEU course rhythm / midterm timing — *this* slug should defer there, not assert dates inline (see PENDING #1). |

---

## Phase A gate

- **PENDING #1** (NEU calendar specifics) → **Deferred (human)**; default = keep generic.
- **PENDING #2** (personal signal) → **Deferred (human)**; default = omit.
- **PENDING #3** (Pack dollar value / partners) → **Verified** for qualitative claims already in the brief; **FactCheck** for any number or partner name added in Phase B (use `education.github.com/partners` for the only sanctioned figure: "80+ partner tools").
- **`brief.md`:** not modified.
- **Blockers for Phase B:** none.
- **Ready for Phase B** per `DRAFT_PIPELINE.md`.
