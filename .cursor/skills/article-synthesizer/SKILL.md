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

**Two cases:**

1. **Normal local clone** (repo on a fast local disk, not inside OneDrive sync): Use standard discovery (**Glob**, **grep**/`rg`, **SemanticSearch**) when helpful. Slug → `docs/internal_resources_drafts/{slug}/synthesis/brief.md` is still deterministic—you rarely need search if the parent gave paths.

2. **Slow-sync root** (e.g. repo under **OneDrive**): Recursive **Glob**, repo-wide **grep**/`rg`, and **SemanticSearch** over the workspace often **time out**. **Do not** depend on those tools to load this skill or discover paths. Assume the **parent** pastes into your prompt: hard rules, **inventory row**, kickoff reminders, flags. Use **Read** only on **absolute paths** you were given; **Write** once to the agreed `brief.md` path.

**If you are a synthesis sub-agent (parallel Task, SDK agent, etc.):**

1. **Slow-sync only:** Do not use Glob, grep/`rg`, SemanticSearch for discovery, or recursive shell search over the workspace—use parent-supplied text + **Read** on known paths. **Local clone:** those restrictions do not apply unless the parent pastes the slow-sync TOOL ALLOWLIST from `DRAFT_PIPELINE.md`.
2. **Reading the repo:** Prefer **Read** on paths you were given. **Local clone:** optional wider reads if the parent allows.
3. **Writing output:** use **Write** (or equivalent) to **one known path** only, e.g.  
   `docs/internal_resources_drafts/{slug}/synthesis/brief.md`  
   (parent supplies the full absolute path).
4. **Research** uses **WebSearch** / **WebFetch** / browser tools on **external URLs** — not disk traversal.

**If you are the parent orchestrator** on a **slow-sync** tree: prefer **Shell** with **bounded** paths, e.g. PowerShell `Get-ChildItem -LiteralPath <one-folder> -Recurse -Filter brief.md` under `docs/internal_resources_drafts`. **Local clone:** normal enumeration is fine.

**Pipeline shape:** slug → output path is deterministic; search tools are optional helpers on fast disks, not required for synthesis subagents.

### Permissions (sub-agents)

This chat cannot approve Cursor/OS dialogs for you. To reduce tedium: when a sub-agent asks for **network** (web verification) or **git_write**, choose **allow for this workspace** (or your client’s equivalent) so later Tasks reuse it. There is no separate “batch grant” API from the agent; workspace-level trust is the practical fix.

---

## Step 1 — Pull Article Metadata

Before searching, retrieve from the inventory (from the **parent’s inline packet**, or **one** `Read` of the inventory file at a path the parent gave you — on **slow-sync** roots, do not search the repo for it):
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
- **Slow-sync / OneDrive sub-agent runs:** do not use **Glob**, **grep**/`rg`, **SemanticSearch** for discovery, or recursive repo listing to load this skill or the inventory; use parent-supplied inline text or **one** `Read` on a known absolute path. Write only to the agreed `brief.md` path (see *Before you start — workspace and tools*). **Local clones:** skip this restriction unless the parent says otherwise.