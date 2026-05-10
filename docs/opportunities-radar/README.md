# Opportunity Radar — Weekly Discovery Pipeline

A repeatable weekly pipeline that fans out parallel research subagents — one slice of companies per agent — to discover student-relevant opportunities (named programs, insight days, summits, diversity pipelines) for Black and Latinx CS students at Northeastern University.

**This is internal infrastructure. Students never see it. Output flows to Strapi via human review.**

---

## What this is and is not

**Is:** A breadth-first discovery and maintenance system for named programs (Microsoft Explore, Duolingo Thrive, Jane Street JSIP, etc.), insight days, summits, fellowships, and org-sourced announcements — things a student would miss unless they had company notifications turned on.

**Is not:** A general internship aggregator. Generic SWE intern reqs are explicitly excluded. The catalog stays curated.

---

## File layout

```
docs/opportunities-radar/
  README.md                          ← this file
  companies.md                       ← work queue (~120 companies, the input list)
  sources/
    orgs.md                          ← public newsletter/archive URLs to diff weekly
    aliases.md                       ← known program renames (e.g. SEEDS → JSIP)
    deny-list.md                     ← companies/programs explicitly skipped + why
  findings/
    <company-slug>.md                ← one file per company, overwritten each run
    _orgs/
      <org-slug>.md                  ← one file per org source, overwritten each run
  runs/
    YYYY-MM-DD-digest.md             ← executive summary; reviewer reads this first
    YYYY-MM-DD-actions.md            ← checkbox checklist of Strapi changes to apply
```

Git history is the time series. Each weekly run overwrites `findings/` files; the diff between commits is what happened that week.

---

## Workspace constraint — OneDrive file traversal

This workspace is synced via OneDrive. Recursive file-search tools (Glob, directory listings) are slow enough to time out inside agent tool calls. The workaround is baked into how the runner operates:

- Subagent prompts embed all skill content and alias data **inline** — agents never need to Glob or recursively read the workspace for input.
- Agents only use `WebSearch` (external network) and `Write` (single known file path) for their work.
- The parent agent uses `Shell` with `Get-ChildItem` (not Glob) when it needs to list files.
- Direct `Read` on a known absolute path works fine — it is only recursive traversal that is slow.

---

## How to run (Phase 1 — manual trigger)

Open a new Cursor chat and send exactly:

```
Run the opportunity-radar pipeline for this week.
```

The parent agent will:

1. Read `companies.md` and `sources/orgs.md` to load the full work queue.
2. Slice the queue into batches of 10, grouped by industry tag.
3. Fan out up to 6 parallel subagents, each processing one batch using the skill at `.cursor/skills/opportunity-radar/SKILL.md`.
4. Wait for all subagents to finish, then aggregate findings.
5. Write `runs/YYYY-MM-DD-digest.md` (the summary) and `runs/YYYY-MM-DD-actions.md` (the Strapi checklist).
6. Commit everything to a branch named `radar/YYYY-MM-DD` and open a PR titled `Radar — Week of <date>`.
7. Stop and wait for you.

Expected wall-clock time: 20–40 minutes depending on batch size.

---

## Reviewer workflow (after the PR is opened)

Target: 30–45 minutes per week. If it takes longer, the skill needs tuning.

1. **Read the PR description** (it is the digest). Get the headline numbers: new programs, closed programs, status changes, dead links.
2. **Open `runs/YYYY-MM-DD-actions.md`**. Work top-down through the checklist:
   - `[ADD-TO-STRAPI]` → create a new External Resource entry in Strapi admin. Set `lastVerified` to today's date.
   - `[REMOVE-FROM-STRAPI]` → unpublish or delete the Strapi entry. Check the linked `findings/` file for the reason.
   - `[UPDATE-STRAPI]` → update the specified field(s) on the existing entry.
   - `[VERIFY-MANUALLY]` → the agent flagged uncertainty. Open the linked findings file, check the source URL by hand, then decide.
3. **Check the box** next to each action as you apply it in Strapi.
4. **Merge the PR** when done — merging is record-keeping only. The canonical source of truth is Strapi.

---

## How to add a company to the queue

Edit `companies.md` and add a row using the pipe-delimited format:

```
<slug>  | <Display Name>  | <industry-tag>  | <official careers URL or blank>
```

Valid industry tags: `big-tech`, `quant`, `fintech`, `enterprise`, `consumer`, `defense`, `consulting`, `healthtech`, `boston-local`, `gov-lab`.

If you do not know the careers URL, leave it blank — the agent will find it in Pass 1. If the agent can't find it after two runs, add the company to `sources/deny-list.md`.

---

## How to add a known program rename to aliases

Edit `sources/aliases.md` and add a row:

```
<old-program-name> | <new-program-name> | <company-slug> | <date-confirmed>
```

The agent checks this before reporting a program as "removed" so it does not create false-positive deltas.

---

## Tuning the skill

The skill lives at `.cursor/skills/opportunity-radar/SKILL.md`. It has a `lastReviewed` date in its frontmatter. Review it quarterly — at minimum when:

- A new class of program name appears that the lexicon misses (Pass 2).
- A DEI rollback pattern emerges that Pass 5 isn't catching.
- Reviewer time exceeds 60 minutes (skill is generating too much noise).

---

## Seeding methodology (why these ~120 companies)

The list is not "every tech company." It is:

- High probability of named underclassmen programs (not just generic intern reqs).
- Companies where a NEU Black/Latinx CS student has a realistic shot.
- Manageable per-run cost (linear with list size — start small, expand after Phase 1 proves out).

See `companies.md` for the full list grouped by industry tag. See `sources/deny-list.md` for companies removed after three empty runs.

---

## Phase 2 (deferred — do not implement yet)

After 2–3 successful manual runs: add `.github/workflows/opportunity-radar.yml` with a Sunday 10:00 UTC cron that invokes a Cursor Cloud Agent with the same trigger prompt. Everything downstream is unchanged. Phase 2 requires Cursor SDK setup, secrets, and billing — out of scope until Phase 1 is proven.
