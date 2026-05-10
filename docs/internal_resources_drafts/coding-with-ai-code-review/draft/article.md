---
slug: coding-with-ai-code-review
title: "Coding with AI: Review Standards and Guardrails"
category: projects
audienceStage: underclassmen
outcome: Enforce quality, security, and correctness in AI-assisted code review loops.
timeToReadMinutes: 6
contentVolatility: high
batch: 3
draftStatus: scaffold
---

# Coding with AI: Review Standards and Guardrails

## Editor meta

- Silent-read word budget: about 1,100–1,300 words.
- Voice: `.cursor/rules/navigate-writing.mdc`.
- Volatility **high**: security expectations and tooling evolve.

## Opening (replace with friction-led prose)

AI-written patches still carry your name in git blame. Review them like you would a junior you care about, not like spell check output.

## Review checklist (enumerable on purpose)

1. Correctness against requirements and tests.
2. Edge cases and failure modes.
3. Secrets, authz, and input validation.
4. Performance footguns at your scale.
5. Readability for the next human.

## Where AI review helps vs hurts

- Good at style nits and fuzzy search across files.
- Bad at business logic truth without your tests.

## Security red flags in generated code

- SQL string concat, unsafe file paths, permissive CORS, logging PII.

## Ownership and accountability

- Merge only when you can explain each hunk in your own words.

## Team norms

- PR size limits, required reviewers, when to ban certain auto-fix passes.

## Your notes / guided bullets

- Align with your org’s real CONTRIBUTING.md when you have one; `[FACT CHECK: internal policy]`.
