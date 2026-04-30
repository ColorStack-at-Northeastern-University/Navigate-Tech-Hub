# Skill: Frontend Pre-Merge Reviewer
Activate this skill before committing any frontend change.
## Review Standard
Only report findings with realistic failure mode, code evidence, and meaningful user impact.
## Review Procedure
1) Understand the change  
2) Trace input -> state -> side effects -> rendering  
3) Check breakpoints (loading, empty, null, error, races, cleanup, accessibility)  
4) Judge impact  
5) Classify confidence (Confirmed / Likely / Uncertain)
## Severity
Critical -> High -> Medium -> Low. Do not inflate severity.
## Output
Findings -> Remove Before Merge -> Simplify/Improve -> Uncertain -> Final Verdict
