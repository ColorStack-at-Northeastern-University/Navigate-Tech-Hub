---
SYNTHESIS BRIEF: Coding with AI: Foundations and Workflow Setup
Audience: first-year
Outcome: Use AI coding tools safely with clear task framing and verification.
Word target: 6 minutes reading time → ~1,100–1,300 words (per draft scaffold / inventory)
Personal signal available: no
Synthesis-only: no
---

DOMAIN ASSESSMENT

Execution (projects category).
AI-assisted coding sits between “shipping a project” and “interview readiness”: practitioner guides on review/testing habits and student retrospectives on Copilot vs Cursor-style workflows are equally useful; vendor ToS and IDE features are high-churn and must be anchored to primary sources at publish time.

SOURCES SEARCHED

1. GitHub Blog — “Updates to GitHub Copilot interaction data usage policy” (Mar 25, 2026) — authoritative anchor for training use of interaction data on Free/Pro/Pro+, opt-out location, exclusion for Business/Enterprise, and the distinction between private repo content “at rest” vs data processed while Copilot is active. [FACT CHECK before publish: confirm dates and UI paths still match https://github.com/settings/copilot — policy tier names and defaults change.]
2. Cursor — Data Use & Privacy Overview (cursor.com/privacy-overview) — Privacy Mode vs off, training use when off, codebase indexing (chunks/embeddings), temporary caching, and note that requests still go through Cursor backend even with user API keys. [FACT CHECK: Legacy Privacy Mode wording and “accounts created before Oct 15, 2025” footnote on provider sharing — re-read current page before publishing.]
3. MRQ — “Best Practices for AI Pair Programming” (blog) — diff review discipline, small steps, treat output as draft, git recovery mindset.
4. DEV Community — Alex Cloudstar, “Testing AI-Generated Code: How to Actually Know If It Works” — confident-wrong output, tests should reflect the human’s problem understanding (not only AI-generated tests).
5. DEV Community — multiple 2026 Cursor vs Copilot comparison posts (e.g. rahulxsingh, serenitiesai, cumulus) — student-friendly framing of IDE-native vs extension workflow, multi-file edits, rough cost/feature tradeoffs. [FACT CHECK: do not treat pricing, request limits, or feature parity in third-party blogs as facts — verify against GitHub Copilot and Cursor pricing/docs at publish time.]
6. arXiv — “LLM Use, Cheating, and Academic Integrity in Software Engineering Education” (2603.17060) — time pressure and unclear guidance correlate with problematic use; exams/quizzes vs assignments; students aware of consequences; argues for aligning assessment with stated learning goals, not prohibition alone.
7. arXiv — student authorship/attribution preferences in AI-assisted programming (2602.04023) — interest in process-oriented attribution vs one-line disclosure; supports teaching “show your reasoning” alongside tool use.
8. ColorStack / AfroTech (org pages, impact reporting) — strong audience context (community, career rails for Black and Latinx CS students); no dedicated public article located on Copilot/Cursor workflow for this search pass. [FACT CHECK: if the final article names ColorStack programs or stats, cite current ColorStack pages; do not import unverified partner counts from secondary summaries.]

KEY FINDINGS

[GEM] Before accepting AI edits, scan the diff for scope creep, deleted imports, accidental file touches, and hardcoded secrets — short review beats long debugging. Sources: MRQ + practitioner norms echoed across student posts.

[GEM] Treat AI-generated code as a first draft: run it, test it, and assume it can be plausible and wrong in the same block. Source: MRQ; reinforced by DEV testing article.

[GEM] Prefer small, verifiable steps (“add the model,” then “add the route,” then “wire the UI”) so when something breaks you know which step introduced it. Source: MRQ.

[GEM] For tests, start from what you believe the code should do — not only from AI-suggested tests — so you do not inherit the model’s blind spots twice. Source: DEV (Alex Cloudstar).

[GEM] Task framing for tools: give inputs, outputs, constraints, files in scope, and a definition of done in the prompt; the draft scaffold already encodes this as the core habit for first-years.

[GEM] Repo hygiene: intentional commits, readable PR descriptions when AI touched the patch, and attribution clarity for coursework — pairs with process-oriented disclosure research (arXiv 2602.04023) without prescribing a specific school policy.

[GEM] GitHub Copilot (official): from Apr 24, 2026 (per GitHub announcement), interaction data from Copilot Free, Pro, and Pro+ may be used for model training unless the user opts out in Copilot privacy settings; Business and Enterprise are called out as not affected; the post explicitly states Copilot processes code from private repos when you are actively using the product, and distinguishes that from “content at rest” in issues/discussions/private repos. Students must verify their tier and settings. Source: GitHub Blog.

[GEM] Cursor (official): Privacy Mode is the control surface for zero data retention with model providers and “no training” claims on the overview page; turning Privacy Mode off allows training and broader storage; codebase indexing uploads chunks for embeddings with plaintext discarded after the request per their overview. Students should read the current Privacy Policy, not second-hand summaries. Source: Cursor privacy overview.

Supporting point: Coursework risk is as much “wrong use case” (exams, undisclosed wholesale generation) as “any AI” — SE education paper supports explicit instructor alignment and syllabus-first behavior.

Supporting point: Hybrid human-AI workflow articles (e.g., pair programming age-of-AI posts) reinforce that AI augments implementation after you understand the task — useful tone for first-years balancing speed and learning.

DISCARDED

- Feature shootouts and price tables copied from DEV comparison posts without primary citations (high volatility; likely stale within weeks).
- “AI will make you a 10x developer” hype without verification habits — undermines the article outcome.
- Blanket claims that Privacy Mode means “nothing leaves your machine” — contradicts Cursor’s own indexing/backend wording; excluded to avoid false comfort.
- Generic integrity advice (“don’t cheat”) with no link to task framing, disclosure, or assessment type — too thin for this audience.

RECOMMENDED STRUCTURE

Opening hook: The fast path feels like “paste error → accept suggestion,” but the expensive path is realizing in review that you cannot explain or test what shipped.

Section 1: What you are optimizing for — learning + integrity + safety; syllabus and assignment type decide what “allowed” means; [FACT CHECK: link NEU/registrar or course-specific language when publishing].

Section 2: Task framing the model can actually use — inputs/outputs/constraints/files/DOD; when to talk to a human or TA first.

Section 3: Verification loop — read diffs, run locally, run tests you designed, spot-check edge cases; keep changes small.

Section 4: Tool families without over-claiming — extension-style (e.g., Copilot in familiar IDEs) vs AI-forward editors (e.g., Cursor): pick a default for the course/project, know where settings and data-use policies live; [FACT CHECK] all vendor bullets against current official pages.

Section 5: Secrets, employer, and school data — nothing sensitive in unknown endpoints; separate “personal learning repo” from “proprietary internship code.”

The mistake: Accepting multi-file changes you have not run because they look polished — confidence is not correctness.

Close: In the next 24 hours, pick one assignment, write a five-line prompt with explicit DOD, generate at most one small change set, read the full diff, run tests or manual checks, and note one line for your README or submission about how AI was used if your syllabus asks.

"WHAT YOU'LL LEAVE WITH" DRAFT

• A reusable prompt skeleton (inputs, outputs, constraints, scope, definition of done).
• A three-step verification checklist (diff, run, edge case) sized for first-year projects.
• A publish-time vendor checklist: Copilot privacy/training opt-out + tier; Cursor Privacy Mode + indexing note — both verified from official sources, not blogs.

PENDING ITEMS

- [FACT CHECK] Northeastern (or course-specific) academic integrity / GenAI language — link live policy pages in the final article; do not invent “allowed at NEU” rules.
- [FACT CHECK] Re-verify GitHub Copilot and Cursor pricing, limits, and settings UI strings on publish date (high volatility topic).
- Optional: add a community-sourced anecdote from ColorStack Slack/events only if the user supplies it — no fabrication.

READY TO WRITE: awaiting your approval or adjustments.
