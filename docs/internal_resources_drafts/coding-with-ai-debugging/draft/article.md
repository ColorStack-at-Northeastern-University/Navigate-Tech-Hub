---
slug: coding-with-ai-debugging
title: "Coding with AI: Debugging and Incident Triage"
category: projects
audienceStage: underclassmen
outcome: Apply AI-assisted debugging workflows without skipping root-cause analysis.
timeToReadMinutes: 6
contentVolatility: high
batch: 3
draftStatus: phase_c_style_passed
---

# Coding with AI: Debugging and Incident Triage

You paste the stack trace. The chat spits out a clean diff. You merge it, rerun, and the error changes shape: same failure class, different line number. You are now debugging two things: the original bug and the patch you did not understand.

That loop is expensive in coursework, brutal in a hackathon demo window, and embarrassing when the autograder still prints red. The fix is not "use AI less." It is to stop treating the model like it closed the ticket. Treat it like a fast intern who will happily ship plausible nonsense if you skip the boring parts: reproduction, evidence, ranked guesses, and proof that the world matches your story.

## What "incident" means on your laptop

In industry people say incident, blast radius, rollback. On your machine the same ideas show up smaller. The incident is whatever broke the promise you made to yourself or to the grader: build green, tests pass, page loads, notebook runs. Blast radius is whether one function is wrong or the whole repo stopped compiling. Rollback is git checkout of the last commit that worked, or undoing the last dependency bump.

The outcome you want is boring and good: you can explain the failure chain in plain English. Not "I asked Copilot and it worked," but "this input hit this branch, this variable was null here, so the downstream call threw." If you cannot say that yet, you are still in triage, whether or not AI is in the loop.

## The context contract

Vague prompts get confident wrong answers. Before you reach for a fix command, package a minimum bundle the way you would for a TA who only has five minutes.

Paste the exact error text, not a paraphrase. Include the smallest code path that reproduces it: file names, function names, the few lines around the throw. State expected versus actual in one sentence each. List what you already tried, even if it failed, so the model stops suggesting reruns of your afternoon. If your tool supports workspace grounding (for example Copilot Chat’s `@workspace` for multi-file context), use it so the answer is anchored in your tree instead of generic Stack Overflow paste.

GitHub’s own writeup on [debugging with GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/how-to-debug-code-with-github-copilot/) pushes **progressive debugging**: understand and analyze before you patch. Their example flow starts with explanation-style commands, then moves toward fixes. That order matters because the expensive mistake is patching before you know what broke.

## Steal narrowing from TypeScript

Here is a useful mental import from static analysis. Good TypeScript practice is mostly **narrowing**: you start with a wide type, you collect facts (checks, guards, discriminated tags), and the compiler shrinks what is possible until only the safe path remains.

Debugging is the same game with runtime facts instead of types. You start with "something is wrong," you add logs or breakpoints or a single failing test, and you shrink the hypothesis space until one story remains.

Matt Pocock’s [Total TypeScript](https://www.totaltypescript.com/) teaches that narrowing muscle with interactive material (type predicates, discriminated unions, control-flow analysis). You do not need to be a TypeScript wizard to steal the habit: ask your AI assistant to **list branches and invariants** it would check to distinguish causes, then attach cheap instrumentation that falsifies branches. Use the model to generate "if X were true, we would see Y in the log" checks before you ever ask it to rewrite the file.

## Repro, then ranked guesses, then one experiment

Stable reproduction beats clever prompting. If you cannot trigger the bug twice the same way, you are gambling. Shrink the case: smallest input, smallest route through the app, one failing test name from CI. If the model suggests repro steps, verify them on your machine. A made-up repro wastes your night.

Once you can hit the failure on command, ask for **three to five ranked hypotheses** tied to your evidence, not one oracle answer. Your job is to **disprove** guesses cheaply: one log line, one breakpoint, one config toggle, one bisect step between last green commit and head. Change one variable at a time. If you change three things and green goes back, you still do not know why.

When the bug is stateful, pair the chat with a real debugger or print trail. Academic tooling like ChatDBG (LLM commentary on top of classic debuggers) is a useful reminder: the model does its best work when it can read **actual** register and memory-shaped facts instead of guessing from static text.

## A five-line student triage

Borrow the shape of an incident note without the pager trauma.

1. **Impact.** What is broken for whom: you locally, teammates on main, the autograder, the deployed demo link.
2. **Last known good.** Last commit that passed, last deploy that worked, last notebook cell order that succeeded.
3. **Symptoms.** Exact error string, failing test name, HTTP status, first line of the stack that is *your* code.
4. **Blast radius.** One module versus whole build, one environment path versus systemic dependency mismatch.
5. **Verification plan.** What you will run after the next change: specific test command, manual click path, build target.

AI can help draft questions and timelines from your notes. You still own the facts. If the model fills in a detail you did not measure, treat it as fiction until proven.

## Tests, readability, and the autograder

If your course grades on tests, treat failing output as first-class evidence. Slash-style helpers such as `/fixTestFailure` or test-focused flows in Copilot are fine **after** you have the failure text and you understand which assertion died. The goal is not to greenwash CI. The goal is to learn which invariant you violated.

Messy code is also a debugging tax on both you and the model. Small refactors that rename variables, split functions, or isolate side effects are not procrastination if they make the failure location obvious. If neither you nor the assistant can point to the line that lies, you are not done simplifying.

## People, policy, and where AI sits

You are allowed to use external help. You were always allowed to ask friends, Discord, older siblings, or random seniors who took the class last year. Research on introductory computing courses shows that **Latinx/e/a/o students reported relying on people outside the course more than peers** in the sample studied, alongside other help-seeking patterns tied to major and background [FACT CHECK: read Ko et al., ICER 2025 methods and limitations before publish; do not imply causation beyond the paper; phrasing here tracks the authors’ comparative statement in their PDF summary]. The lesson for this guide is practical, not stereotyping: many students route questions outside the official calendar. AI is one more external channel.

Use it like you would a strong peer: great for generating hypotheses, bad as a substitute for course policy. **Check your syllabus or campus academic integrity rules** for what your school counts as acceptable assistance on debugging versus wholesale code generation. When AI is allowed, still refuse to submit work you cannot explain. If you cannot walk the TA through the fix in five minutes, you have not finished learning, you have only deferred the pop quiz to the interview.

## The mistake worth naming

Authoritative closure is the killer. The model hands you closure for free: a patch that compiles, a story that sounds technical, a variable rename that "must have" been the issue. Verification is your job. After every AI-assisted change, pause on **why** that change addressed the root cause, then rerun the same repro you started with. If the explanation does not match the trace, keep digging.

Tonight, pick one active bug. Write a repro recipe someone else could follow. Write three hypotheses ranked by likelihood against your evidence. Run one experiment that rules one hypothesis out. Only after that, invite the fix. That order is how you keep AI in the pilot’s seat with you, instead of watching it fly the plane into the next cliff.
