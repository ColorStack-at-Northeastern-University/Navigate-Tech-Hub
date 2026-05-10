---
name: opportunity-radar
lastReviewed: 2026-05-10
description: |
  Per-target research recipe for the Opportunity Radar pipeline.
  Searches the web for student-relevant opportunities (named programs,
  insight days, summits, diversity pipelines, conferences, fellowships)
  for ONE company or ONE org source. Writes a structured markdown
  findings file. Does NOT search general SWE intern listings.
  Activate when user says: run radar on [company], radar [company],
  research [company] opportunities. Used by the parent radar runner
  to fan out work across batches.
---

# Opportunity Radar Skill

## What this skill does

Research ONE target (a company or an org source) and write a structured findings file to `docs/opportunities-radar/findings/`. You are looking for **named programs**, **insight days**, **summits**, **fellowships**, and **diversity pipelines** — things a Black or Latinx CS freshman or sophomore at Northeastern University would miss unless they had notifications turned on for that company.

**You are NOT looking for generic SWE internship listings.** The bar for inclusion: a program must have a **name** (e.g. "Explore," "Thrive," "Launch") OR a **scheduled date** (an insight day with a date on the calendar) OR be a **named pipeline** (e.g. Amazon Future Engineer, CodePath TIP). A generic "Software Engineer Intern, Summer 2027" req does not qualify.

---

## Before you start

This skill runs inside a workspace on OneDrive. **Do NOT use Glob or recursive directory-listing tools** — they time out in this environment. Only use `WebSearch` and `Write`.

The parent agent (or the human triggering the run) is responsible for embedding aliases, deny-list entries, and any previous findings content directly into your prompt. You do not need to read any files to start — all context you need arrives in your task prompt.

1. Confirm the aliases and deny-list entries were provided inline in your prompt. If not, ask the parent agent.
2. Note today's date — insert it as `<YEAR>` (current year) and `<NEXT_YEAR>` (next year) in all queries.
3. If a previous findings file content was provided inline, use it for the diff section. If not, treat this as a first run and mark all programs as `new_programs`.

---

## Execution mode

**One target per execution.** If you are processing a batch of 10 companies, loop through them sequentially within your context. Write one findings file, then move to the next company. Do not blend findings across companies.

---

## Search strategy — company targets

Run all 5 passes for every company. Do not skip a pass because an earlier one returned good results.

### Pass 1 — Official early-talent surface

Goal: land on the company's canonical university / early-career / students page. This is the source of truth for everything below.

Queries:
- `"<company name>" "early talent" OR "university recruiting" OR "students" site:<careers-domain-from-companies.md>`
- `"<company name>" "early career" OR "university recruiting" 2026 2027`

If the careers URL from `companies.md` is blank, find it here. Use the official company-owned URL — not LinkedIn, not Handshake, not a third-party aggregator — as your source of truth.

### Pass 2 — Named-program lexicon

Goal: surface any program with a branded name. This lexicon is empirically how named programs appear in indexed text.

Queries:
- `"<company name>" 2026 freshman OR sophomore OR underclassman internship`
- `"<company name>" 2026 "explore" OR "thrive" OR "launch" OR "academy" OR "pathways" OR "discover" OR "ignite" OR "first year" OR "first play" OR "new grad" OR "early access" OR "launchpad" OR "jumpstart"`

Maintain this lexicon. Add terms when a new class of program name appears that this list would have missed.

### Pass 3 — Diversity / pipeline language

Goal: find programs explicitly targeting Black, Latinx, URM, first-generation, or HBCU students.

Queries:
- `"<company name>" 2026 program "Black" OR "Latinx" OR "Hispanic" OR "underrepresented" OR "diversity"`
- `"<company name>" 2026 "HBCU" OR "first generation" OR "URM" OR "minority"`

Any finding from this pass gets `audience_specific: true` in the output.

### Pass 4 — Short engagements / events

Goal: find insight days, office visits, summits, and "turn your notifications on" moments. These are the highest-value underdog finds.

Queries:
- `"<company name>" 2026 "insight day" OR "summit" OR "open house" OR "campus visit" OR "office visit" OR "early insight"`
- `"<company name>" 2026 conference OR "tech talk" OR fair "students" OR "early career"`

### Pass 5 — Status verification on everything found

Goal: confirm each program surfaced above is still alive in 2026 and has not been quietly cut, renamed, or paused.

For each program name found in Passes 1–4:
- `"<program name>" 2026 application deadline`
- `"<program name>" cancelled OR discontinued OR paused OR ended`

This pass catches Meta-University-style cuts and NVIDIA-Ignite-style 2-week windows. If a cancellation signal appears, set `2026_change_flag` to `"DEI rollback risk"`, `"paused"`, or `"cancelled — verify"` as appropriate.

---

## Hard rules — company targets

- **Always use 2026 and 2027 in queries.** Never trust cached 2023/2024 information.
- **Never list a generic SWE intern req.** The name/date/pipeline rule is the gate.
- **Disambiguate ambiguous names.** For `Apple`, use `"Apple" careers internship -fruit -juice`. For `Block`, use `"Block Inc" OR "Square" tech careers`. Use the industry tag from `companies.md` as context.
- **Never fabricate a URL.** If no official URL is found for a program, write `OFFICIAL URL NOT FOUND` and provide the best secondary source (Levels.fyi, AnitaB.org job board, Cake.me, or a verified Greenhouse listing). Mark source as secondary.
- **US-first scope.** India, EMEA, and Japan variants go in `regional_variants:` — do not surface them as primary entries for a Northeastern student.
- **Bot-blocked sites.** If the company's careers site returns no useful content (Workday, some Greenhouse installs), fall back to indexed aggregators (AnitaB.org, university-relations pages, LinkedIn university recruiting posts) and note the source as secondary.
- **Year drift guard.** If a source does not mention 2026 or 2027 anywhere, or does not include a verifiable deadline date, mark `application_window_2026: unknown` and add a note in the human-reviewer section.
- **Check aliases before writing diffs.** A program rename is not a removal + addition. Cross-reference `sources/aliases.md` before computing the diff section.

---

## Output format — company target

Write to `docs/opportunities-radar/findings/<company-slug>.md`. Overwrite the entire file. Git history is the time series.

```markdown
---
company: <display name>
slug: <slug from companies.md>
industry: <industry tag>
careers_url: <official URL found or confirmed>
last_run: <YYYY-MM-DD>
status: ACTIVE | NO_PROGRAMS_FOUND | BLOCKED
---

## Programs found

### <Program Name>
- official_url: <url or OFFICIAL URL NOT FOUND>
- program_type: early-career-program | fellowship | pre-internship | conference | insight-event
- eligibility_year: freshman | sophomore | junior+ | any-undergrad | unclear
- audience_specific: true | false
- application_window_2026: <"opens X, closes Y" | "closed for 2026" | "rolling" | "unknown">
- format: virtual | in-person | hybrid
- stipend_disclosed: <dollar amount or "not disclosed">
- region: US | India | EMEA | Japan | other
- regional_variants: <list other regional programs here, or "none">
- 2026_change_flag: <"DEI rollback risk" | "renamed from X" | "paused" | "cancelled — verify" | "no change observed">
- one_line_pitch: <one sentence on why a NEU Black/Latinx CS freshman/sophomore should care>
- sources:
  - <URL 1 used to verify>
  - <URL 2>
- last_verified: <YYYY-MM-DD>

### <Program 2 Name>
...

## Discovered events (Pass 4)

| Event | Date | URL | Eligibility |
|-------|------|-----|-------------|
| <name> | <date or "TBD"> | <url> | <e.g. "freshman, sophomore"> |

## Notes for human reviewer

- <Anything needing human judgment: "official URL changed since last run", "program page live but no 2026 deadline posted", "couldn't find program name — may have been retired", etc.>

## Diff vs last run

- new_programs: [list of program names that did not appear in the previous findings file]
- removed_programs: [list of program names in previous findings that do not appear now — check aliases.md first]
- changed_status: [list of "X: was apply-now, now closed-this-cycle"]
- url_changes: [list of "X: old URL → new URL"]
- no_change: [list of programs confirmed unchanged]
```

If `status: NO_PROGRAMS_FOUND`, still write the file with that status, a timestamp, and a note in the reviewer section. After the third consecutive `NO_PROGRAMS_FOUND` run, add a note: "Three-strike threshold reached — recommend moving to deny-list.md."

If `status: BLOCKED` (site returned no content after fallback attempts), note the specific blocker (e.g. "Workday bot protection, no indexed fallback found") and any secondary sources attempted.

---

## Execution mode — org sources

When your target is an org source (from `sources/orgs.md`) rather than a company, collapse Passes 1–5 into a single pass:

1. Fetch the public archive / news page.
2. Extract entries published since the `last_run` date in `findings/_orgs/<org-slug>.md`.
3. For each new entry, extract: title, date, URL, any eligibility or deadline language.
4. Write `findings/_orgs/<org-slug>.md` with the schema below.

### Output format — org source

Write to `docs/opportunities-radar/findings/_orgs/<org-slug>.md`.

```markdown
---
org: <display name>
slug: <slug from orgs.md>
source_url: <archive URL>
last_run: <YYYY-MM-DD>
status: FETCHED | BLOCKED | NO_NEW_ENTRIES
---

## New entries since last run

| Title | Date | URL | Eligibility / Deadline | Summary |
|-------|------|-----|------------------------|---------|
| <title> | <date> | <url> | <e.g. "sophomores, deadline March 9"> | <one sentence> |

## Diff vs last run

- new_entries: [count]
- entries_checked: [count]
- notable_flags: [anything that should go in the weekly digest]

## Notes for human reviewer

- <e.g. "Page returned 403 — verify URL in orgs.md", "New program announcement — recommend adding to companies.md">
```

---

## Edge cases — handle these explicitly

| Situation | How to handle |
|-----------|--------------|
| Company name collision (Apple, Capital One, Block) | Add `-<wrong meaning>` exclusions to the query: `"Apple" careers internship -fruit` |
| Bot blocking on careers site | Fall back to AnitaB.org, Cake.me, university-relations pages; mark source as secondary |
| Cached 2023/2024 results ranking high | Require 2026/2027 mention or a verifiable deadline; otherwise `application_window_2026: unknown` |
| Program renamed | Check `aliases.md` before writing diff; do not report as removal + addition |
| DEI rollback language softened | Note in `2026_change_flag`; do not remove program unless it is confirmed shut down |
| Two-week application window (e.g. NVIDIA Ignite) | Capture both open and close dates; flag in digest "Closing in next 30 days" if applicable |
| Program doesn't exist as described | Write `NO_PROGRAMS_FOUND`; note reason in reviewer section |
| Regional variant (Google STEP India vs NA) | Primary entry = US only; note others under `regional_variants:` |
| Three consecutive empty runs | Add note: "Three-strike threshold reached — recommend deny-list.md" |
| Generic intern req leaking in | Do not include it; the name/date/pipeline rule is the gate |

---

## After completing your batch

Return a one-paragraph summary to the parent agent covering:
- How many companies / org sources you processed
- How many programs found total
- How many `NO_PROGRAMS_FOUND` or `BLOCKED` results
- Any high-priority flags (new program opening soon, confirmed cancellation, dead link)
