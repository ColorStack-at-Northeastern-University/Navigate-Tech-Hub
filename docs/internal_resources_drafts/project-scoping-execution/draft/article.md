---
slug: project-scoping-execution
title: Project Scoping and Execution in 6 Weeks
category: projects
audienceStage: underclassmen
outcome: Ship scoped projects on schedule using milestone planning.
timeToReadMinutes: 5
contentVolatility: medium
batch: 2
draftStatus: phase_c
---

# Project Scoping and Execution in 6 Weeks

You pick a six-week window in September and tell yourself this is the semester you finally ship the project. By week three you are still renaming folders. By week five you have a beautiful settings screen and no working path from signup to the one thing the project was supposed to do. Drive is rarely the real bottleneck. The calendar stayed soft while the feature list stayed sacred.

Practitioner delivery is boring on purpose: you lock the timebox first, then you shrink scope until the plan is honest. That discipline works the same for a club build, a hackathon, a course final, or a portfolio piece you want to show at a career fair. Skip the ceremony: keep a written ship definition, a milestone spine, and a few triage rules for when school eats your week.

## Week 0: lock the calendar, then write the ship

Before you sort features, put the last day of the cycle on a calendar in plain language. Not “late October.” The actual date of your demo, submission, sponsor review, or whatever external wall you are building toward. Scope is the variable. The date is not.

Write one sentence that answers: what does “shipped” mean for this project? Observable language only. Someone should be able to watch you demo for two minutes and check each clause. Under that sentence, list three to five **non-goals**: things you are explicitly not building this cycle. Non-goals are how you stop late-night scope creep. They belong in the README or a short doc at the repo root so you cannot pretend you never agreed to them.

If you are on a team of two to four, pick one person who owns scope calls for the six weeks. Everyone can still build. You just cannot run every “should we add…” question as a group chat vote at midnight. Merge conflicts and deploys need owners too. Keep rituals small: one short sync per week and a shared board beats a standing meeting that exists because Slack feels empty.

## The six-week spine: every week ships something you can show

Think in demoable checkpoints, not vibes.

**Week 1** is a runnable skeleton plus a manual demo path, even if it is ugly. If you can, get something live early: a deployed stub, a published CLI, a landing page with one real action. Early deploy surfaces the annoying parts (env vars, DNS, permissions) while you still have slack.

**Weeks 2–3** own the core user loop. This is the narrow path a real user would repeat. If the loop is not working by the end of week three, you are already in trouble. Say that out loud in your doc so nobody spends week four on “nice to have” animations.

**Week 4** is for the riskiest integration: the API that might rate-limit you, the model call that might be slow, the hardware handoff that might simply not work. Practitioners sequence risk early because surprises cost more when the deadline is visible. If week four slips, you do not borrow from week six and hope. You cut.

**Week 5** is hardening: bugs, edge cases, a thin layer of tests where they buy you confidence, error messages that do not lie. This is not the week to start a second workflow.

**Week 6** is ship week: README with setup steps, a public demo link or recording, and a short retrospective note with three bullets you can reuse in interviews (“what broke,” “what we cut,” “what we learned”). That note is part of the deliverable. It is how you turn execution into a story without sounding like you memorized a textbook.

Treat org-hosted builds, club demos, and compressed hackathon-style windows the same way you treat a product date. The demo is fixed. The feature list shrinks.

## MoSCoW for solo builders (without fooling yourself)

Must / Should / Could / Won’t still works when it is just you, as long as you apply two honesty tests before anything earns **Must**.

**Workaround test:** if a user could limp through launch without it, it is not a Must. **Cancellation test:** if removing it would make you cancel the whole ship, it stays a Must. Everything else fights for Should or Could.

Solo builders inflate Must by default. Cap Must work at roughly sixty percent of the capacity you actually have after classes, jobs, and life. That is not a magic number from a survey you should quote in a slide deck. It is a guardrail so slippage has somewhere to land without nuking the core path. Park everything else on a v2 list you do not open until v1 is out the door.

Write a **Won’t (this cycle)** list next to your non-goals. “Won’t” is the category people skip, then watch features creep back in as “small asks.” If it is not in scope, name it.

When the schedule slips anyway, defend correctness on the core path first. Cut secondary workflows before you cut the main journey. Cut polish before you cut reliability on the path you plan to demo. Near the finish line, laziness is rare. Perfectionism at eighty percent is common, often while the through-line is still imaginary.

## Execution mechanics that survive a real semester

Define done before you write a lot of code. Then cut the MVP twice: once after your first serious pass at the plan, once after you see the real integration cost. If you are estimating in hours, add buffer for context switching. School weeks are not factory shifts.

Work in timeboxed blocks instead of “grind this weekend.” A weekend without a concrete stop condition turns into twelve hours of refactoring that did not move the demo.

Keep one active project if you can. Split attention across three “almost ships” and you will carry open loops in your head all semester. Finishing is partly memory management.

## What “done” looks like for recruiting

Recruiters need evidence: a stranger reproducing your happy path from the README, a stable link or artifact, and plain-language tradeoffs when someone asks what you would do differently. “Basically works on your machine” does not get you there.

Your minimum recruiting pack: deployed or otherwise accessible build, README with honest setup, short demo (video or gif is fine), and those retrospective bullets. That package turns a project from a folder on your laptop into evidence that you can scope, cut, and finish under real constraints.

## In the next 24 hours

1. Put your end-of-week-six date (or your real demo date) on a calendar you actually look at.
2. Write the one-sentence ship and three non-goals. Paste them at the top of the README.
3. Schedule week one’s milestone: runnable path plus deploy or deploy stub, with a name attached to merge and deploy if you are not solo.
