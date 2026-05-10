# Opportunity Radar — Deny List
# Format: <slug> | <display name> | <reason> | <date-added> | <review-date>
#
# Companies and programs here are explicitly skipped by the runner.
# A company goes on this list when:
#   (a) Three consecutive weekly runs return NO_PROGRAMS_FOUND, OR
#   (b) The company is structurally ineligible (HBCU-only, US-citizenship-required for all programs, etc.), OR
#   (c) The careers site consistently blocks the agent (rate limiting, bot protection with no fallback).
#
# Review entries annually — programs relaunch, companies change hiring strategy.

# ─────────────────────────────────────────────────────────────
# PERMANENTLY EXCLUDED PROGRAMS (not companies — specific programs)
# ─────────────────────────────────────────────────────────────

meta-university      | Meta University Program               | Shut down Jan 2026 (DEI cut)                                  | 2026-05-10 | n/a
code2040-fellows     | CODE2040 Fellows Program              | Final cohort ended July 2026 per primary source               | 2026-05-10 | n/a
amazon-leap-swe      | Amazon LEAP (SWE program)             | Does not exist as a SWE program; conflated with Amazon Future Engineer | 2026-05-10 | n/a
oracle-sophomore     | Oracle Sophomore SWE Internship       | No such tier exists; Oracle expects rising junior minimum      | 2026-05-10 | n/a
hack-diversity       | Hack.Diversity (org source)           | Organization shut down Aug 2025; remove from org radar queue   | 2026-05-10 | n/a

# ─────────────────────────────────────────────────────────────
# COMPANIES EXCLUDED (structural ineligibility)
# ─────────────────────────────────────────────────────────────

# snap-socal         | Snap Engineering Academy              | SoCal-only, not accessible to Northeastern students           | TBD         | TBD
# blackrock-cuny     | BlackRock Sophomore Internship        | CUNY-only pipeline                                            | TBD         | TBD

# ─────────────────────────────────────────────────────────────
# COMPANIES EXCLUDED (three empty runs)
# None yet — add here after three consecutive NO_PROGRAMS_FOUND runs
# ─────────────────────────────────────────────────────────────

# ─────────────────────────────────────────────────────────────
# HOW TO ADD A COMPANY TO THIS LIST
# ─────────────────────────────────────────────────────────────
# After a third empty run, the digest will include a "Three-strike removals proposed" section.
# Reviewer confirms the removal, then adds a row here.
# The runner skips any slug that appears in this file's first column.
