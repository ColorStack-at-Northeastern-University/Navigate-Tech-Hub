---
name: article-synthesizer
description: |
  Research and synthesis step for Navigate Tech Hub internal articles.
  Searches sources, extracts findings, flags gems, and produces a structured
  brief before any article is written.
  Activate when user says: synthesize [article], research [article],
  run synthesis on [article], start [article], write [article].
  Always runs before article writing — never skip this step.
---

# Article Synthesizer

## Purpose
Produce a structured synthesis brief for a Navigate Tech Hub internal article.
This is Step 1 of 2. Do not write the article during this step.
Output the brief. Stop. Wait for user approval.

---

## Before you start — workspace and tools (read this if you are a sub-agent)

**Navigate Tech Hub often lives on a OneDrive-backed path.** Recursive workspace traversal (e.g. **Glob** over the repo, broad directory walks) can be slow enough to **time out** inside agent tool calls. That is an environment constraint, not a judgment that the repo is “too big.”

**If you are a synthesis sub-agent (parallel Task, SDK agent, etc.):**

1. **Do not rely on Glob or codebase-wide search** to discover inputs. Assume the **parent** pastes into your prompt: this skill’s hard rules (or the sections you need), the **inventory row** for your slug (title, category, audience, outcome, minutes, volatility, batch), kickoff source-priority reminders, and any special flags (synthesis-only, NEU manual, personal signal).
2. **Reading the repo is optional and narrow:** if you must read one file, use **Read** on a **single absolute path** you were given (e.g. `INTERNAL_GUIDE_INVENTORY.md`). One file open is fine; **do not** walk the tree to “find” the inventory.
3. **Writing output:** use **Write** (or equivalent) to **one known path** only, e.g.  
   `docs/internal_resources_drafts/{slug}/synthesis/brief.md`  
   (parent supplies the full absolute path). No need to list sibling folders first.
4. **Research** uses **WebSearch** / **WebFetch** / browser tools on **external URLs** — those are not OneDrive traversal.

**If you are the parent orchestrator** enumerating many `brief.md` or slugs: prefer **Shell** (e.g. PowerShell `Get-ChildItem` with a tight `-Path`) over **Glob** on the repo root for large trees on OneDrive.

**You do not need Glob for this pipeline:** slug → output path is deterministic. Glob is only for unknown-path discovery; synthesis runs should not depend on it.

---

## Step 1 — Pull Article Metadata

Before searching, retrieve from the inventory (from the **parent’s inline packet**, or **one** `Read` of the inventory file at a path the parent gave you — do not search the repo for it):
- Audience stage
- Outcome (what the student should leave with)
- timeToReadMinutes (governs word count)
- Category (governs source priority)
- Any special flags (synthesis-only, personal signal available, pending items)

State these clearly at the top of the brief output.

---

## Step 2 — Assess Domain and Source Type

Determine which source types are highest signal for this topic:

**Community-first topics** (networking, conferences, cold outreach, career fairs,
community programs): prioritize AfroTech recaps, ColorStack Summit testimonials,
Code2040/MLT/SEO Tech resources before general career advice.

**Practitioner-first topics** (resume, interviews, hiring process): prioritize
recruiter-written content, Levels.fyi, codeday.org before student retrospectives.

**Execution topics** (projects, hackathons, deployment, open source): prioritize
practitioner guides and student retrospectives equally.

**NEU-specific topics** (`cs-course-planning-neu` only): do not run standard web
search. Flag for manual sourcing. Output: "This article requires NEU-specific
sourcing. See kickoff brief for instructions. Do not synthesize from general web."

State your source type assessment before searching.

---

## Step 3 — Run Web Searches

Run searches in this order. Use the source priority list from the kickoff brief
for category-specific sources.

**Search 1 — Expert/practitioner layer**
Query format: `[topic] [practitioner keyword] [year]`
Example: `"CS student resume" recruiter expectations ATS 2024 2025`
Target: recruiter-written guides, hiring manager perspectives, platform-specific
advice (Levels.fyi, Teal HQ, NeetCode, MLH)

**Search 2 — Audience-specific layer**
Query format: `[topic] "Black" OR "Latinx" CS student [community signal]`
Example: `resume advice "Black" OR "Latinx" CS student ColorStack AfroTech`
Target: AfroTech articles, ColorStack recaps, Code2040/MLT/SEO Tech resources,
Latinas in Tech content. This search is highest priority for your audience.
Run it even when results from Search 1 are strong.

**Search 3 — Student voice layer**
Query format: `[topic] "first internship" OR "no experience" student site:medium.com`
or `[topic] CS student site:dev.to`
Target: Medium, Dev.to, Hashnode, LinkedIn public posts, YouTube retrospectives

**Reddit:** Do not search Reddit directly. If Reddit results appear organically
in other searches, use them. Do not run site:reddit.com queries.

---

## Step 4 — Extract and Filter

For every piece of advice found, apply the GEM filter:

**[GEM] — flag these explicitly:**
- Immediately actionable today or this week
- Specific: contains a step, number, template, or named example
- Counterintuitive, underrepresented-student-specific, or consistently
  described as "wish I knew this earlier"
- OR validated across 3+ independent sources

**Supporting point — include without flag:**
- Actionable and specific but not surprising
- Validated across 2+ sources

**Discard — do not include:**
- Generic ("network early", "be passionate")
- Assumes experience a first-semester student doesn't have
- Repeated across sources with no added specificity
- Career-stage-inappropriate for the target audience stage

---

## Step 5 — Output the Synthesis Brief

Use this exact format:

```
---
SYNTHESIS BRIEF: [Article Title]
Audience: [audienceStage]
Outcome: [from inventory]
Word target: [from timeToReadMinutes]
Personal signal available: [yes/no — which topics]
Synthesis-only: [yes/no]
---

DOMAIN ASSESSMENT
[Expert-first / Community-first / Execution / NEU-specific]
[One sentence on why]

SOURCES SEARCHED
1. [Source name] — [what it contributed or "no useful signal"]
2. ...

KEY FINDINGS

[GEM] [Finding — specific, actionable, with source]
[GEM] [Finding]
[Finding — supporting point]
[Finding — supporting point]
...

DISCARDED
[List themes that came up repeatedly but were cut and why]

RECOMMENDED STRUCTURE
Opening hook: [specific friction point or observation to open with]

Section 1: [Descriptive header] — [one sentence on what it covers]
Section 2: [Descriptive header] — [one sentence]
Section 3: [Descriptive header] — [one sentence]
[Add sections if needed, remove if not]
The mistake: [what the common mistake is]
Close: [what the 24-hour action should be]

"WHAT YOU'LL LEAVE WITH" DRAFT
• [Deliverable 1]
• [Deliverable 2]
• [Deliverable 3 if needed]

PENDING ITEMS
[Anything the user needs to provide before the article is complete —
example files, personal anecdotes, fact checks flagged]

READY TO WRITE: awaiting your approval or adjustments.
---
```

---

## Hard Rules

- Never write article prose during this step
- Never skip the audience-specific search (Search 2) — it is the
  highest-priority source for this platform's audience
- Never include a GEM that isn't immediately actionable
- Never recommend a structure that doesn't match the article's outcome
- Always stop after outputting the brief and wait for user input
- For `cs-course-planning-neu`: output the flag message and stop,
  do not run any searches
- **OneDrive / sub-agent runs:** do not use **Glob** or recursive repo listing to load this skill or the inventory; use parent-supplied inline text or **one** `Read` on a known absolute path. Write only to the agreed `brief.md` path (see *Before you start — workspace and tools*).