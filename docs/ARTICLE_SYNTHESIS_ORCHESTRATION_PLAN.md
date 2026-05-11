# Article synthesis orchestration plan

This document defines how Navigate Tech Hub runs **parallel synthesis sub-agents** so that, when you trigger **Build**, each agent has enough context to follow **`article-synthesizer`** end-to-end and apply **`ux-product`** framing to what counts as relevant for the reader. It is the specification for implementation (Cursor Tasks, hooks, CLI, or future automation), not the implementation itself.

---

## 1. Goals

| Goal | Detail |
|------|--------|
| **Scale** | Produce one `synthesis/brief.md` per target slug without running articles sequentially by hand. |
| **Consistency** | Every brief uses the **exact** output skeleton from `article-synthesizer` (metadata block, DOMAIN, SOURCES, KEY FINDINGS with `[GEM]`, DISCARDED, RECOMMENDED STRUCTURE, WHAT YOU’LL LEAVE WITH, PENDING, READY TO WRITE). |
| **Audience fidelity** | Every brief is filtered for **Black and Latinx CS students at Northeastern** (and inventory `audienceStage`), not generic “CS career” advice. |
| **Actionability** | GEMs must pass the skill rule: **immediately actionable** this week; generic advice is discarded. |
| **Safety** | No Strapi publish, no invented stats, `[FACT CHECK: …]` preserved; `cs-course-planning-neu` does **not** get open-web synthesis. |

### Non-goals

- **Draft writing** in the same Build (Step 2 is separate: approve brief → write `draft/article.md` with `navigate-writing.mdc`).
- **Fully unattended quality** without a merge/review gate (see §8).
- **Reddit as a primary source** (organic mentions only; no `site:reddit.com` queries).

---

## 2. What “Build” means

**Product intent:** One user action that **fans out** work to N sub-agents and **collects** `brief.md` files into the repo layout under `docs/internal_resources_drafts/{slug}/synthesis/`.

**Implementation options** (pick one when wiring):

| Approach | Pros | Cons |
|----------|------|------|
| **Cursor parallel Tasks** (N Task invocations in one turn, `run_in_background: true`) | Native to current workflow; each task gets isolated prompt | Parent must assemble packets; merge is a follow-up |
| **Cursor Agent / Cloud “batch”** (if/when supported) | Single entrypoint | Depends on product |
| **Script + Cursor SDK** (`@cursor/sdk`) | Repeatable, CI-like | Requires tokens, agent definitions, repo write |
| **Manual “Build checklist”** | No code | Human starts N chats from a template |

Until automation exists, **Build** can mean: *run the parent checklist once, then launch K parallel agent runs from the generated packet files.*

---

## 3. System actors

### 3.1 Parent orchestrator (single run)

**Inputs:**

- `docs/INTERNAL_GUIDE_INVENTORY.md` (source of truth for slug metadata).
- Navigate kickoff / operating context (source priority by category, GEM rules, personal-signal rules, synthesis-only slugs, word-count table, `resume-for-tech-roles` placeholder rules).
- `.cursor/skills/article-synthesizer/SKILL.md` (hard rules and output format).
- `.cursor/rules/navigate-writing.mdc` (optional for parent: ensures “what you’ll leave with” aligns with voice constraints later—not for synthesis prose).

**Responsibilities:**

1. **Select target slugs** for this Build (e.g. Batch 1 only, or explicit list).
2. **Skip or branch** special cases:
   - **`cs-course-planning-neu`:** emit a **stub brief** that only states NEU manual sourcing required; **no web searches** in child.
3. For each normal slug, **emit a child packet** (§5) to disk, e.g.  
   `docs/internal_resources_drafts/_build_packets/{slug}.md`
4. **Launch** N sub-agents (§4) each with **one packet** that **embeds skill + inventory inline** when the clone is on **OneDrive / slow-sync** (children then avoid Glob); on **local clones**, embedding is optional.
5. After children finish, run **merge/QC** (§8) or assign a **single editor agent** with all `brief.md` paths. On slow-sync trees, prefer **Shell** with a bounded path over repo-wide Glob; on local clones, normal listing/search is fine.

### 3.2 Synthesis sub-agent (one per slug, parallel)

**Mission:** Execute **article-synthesizer Step 1 only** → write `docs/internal_resources_drafts/{slug}/synthesis/brief.md`.

**Workspace constraint:** On **OneDrive / slow-sync** clones, recursive **Glob**, full-tree listing, **SemanticSearch** for path discovery, and **grep** / **ripgrep (`rg`)** over the repo can **hang or time out**—sub-agents must **not** depend on those tools there. On **normal local clones**, standard discovery is allowed.

**Must read (choose one pattern):**

- **Preferred (slow-sync):** Child prompt **embeds inline** the inventory row, kickoff source-priority bullets, and the **relevant sections** of `article-synthesizer` (hard rules + Steps 2–5 + output template). No repo read required for the skill.
- **Local clone:** Parent may rely on **Read** of skill/inventory paths instead of inlining.
- **Optional:** At most **one** `Read` on a **known absolute path** (e.g. inventory file) if the parent did not inline it.

**Must not (inputs, slow-sync only):** Use Glob, grep, rg, SemanticSearch/codebase_search for path discovery, or recursive search to “find” the skill or inventory.

**Tools in practice:** **WebSearch** / fetch for external sources; **Write** once to the known `brief.md` path. See `.cursor/skills/article-synthesizer/SKILL.md` → *Before you start — workspace and tools*.

**Parent enumeration:** On slow-sync trees, use **Shell** (`Get-ChildItem` with a tight path) instead of repo-wide Glob; local clones may use any efficient method.

**Must do:**

1. **UX-product pass** (content framing, not UI)—answer and apply:
   - Who is reading this?
   - What are they trying to accomplish in the **next 7 days**?
   - What is the **primary action** after the article (concrete deliverable)?
   - What would **wrong** success look like (e.g. “feel inspired” with no artifact)?
2. **Domain assessment** per synthesizer (practitioner-first vs community-first vs execution).
3. **Three search passes** in order:
   - Expert/practitioner
   - Audience-specific (Black/Latinx, ColorStack, AfroTech, Code2040, MLT, SEO Tech, Latinas in Tech—**never skip**)
   - Student voice (Medium/Dev.to, etc.)
4. **Deep browse** when needed: open high-value URLs (long guides, program pages), not every SERP hit. Stop on login walls / CAPTCHA and note in SOURCES.
5. **GEM filter** strictly; discard generic advice.
6. **Output** only the synthesizer template; **no article prose**.

**Must not (deliverables):**

- Write `draft/article.md`.
- Push to Strapi.
- Fabricate statistics or sponsor lists.

### 3.3 Draft pipeline (per slug): A → B → C

Approved for article generation (see `docs/internal_resources_drafts/DRAFT_PIPELINE.md`):

| Phase | Output | Role |
|-------|--------|------|
| **A** | `synthesis/verification-log.md` | Resolve **PENDING ITEMS** / author notes; **do not** edit `brief.md`. |
| **B** | `draft/article.md` | Full draft using **`navigate-writing.mdc`** + brief + verification log. |
| **C** | Patch `draft/article.md` | Style gate against `navigate-writing` (banned patterns, closers, FACT CHECK preservation). |

**Matt Pocock links:** only the four `coding-with-ai-*` slugs (substantive link, e.g. Total TypeScript).

Run **A then B then C** per slug before starting the next slug’s B if you want strict ordering; parallelize across **different** slugs (e.g. many A at once, then many B once their A files exist).

### 3.4 Editor / merge agent (optional, single, after parallel wave)

**Mission:** Normalize quality across briefs produced in parallel.

- Dedupe repeated GEMs across sources.
- Ensure sibling articles cross-reference correctly (e.g. `application-to-offer-timeline` vs `interview-process-map`).
- Verify every brief ends with **READY TO WRITE** and **PENDING ITEMS** includes fact-checks where needed.
- Does **not** replace child web research unless a brief is clearly thin—then **return to child** with “expand Search 2” instructions.

### 3.5 Human (you)

- Approve or edit `brief.md` before any draft.
- Resolve `[FACT CHECK: …]` before publish.

---

## 4. Parallelism rules

| Rule | Rationale |
|------|-----------|
| **Default: one agent per slug** | Clean ownership of `brief.md`; minimal merge conflict. |
| **Do not split one slug across 3 agents** without a merge step | Duplicate GEMs and contradictory RECOMMENDED STRUCTURE. |
| **Cap concurrency** (e.g. 3–5 at a time) | Reduces rate limits, duplicate queries, and API throttling on browse/search. |
| **Stagger Search 2** if many agents share identical queries | Optional jitter in query wording or time to diversify results. |
| **Same repo paths** | Children write **different** `brief.md` paths—no git conflict if slugs differ. |

---

## 5. Child packet template (parent generates this)

Each file `docs/internal_resources_drafts/_build_packets/{slug}.md` should contain:

```markdown
# Synthesis packet: {slug}

## Inventory (verbatim)
- Title:
- Category:
- Audience stage:
- Outcome:
- timeToReadMinutes:
- contentVolatility:
- batch:

## Synthesizer domain hint
[practitioner-first | community-first | execution | NEU-MANUAL-ONLY]

## UX-product framing (answer in your run; use to steer Search 2–3)
- Reader:
- Job-to-be-done this week:
- Primary post-read action (one sentence):
- Anti-goals (what this article must not optimize for):

## Source priority reminder (from kickoff)
[Paste category-specific bullets: interview-prep vs community vs projects, etc.]

## Special flags
- Synthesis-only article: [yes/no per kickoff list]
- Personal signal allowed for final draft later: [yes/no + topics]
- Pending assets: [e.g. resume annotated examples]

## Output path (write only this file for synthesis)
`docs/internal_resources_drafts/{slug}/synthesis/brief.md`

## Instructions
1. Follow `.cursor/skills/article-synthesizer/SKILL.md` exactly.
2. If domain is NEU-MANUAL-ONLY: do not web search; output brief stating manual sourcing required.
3. Stop after READY TO WRITE. No article body.
```

Parent ensures `{slug}/synthesis/` exists (or child creates it).

---

## 6. Querying and deep browse strategy

### 6.1 Query layers (per child)

1. **Expert:** `{topic} recruiter OR hiring manager OR ATS {year}`
2. **Audience:** `{topic} "Black" OR "Latinx" CS student ColorStack OR AfroTech OR Code2040`
3. **Student:** `{topic} "first internship" OR "no experience" site:medium.com OR site:dev.to`

Category-specific boosts from kickoff (e.g. resume → Teal, CodeDay; hackathons → MLH) are pasted into the packet.

### 6.2 When to deep browse

- Official program pages (ColorStack, Code2040, company university recruiting).
- Long-form posts (CodeDay, Teal, LinkedIn Talent Blog) when snippet is insufficient for GEM extraction.
- **Stop** at paywalls, logins, or broken pages; record in SOURCES SEARCHED.

### 6.3 Evidence hygiene

- Prefer **quotable mechanism** (how screening works) over **unverified stats**.
- Any number (scan time, pass rate, application volume) → `[FACT CHECK: …]` unless primary source confirmed in-run.

---

## 7. Output contract

| Path | Content |
|------|---------|
| `docs/internal_resources_drafts/{slug}/synthesis/brief.md` | Full synthesizer output |
| `docs/internal_resources_drafts/{slug}/synthesis/STATUS.md` | **Remove or replace** when `brief.md` exists (optional cleanup in merge) |
| `docs/internal_resources_drafts/{slug}/draft/article.md` | **Out of scope for Build** unless a separate “Draft build” exists |

---

## 8. Merge / QC gate (after Build)

**Automatic checks (script or editor agent):**

- [ ] Frontmatter-style block at top matches inventory for that slug.
- [ ] Sections: DOMAIN, SOURCES, KEY FINDINGS, DISCARDED, RECOMMENDED STRUCTURE, mistake, close, WHAT YOU’LL LEAVE WITH, PENDING, READY TO WRITE.
- [ ] Every `[GEM]` is actionable within ~7 days.
- [ ] Search 2 explicitly ran (named sources or honest “weak results + follow-up needed”).
- [ ] `cs-course-planning-neu` has no fabricated NEU specifics.

**Human checks:**

- Outcome ↔ “what you’ll leave with” alignment.
- Cross-links between split guides.
- Tone appropriateness is **not** required at synthesis stage (voice applies at draft).

---

## 9. Failure modes and retries

| Failure | Response |
|---------|----------|
| Thin Search 2 | Retry with alternate queries (Summit recaps, LinkedIn public posts, org news). |
| Rate limited / empty SERP | Note in SOURCES; schedule second pass; do not hallucinate. |
| Child writes article prose | Reject output; regenerate with stricter “synthesizer only” system reminder. |
| Wrong slug path | Parent validates path before merge. |
| Duplicate GEMs across two slugs | Merge agent consolidates or points one brief to “see sibling.” |

---

## 10. Build runbook (operator checklist)

1. **Select slugs** from inventory (or batch).
2. **Run parent:** generate `_build_packets/*.md` + ensure folders exist.
3. **Launch** N synthesis sub-agents with one packet each (respect concurrency cap).
4. **Wait** for all `brief.md` files.
5. **Run merge/QC** (editor agent or script + human skim).
6. **You:** approve briefs; then separately run **draft** generation (Step 2) per slug.
7. **Fact-check** tags before Strapi.

---

## 11. Future: single-click “Build” in repo

When implementing in Cursor or CI:

- **Input:** list of slugs or `batch: 1`
- **Output:** committed or PR-ready `brief.md` files
- **Telemetry:** log which URLs were fetched per slug (for audit and re-runs)

Optional: a `package.json` script or Makefile target `synthesis:batch` that invokes the Cursor SDK with the parent prompt and child definitions—only if the team adopts `@cursor/sdk` for automation.

---

## 12. Related files

- `docs/INTERNAL_GUIDE_INVENTORY.md`
- `docs/internal_resources_drafts/README.md`
- `.cursor/skills/article-synthesizer/SKILL.md`
- `.cursor/rules/navigate-writing.mdc`
- `.cursor/skills/ux-product/SKILL.md` (framing: user, goal, primary action—applied to **reader** of the article)

---

*Last updated: plan generation for Navigate Tech Hub article pipeline.*
