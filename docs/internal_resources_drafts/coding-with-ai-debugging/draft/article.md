---
slug: coding-with-ai-debugging
title: "Coding with AI: Debugging and Incident Triage"
category: projects
audienceStage: underclassmen
outcome: Apply AI-assisted debugging workflows without skipping root-cause analysis.
timeToReadMinutes: 6
contentVolatility: high
batch: 3
draftStatus: scaffold
---

# Coding with AI: Debugging and Incident Triage

## Editor meta

- Silent-read word budget: about 1,100–1,300 words.
- Voice: `.cursor/rules/navigate-writing.mdc`.
- Volatility **high**: model capabilities and tool UIs change; avoid version-specific promises without dates.

## Opening (replace with friction-led prose)

The fastest wrong fix is a confident guess that passes one test. AI is very good at sounding confident.

## Triage before prompting

- Reproduce, minimize, log location, last change, expected vs actual.

## What to paste into a model vs what to keep local

- Stack traces, snippets, configs: redact secrets first.

## Hypothesis discipline

- One change at a time, rollback plan, note what disproved the hypothesis.

## When AI hallucinates APIs or config flags

- Verify against official docs; `[FACT CHECK: product name]` when citing syntax.

## Pairing AI with classic tools

- Debugger breakpoints, network tab, binary search on commits.

## Incident writeups for learning

- Five lines: symptom, cause, fix, prevention, what you will check next time.

## Your notes / guided bullets

- Add one short anonymized debugging story with real wrong turns.
