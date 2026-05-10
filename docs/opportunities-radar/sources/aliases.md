# Opportunity Radar — Program Aliases
# Format: <old-program-name> | <new-program-name> | <company-slug> | <date-confirmed> | <notes>
#
# The skill checks this file before reporting a program as "removed."
# If the old name appears in the previous findings file and the new name
# appears in the current run, it is recorded as a rename — not a removal + addition.
#
# Keep entries even after they stabilize. They prevent false positives on future runs
# if a source re-surfaces old terminology.

# ─────────────────────────────────────────────────────────────
# CONFIRMED RENAMES (verified May 2026)
# ─────────────────────────────────────────────────────────────

Jane Street SEEDS                    | Jane Street JSIP                    | jane-street       | 2026-05-10 | SEEDS (Summer Engineering Experience for Diverse Students) appears to be superseded by JSIP on janestreet.com/join-jane-street/programs/
Meta University                      | CANCELLED                           | meta              | 2026-01-10 | DEI cut; final class accepted before wind-down per internal memo
Google STEP                          | Google STEP (still active)          | google            | 2026-05-10 | User initially believed cancelled; confirmed active for NA/India/EMEA/Japan in 2026
Amazon Future Engineer LEAP          | Amazon Future Engineer (AFE)        | amazon            | 2026-05-10 | "LEAP" branding not used for SWE program; AFE is the correct name (requires HS-senior scholarship win)
Oracle Sophomore SWE Internship      | DOES NOT EXIST                      | oracle            | 2026-05-10 | Oracle does not run a sophomore-tier program; standard undergrad intern expects rising junior minimum
CODE2040 Fellows Program             | SHUT DOWN                           | -                 | 2026-07-01 | Final program ended July 2026 per code2040.org; remove any catalog entries

# ─────────────────────────────────────────────────────────────
# UNCERTAIN / MONITOR (not yet confirmed in 2026)
# ─────────────────────────────────────────────────────────────

Netflix x Formation Fellowship       | Netflix x Formation (PAUSED?)       | netflix           | 2026-05-10 | No 2026 cohort announced; 2025 cycle closed Mar 7 2025; treat as paused until Formation announces
Apple Pathways Academy               | Apple Pathways Academy (AT RISK)    | apple             | 2026-05-10 | No 2026 cohort surfaced; REJI program; verify with Huston-Tillotson (cait@htu.edu)

# ─────────────────────────────────────────────────────────────
# HOW TO ADD A NEW ALIAS
# ─────────────────────────────────────────────────────────────
# 1. When a run's diff section shows a program "removed" that you know was just renamed,
#    add a row here with the old name, new name, company slug, today's date, and a brief note.
# 2. On the next run, the skill will suppress the false-positive removal.
# 3. Set a quarterly reminder to archive entries older than 2 years.
