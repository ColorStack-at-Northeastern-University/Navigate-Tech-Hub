---
slug: coding-with-ai-foundations
title: "Coding with AI: Foundations and Workflow Setup"
category: projects
audienceStage: first-year
outcome: Use AI coding tools safely with clear task framing and verification.
timeToReadMinutes: 6
contentVolatility: high
batch: 3
draftStatus: draft
---

# Coding with AI: Foundations and Workflow Setup

You fix a red squiggle in two seconds. The autocomplete block looks confident. You merge, move on, and only later notice the import it deleted, the file it touched by accident, or the test that never actually ran. The fast path is accepting polished-looking diffs. The expensive path is explaining code you did not read, in a lab check-in, or on a whiteboard, or in code review at a co-op.

This guide is about setup: how to use AI coding tools without trading away learning, integrity, or safety. None of that is abstract. It shows up in your grade, your git history, and whether you can debug when the model is wrong.

## What you are optimizing for

Three things at once: you want speed, you want to actually learn, and you want to stay inside the rules of the assignment. At Northeastern, the handbook is explicit that cheating can include unauthorized use of aids, with artificial intelligence and chatbots listed among examples. The university also publishes a policy hub on AI systems that points to Policy 125 on the use of artificial intelligence. Your instructor still wins on specifics. A lab might allow AI for boilerplate but not for exam-style questions. Read the syllabus like it is a contract, then behave like someone who could defend every line in a PR.

Research on AI in software engineering education keeps coming back to the same pattern. When expectations are fuzzy and time pressure is high, students reach for tools in ways that later look like misconduct. The fix is not "never touch AI." It is alignment: know what the assessment is measuring, then pick tools and disclosure that match that goal.

## Task framing the model can use

Vague prompts get vague patches. Before you generate anything, write five lines you could hand to a tired TA. Spell out inputs and outputs, which files are in scope versus off limits, which constraints actually matter (language version, framework, a hard no on new dependencies if that applies), and what done means for you (tests green, the endpoint returns 200, the UI matches the mock).

Work in small steps. Add the model, then the route, then the UI wire-up. When something breaks, you know which step introduced it. Small steps keep your mental stack trace short.

If you are stuck on what the assignment is even asking, talk to a human first. A model will happily produce code for a misunderstood spec. You do not want to speed-run the wrong problem.

## Verification beats confidence

Treat generated code as a first draft. It can be plausible and wrong in the same block. Before you accept a change, read the full diff like you are reviewing someone else's PR. Scan for scope creep, stray edits, deleted imports, and anything that looks like a secret pasted into source.

Run it locally. Write tests from your own understanding of what should happen. If you only run tests the model suggested, and those tests only encode the model's assumptions, you inherit its blind spots twice.

Spot-check edge cases the happy path will not catch: empty input, weird unicode, a null you forgot to handle. Confidence from syntax highlighting is not the same as correctness.

## Types as a second reviewer

When you work in TypeScript (or any typed stack), the compiler is one of the few checks that does not care how polished the prose sounded in the chat window. AI tools are good at shapes that look right. They are still sloppy about invariants, narrowing, and the difference between "this compiles" and "this matches the domain."

If you want that check to actually help you, put effort into how types work, not into memorizing ways to make squiggles disappear. [Total TypeScript](https://www.totaltypescript.com/), Matt Pocock's curriculum, is built for exactly that gap: turning TypeScript from a wall of red lines into a tool that catches real mistakes before they ship. Use it as a companion to AI-assisted coding. Let the model draft, let the type checker argue, and when they disagree, assume the error message is pointing at something you need to understand, not something you need to hack around with `any`.

## Know where your data goes

Tooling changes fast. For anything with dollars, limits, or exact menu labels, plan to re-read the official pages before you publish a team wiki or tell a friend "this is how it works." [FACT CHECK: confirm current plan names, pricing, and in-product strings on [GitHub Copilot plans](https://github.com/features/copilot/plans), [Copilot settings](https://github.com/settings/copilot), [Cursor pricing](https://cursor.com/pricing), and [Cursor account docs](https://cursor.com/docs/account/pricing) on your publish date.]

The part that is worth internalizing now is the shape of the tradeoff, not a feature matrix copied from a random blog.

GitHub's March 25, 2026 announcement on Copilot interaction data states that, effective April 24, 2026, interaction data from Copilot Free, Pro, and Pro+ may be used for model training unless you opt out in Copilot privacy settings. Copilot Business and Enterprise are called out as not affected. The same post distinguishes content sitting in issues, discussions, and private repos "at rest" from code processed while you are actively using Copilot. If you are on a consumer tier, assume you need to read the settings page, not assume defaults.

Cursor's own privacy overview describes Privacy Mode as the control surface for zero data retention with model providers, with different training and storage implications when Privacy Mode is off. It also states that even if you bring your own API key, requests still go through Cursor's backend, and it describes codebase indexing in terms of chunks used for embeddings with plaintext not retained after the request. None of that is "nothing ever leaves your machine," so do not treat any tool as magically air-gapped without reading the current policy.

Pick a default stack for the course (Copilot-style completion inside a familiar IDE versus an AI-forward editor), then bookmark the settings pages you actually need. Your future self is the one who will forget where the opt-out lived.

## Secrets, school data, and employer code

Do not paste API keys, database URLs, student rosters, or proprietary internship repositories into tools you have not thought about. If you would not put it in a public gist, pause before you put it in a cloud-backed assistant.

Separate repos mentally: personal learning sandbox, graded coursework with whatever disclosure your syllabus requires, and anything covered by an employer NDA. Mixing those is how accidents happen.

## The mistake to avoid

The failure mode is accepting a multi-file change set because it looks finished. Pretty diffs are dangerous when you skip the run step. Git still saves you, but only if you commit in slices you can bisect, describe what changed in the message, and note when AI touched the patch if your team or course asks for process-oriented attribution.

Tonight, pick one assignment. Write the five-line prompt with explicit scope and a definition of done. Generate at most one small change set. Read the diff end to end. Run your tests or a tight manual checklist. If your syllabus wants a line about tool use, add one that matches what you actually did, not a generic disclaimer.
