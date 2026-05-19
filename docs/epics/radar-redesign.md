# Epic: Opportunity Radar Redesign

**Status:** Deferred — design pending  
**Depends on:** Phase A two-tier external resources (complete)

---

## Goal

Redesign the Opportunity Radar pipeline around **verification-first** rather than discovery. The radar should confirm that known Tier 2 programs are still live (URL resolves, program page updated this cycle) — not batch-insert new programs.

## Scope decision

- Trim sources to 30–50 known programs (Tier 2 entries in Strapi).
- Output: verification digest + "retire" list (entries whose program page has gone stale or 404'd).
- No bulk insert without manual Tier tagging first.

## What changes in the skill / runbook

- Rewrite `.cursor/skills/opportunity-radar/SKILL.md` to reflect verification-not-discovery workflow.
- Trim `docs/opportunities-radar/companies.md` to match the Tier 2 Strapi catalog.
- Multi-subagent fan-out stays, but each agent checks an existing URL, not cold-searches.
- Outputs a structured markdown report, not a Strapi insert script.

## Dependency on Tier 2

Radar verification targets are `external-resource` entries where `directoryTier === 'recurring-program'`.
The `seasonalNote` field is the editorial output of a successful verification run:
"Typically opens in October — verified May 2026."

## Not in scope for this epic

- Agentic Strapi writes (still a human-gated editorial step).
- New program discovery / cold outreach.
- Deadline tracking or `applicationStatus` (removed from schema).

---

_Created as part of the External Resources Product Pivot. Implementation starts when Tier 2 catalog in Strapi is stable._
