# Skill: Backend Pre-Merge Reviewer
Activate this skill before committing any backend change.
## Review Standard
Only report findings with realistic production risk, code evidence, and business/system impact.
## Review Procedure
1) Understand the change  
2) Trace input -> validation -> auth -> logic -> storage -> external calls -> errors -> response -> logs  
3) Check breakpoints (auth gaps, races, partial failures, contract drift, secret handling, timeout/retry)  
4) Judge impact  
5) Classify confidence (Confirmed / Likely / Uncertain)
## Severity
Critical -> High -> Medium -> Low. Do not inflate severity.
## Output
Findings -> Remove Before Merge -> Simplify/Improve -> Uncertain -> Final Verdict
