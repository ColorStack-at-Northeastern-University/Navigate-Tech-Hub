# Verification log — `coding-with-ai-learning-path`

**Phase:** A (synthesis verification)  
**Source brief:** `docs/internal_resources_drafts/coding-with-ai-learning-path/synthesis/brief.md` (read-only; not modified)  
**Log date:** 2026-05-10  

## Purpose

Resolve **PENDING ITEMS** and inline **FACT CHECK** notes from the brief by marking each claim **Verified** (primary or strong secondary source), **Deferred** (human / institution / editorial), or **FactCheck** (keep a `[FACT CHECK: …]` tag in Phase B draft until addressed).

---

## PENDING ITEMS (from brief)

| Item | Resolution | Notes |
|------|--------------|--------|
| Author to confirm personal anecdote boundary | **Deferred** | Brief already states no personal signal is required. Author/editor decides if a short, non-universal anecdote is added; no web verification applies. |
| Campus-specific AI policies for publish context | **Deferred** | Must be filled at publish time with the target school(s) or “general higher-ed” disclaimer. Do not invent links. |
| Fact-check CodePath / PyTutor / Code.org if named; numeric study citations | **Verified** (partial) | See sections below. **CodePath / Code.org:** marketing and product pages checked 2026-05-10. **PyTutor:** public project descriptions + published research; avoid overstating efficacy beyond what a cited paper claims. **Stanford “GPT Surprise” / Berkeley 61A Bot:** primary PDFs/arXiv checked; numbers below are quote-safe if attributed to those studies and framed as *that* population (MOOC / Berkeley CS1), not universal laws. |
| Pair `[FACT CHECK: …]` with syllabus URLs in draft | **FactCheck** | Phase B: retain placeholder until each linked syllabus or honor-code page is confirmed for the edition being published. |

---

## Source-by-source verification (brief numbered sources)

### 1. Rob Miles — practitioner anchor

- **Status:** **Verified**
- **Primary:** [Proper use of ChatGPT for learning to program](https://www.robmiles.com/journal/2025/4/23/proper-use-of-chatgpt-for-learning-to-program) (2025-04-23). Aligns with brief: avoid “write my code” loops; use explanations; “what you think you know” self-tests; feedback on **your** code.
- **“~95% right”:** Present in that post as informal guidance (“around 95% correct”), not a study statistic — OK if attributed to Miles as opinion, not as measured accuracy.

### 4. Stanford “GPT Surprise” (engagement vs adopters’ exam performance; geography / HDI)

- **Status:** **Verified** (for numbers below; always cite study + population)
- **Primary:** Nie et al., *The GPT Surprise: Offering Large Language Model Chat in a Massive Coding Class Reduced Engagement but Increased Adopters’ Exam Performances*, arXiv:2407.09975v2 (PDF dated 2025-07-15 in header; check final venue if citing for publication). Public summary: [SCALE Initiative listing](https://scale.stanford.edu/publications/gpt-surprise-offering-large-language-model-chat-massive-coding-class-reduced).
- **Quote-safe facts from abstract / early sections:** RCT with **5,831** students from **146** countries in a **large online coding class**; GPT-4 access/advertising associated with **lower average exam participation** overall; **heterogeneity by country / UN Human Development Index (HDI)** — e.g. abstract states offering LLMs to students from **low HDI** countries **increased** exam participation on average; adopters discussed with causal estimator (**~6.8** percentage-point exam score increase for adopters in authors’ summary; verify table/context before shortening); **~14.2%** adoption among those offered the in-course interface (highlights).
- **Draft guardrail:** Brief is correct: do not turn this into a moral lesson about “motivation.” Effects are **context-specific** (MOOC-style course, optional exam, recruitment pool). HDI moderation is real in the paper but subtle — summarize in plain language, cite paper.

### 5. Berkeley / SIGCSE — “61A Bot” homework assistant (time on task)

- **Status:** **Verified**
- **Primary:** Zamfirescu-Pereira et al., *61A Bot Report: AI Assistants in CS1 Save Students Homework Time and Reduce Demands on Staff. (Now What?)*, SIGCSE TS 2025, DOI [10.1145/3641554.3701864](https://doi.org/10.1145/3641554.3701864); author copy e.g. [Berkeley EECS PDF](https://people.eecs.berkeley.edu/~bjoern/papers/zamfirescu-61abot-sigcse2025.pdf).
- **Quote-safe summary:** **>2,000** students, **>100,000** bot requests over two semesters; homework completion time **25–50%** lower vs same percentile ranks in prior semesters, with reductions for some percentiles **>30 minutes** per assignment; forum homework-help traffic dropped **~75%** after deployment. Authors explicitly caution that faster homework **does not necessarily imply better learning** — keep that caveat if the draft mentions time savings.

### 6. MIT Media Lab **PyTutor** (MSI / equitable pathways)

- **Status:** **Verified** (design + partnership framing); **FactCheck** for any strong efficacy sentence
- **Project framing:** MIT Media Lab project overview describes equitable computing pathways and a **Socratic**, LLM-based tutor (guide rather than substitute). MIT RAISE also lists PyTutor as a research project: [raise.mit.edu — PyTutor](https://raise.mit.edu/research/research-projects/pytutor/).
- **Partners / deployment:** Public materials describe collaboration with **Georgia State University** and **Quinsigamond Community College** and deployment in introductory Python contexts — **verify exact current partner list** on the live project page before a hard list in prose.
- **Efficacy:** Peer-reviewed and thesis work exists (e.g. programming-education evaluations); if the article cites learning outcomes, cite **the specific paper** and its population — do not generalize from “PyTutor exists” to “proven to raise grades everywhere.”

### 7. Code.org **AI Tutor**

- **Status:** **Verified** (feature-level, subject to product churn)
- **Primary:** [code.org/en-US/tools/ai-tutor](https://code.org/en-US/tools/ai-tutor) (fetched 2026-05-10). Confirms: embedded in select lessons; **Socratic** framing; teacher visibility; moderation layers; named models on page (**Gemini Flash 2.5** generation, **ChatGPT-4o Mini** in safety layer at time of page — **FactCheck** if draft names models, as vendors/versions change); curricula called out include **AI Foundations**, **CS Discoveries**, **CS Principles**, **13+** for relevant flows; pilot/opt-in rollout language on page.
- **Draft guardrail:** Code.org is **K–12** positioning; use as an **institutional pattern** example, not as “your university syllabus.”

### 8. CodePath higher-ed AI curriculum / MSI framing

- **Status:** **Verified** (as **self-reported org marketing**, not independent evaluation)
- **Primary:** [codepath.org/higher-ed](https://www.codepath.org/higher-ed) (fetched 2026-05-10). Page states e.g. **50+** for-credit US partners, **82%** MSI (HBCUs, HSIs, AAPI-serving), **30+** states and Puerto Rico, **40,000+** students in courses, **60+** employers in career network, and outcome multiples (**8X** F500 hires vs peers, **4X** technical employment vs peers).
- **Draft guardrail:** Treat outcome multiples as **CodePath’s claim**; if the article needs rigor, add “according to CodePath” or omit numbers. Do not merge conflicting figures from older third-party articles (some say “100+” partners; **CodePath’s own page** says **50+** as of this verification).

### 9–10. Harlem STEM Up / student Medium roadmaps

- **Status:** **FactCheck** if a specific article or report is named in Phase B; otherwise keep as **qualitative** “student experience / equity commentary” without unsourced stats.

---

## Brief inline flags consolidated

| Brief flag | Resolution |
|------------|------------|
| `[FACT CHECK: exact claims and geography effects]` (Stanford) | **Resolved** for core numbers/HDI moderation — cite Nie et al. (above). Still **FactCheck** if draft adds *new* numbers not pulled from the paper. |
| `[FACT CHECK: current partners, rollout claims, and any efficacy language]` (PyTutor) | **FactCheck** for partner list and any outcome language; design stance **Verified** from MIT sources. |
| `[FACT CHECK: feature set if named in final article]` (Code.org) | **Verified** against current AI Tutor page; re-check before publish if naming models or units. |
| `[FACT CHECK: any outcome multiples, partner counts, or employment stats]` (CodePath) | **Verified** against CodePath higher-ed page with **explicit attribution**; see guardrail on “vs peers” methodology. |
| `[FACT CHECK: institution-specific policy links]` | **Deferred** / **FactCheck** in draft until publish context is fixed. |

---

## Phase B reminders (not in brief body; from `DRAFT_PIPELINE.md`)

- This slug **must** include at least one substantive link to **Matt Pocock** teaching (e.g. [totaltypescript.com](https://www.totaltypescript.com/) or canonical materials), tied to a real point — pick a topic that fits “learning path / typed thinking / verification” without forcing.
- Preserve any remaining `[FACT CHECK: …]` tags until human-supplied URLs or editorial sign-off.

---

## Ready for Phase B

Brief **PENDING ITEMS** are addressed above: checkable claims are verified or scoped; human-only items are deferred; draft placeholders remain where institution links or live product copy must be confirmed at publish time.
