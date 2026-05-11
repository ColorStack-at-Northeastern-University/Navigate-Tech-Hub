---
slug: coding-with-ai-code-review
title: "Coding with AI: Review Standards and Guardrails"
category: projects
audienceStage: underclassmen
outcome: Enforce quality, security, and correctness in AI-assisted code review loops.
timeToReadMinutes: 6
contentVolatility: high
batch: 3
draftStatus: full-draft
---

# Coding with AI: Review Standards and Guardrails

You read the diff once, the names looked familiar, and the happy path worked on your laptop. Two days later the TA’s autograder fails, your teammate finds a silent auth bug, or Dependabot flags a dependency you do not remember adding. The patch was plausible. That was the problem.

AI-assisted review is not a softer version of normal review. It is the same job with a faster way to produce wrong answers. Your name is still on the merge. The fix is a boring order of operations, a short security pass, and a few habits that keep you from outsourcing judgment to something that optimizes for local coherence.

## Run the gates before you argue about style

GitHub’s guidance on [reviewing AI-generated code](https://docs.github.com/en/copilot/tutorials/review-ai-generated-code) lines up with what senior engineers do in practice: let machines catch machine-scale mistakes first, then spend human time on intent and risk.

That means, in order: build and tests, linters and formatters, static analysis and secret scanning if your repo has them, and dependency alerts (Dependabot-style) before you deep-read line comments. If the assistant “fixed” CI by deleting tests or loosening assertions, that diff should never get a thoughtful prose review. It should get rejected until the tests tell the truth again.

Automation is not a personality. It is a filter. When the filter is green, you are allowed to ask harder questions. When it is red, you are not allowed to merge because the prose explanation sounds smart.

## Intent, context, and the right problem

The second pass is whether the change solves the assignment, the ticket, or the bug you actually have. Read the README, skim the prior PR, check the issue number. If the model had stale context (wrong branch, old API surface, a file that looked authoritative but was wrong), you can get a perfect implementation of the wrong thing.

This is where short PRs earn their keep. A five-hundred-line “while we are here” PR is where intent drifts hide. A tight diff with a clear description gives you one question to answer: does this match what we agreed to build?

## Security and correctness without the theatrics

Third pass: authn and authz, any path that touches user input, file paths, SQL, redirects, and logging. Pattern scanners catch a lot of low-hanging fruit (injection shapes, obvious secret formats). They will not save you from business-logic holes: “user A can read user B’s row because we checked the wrong field.” That still needs you to trace the flow like you are trying to break your own app.

For TypeScript-heavy coursework and side projects, correctness often sits in the type layer. Assistants sometimes “resolve” errors by widening to `any`, adding non-null assertions, or casting through `unknown`. The editor goes quiet. The runtime does not. Treat every type change in an AI patch like a behavior change: ask what state was ruled out before and what garbage is allowed now. Matt Pocock’s [Total TypeScript](https://www.totaltypescript.com/) is worth your time here because it trains the reflex the model will not give you: read the compiler as a reviewer, narrow types on purpose, and stop mistaking “no squiggles” for “true.” In an AI review loop, that gap is where subtle bugs live.

## Dependencies are part of the threat model

Fourth pass: anything that touches `package.json`, lockfiles, or new imports. Verify the package exists, is maintained enough for your bar, and matches the license posture of the project. Typosquatting and “slopsquatting” (names that almost look right) show up in vendor guidance for a reason. Students often paste `npm install` suggestions without reading what landed. If you cannot explain why each new dependency is there, revert it until you can.

## The AI-specific footguns (keep this list nearby)

Hallucinated APIs and config keys that look real. Happy-path logic with no error handling. Requirements quietly rewritten to whatever was easier to generate. Tests edited to pass instead of asserting the right behavior.

When you use a model inside review, ask it to explain deletions, list edge cases, and restate the problem in one sentence before it praises the patch. GitHub’s tutorial includes prompt patterns aimed exactly at those failure modes; steal them instead of improvising.

## Course integrity and “unsafe” prompts

Research on LLM guardrails in CS education (for example Raihan et al., [CodeGuard](https://arxiv.org/abs/2602.02509), “CodeGuard: Improving LLM Guardrails in CS Education”) separates prompts that are irrelevant, educationally relevant and safe, and educationally relevant but unsafe (think: requests for full graded solutions, exfiltration, or destructive code). The authors report strong classifier performance on their benchmark and substantial reductions in harmful or policy-violating completions in their experiments without hurting legitimate educational use. Your takeaway is simpler: “the model answered” does not mean “my syllabus allows this.” Course tool policies and integrity rules are binding. If you would not paste a question into Discord and expect cover, do not treat an IDE assistant as a loophole.

## Solo projects, team PRs, and when to pull someone in

On a solo branch, you are still doing code review. Leave comments on your own PR, or use a checklist in the description. On a team, pair on anything touching money, PII, or auth. If the repo has a `CONTRIBUTING.md`, treat it as part of the contract: naming, test expectations, and how AI assistance is expected to be disclosed. If your class publishes an assistant policy, follow that before you optimize for speed.

When maintainers exist (open source, lab infrastructure, a club app with owners), escalate early if you are unsure about security impact. A ten-minute question beats a weekend incident.

## Tooling without magical thinking

Assistants are useful for consistency: naming drift, missing docstrings, “did we handle the error path here?” They are not a replacement for running the build, reading the dependency diff, or thinking about abuse cases. Product names, default privacy settings, and training opt-outs change. If you cite a specific capability or incident, trace it to vendor documentation or a primary advisory at publish time instead of recycling a viral thread. [FACT CHECK: revisit current GitHub Copilot privacy and enterprise policy pages before ship if you quote retention or training details.]

## Tonight, on one real branch

Pick one AI-touched PR or assignment branch and run this triplet: full automated gate, dependency diff review, three review prompts borrowed from GitHub’s doc (edge cases, explain every deletion, restate the problem the patch claims to solve). If anything in that trio feels embarrassing, fix that before you ask anyone else for a stamp.
