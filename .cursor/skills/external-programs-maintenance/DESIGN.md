# External Programs Maintenance — design (not implemented)

Status: **ideation only**. Build `SKILL.md` + `references/` after this is approved.

---

## Product framing (ux-product)

### Who

- **Maintainer (you / chapter):** keeps radar trustworthy without weekly manual drudgery.
- **Student (reader):** NEU Black/Latinx CS frosh–soph browsing **External Resources** and program-type buckets — wants “what opens when” and working links, not a graveyard of 2024 insight pages.

### Job to be done

> “When recruiting season shifts, I need the hub to reflect **what’s actually open or coming soon**, and I need broken program URLs fixed before students waste applications.”

### Primary action on the surface

**Open the right program at the right time** — not “browse 200 static links.”

### Anti-goals (staleness)

| Failure mode | Why it hurts |
| ------------ | ------------ |
| Dead insight URLs | Trust collapse; students blame Navigate |
| “Open” with no dates | False urgency |
| Generic careers home as program link | GENERIC link check noise; useless CTA |
| Radar findings never seeded | Research rots in `findings/` |
| Strapi fields empty | `programCycle.ts` can’t show seasonal honesty |

### Trust / uncertainty UX (product)

Students should see:

- **Typical open season** (from Strapi / `typicalOpenSeason`)
- **Seasonal note** when curator has fresher intel (“2026 apps expected Sept”)
- **Last verified** (optional future field) or implicit via maintainer report

Skill output must flag **unverified** vs **confirmed this run**.

---

## System map

```
docs/opportunities-radar/findings/*.md     ← opportunity-radar (per company)
scripts/verify-external-urls.mjs           ← link health
scripts/enrich-recurring-programs.mjs      ← seasonal metadata
docs/opportunities-radar/scripts/seed-programs.mjs → Strapi external-resource
frontend/lib/programCycle.ts               ← UI season + reminders
frontend/app/external-resources/page.tsx
```

Existing **opportunity-radar** = research writer (one target).  
This skill = **maintainer orchestrator** (batch, verify, seed, report).

---

## Modes (user intake)

```text
maintain external programs
mode: link-sweep | seasonal-refresh | ingest-findings | full-quarterly
scope: all | tier-1 | file:docs/.../findings/acme.md
```

| Mode | When | Outcome |
| ---- | ---- | ------- |
| `link-sweep` | Monthly | JSON report; fix or flag Strapi URLs |
| `seasonal-refresh` | Before fall / spring recruiting | Update `seasonalNote`, `typicalOpenSeason`; UI callouts |
| `ingest-findings` | After radar batch | Seed new programs from findings markdown |
| `full-quarterly` | All of the above + priority tier review |

---

## Sub-agent architecture (required in SKILL)

**Parent agent** (orchestrator):

- Parses mode + scope
- Never runs 50 web searches inline
- Fans out **Task** sub-agents with **readonly** where appropriate

| Sub-agent | `subagent_type` | Assignment | Writes |
| --------- | --------------- | ---------- | ------ |
| Radar worker | `generalPurpose` | ONE company per task; inline aliases + deny-list; use **opportunity-radar** skill body | `findings/{company}.md` |
| Link verifier | `shell` or `generalPurpose` | Run `verify-external-urls.mjs` subset | report JSON only |
| Seed reviewer | `generalPurpose` | Map findings → seed-programs field checklist | proposed Strapi diff / dry-run |

**Rules for children:**

1. Absolute paths in prompt; no repo-wide Glob on OneDrive.
2. One company per radar child — same as opportunity-radar.
3. Children **do not** call Strapi write APIs unless parent explicitly passes `APPLY=1`.
4. Parent merges findings diffs and presents **one** maintainer report.

**Concurrency:** max 3–5 radar children parallel; link-sweep serial on Strapi.

---

## Freshness model (avoid stale product)

### Tiering

| Tier | Criteria | Refresh cadence |
| ---- | -------- | --------------- |
| T1 | Homepage / ColorStack-adjacent / high-traffic guides link here | Monthly link-sweep + seasonal |
| T2 | Named programs in radar | Quarterly radar re-run |
| T3 | Long-tail external links | Link-sweep only on failure |

### “Alive” signals (research)

- Page mentions `<YEAR>` application dates
- Program name still on careers site (search hint from `deriveProgramSearchHint`)
- Not redirected to generic `/careers`

### Deprecation

If FAIL + no replacement: set Strapi `publishedAt` null or `directoryTier` downgrade — **parent confirms with user**.

---

## Deliverable report template

```text
## External programs maintenance — {mode} — {date}

Link sweep: {ok}/{fail}/{generic}
Seasonal updates: N fields changed
Findings ingested: M new programs (list)
Radar scheduled: [companies]

Student-facing impact:
- Programs likely open this month: …
- Removed/hidden: …

Blockers (need human): …
```

---

## References to create when building SKILL

- `references/intake.md` — paste formats
- `references/link-sweep.md` — verify script + GENERIC policy
- `references/seasonal-refresh.md` — enrich script + programCycle alignment
- `references/ingest-findings.md` — seed-programs mapping
- `references/subagents.md` — Task prompts (copy-paste templates)

---

## Open decisions (for user)

1. Add `lastVerifiedAt` on external-resource schema?
2. Auto-hide FAIL after 2 sweeps vs manual only?
3. Tie radar batch list to `docs/program-opening-windows.md`?
