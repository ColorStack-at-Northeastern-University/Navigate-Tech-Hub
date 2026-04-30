---
name: debugging-systematic
description: Activate when diagnosing non-trivial bugs — especially silent failures, status stuck in wrong state, data not persisting, or issues that survive a code change. Enforces a structured hypothesis-first debugging process before any code is written.
---
# Systematic Debugging
## Step 1 — State the observable symptom precisely
One sentence: exactly what the user sees vs what they expect.
## Step 2 — List confirmed facts vs assumptions
Separate known from assumed.
## Step 3 — Trace the data flow from entry to failure point
- Find last confirmed good state
- Find first confirmed bad state
- The bug is between those points
## Step 4 — Form a minimal hypothesis list
No more than 3 hypotheses ranked by likelihood; each must be falsifiable.
## Step 5 — Confirm before fixing
Use logs/evidence to confirm the hypothesis before changing logic.
## Step 6 — Fix root cause, not symptom
