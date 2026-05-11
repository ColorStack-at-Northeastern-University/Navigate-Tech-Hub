# Coding Interview Patterns and Practice Plan

You spent two hours on LeetCode last night. This morning a friend sends you a medium that looks “kind of like” something you solved last week, and your brain offers nothing. Same data structures on the syllabus, same syntax you use in projects, but the blank screen hits anyway. Most blanks come from practice design: you trained on isolated problems instead of repeatable patterns, and your memory treated each solve like a one-off performance instead of a labeled skill.

If you are juggling a full course load, club meetings, and the ambient stress of everyone posting offers, you do not need more chaos. You need a small set of patterns, a fixed session format, and a way to check whether your target roles even ask for this stuff before you rearrange your life around it.

## Confirm the screen before you optimize for it

Some internships and new-grad pipelines still lean on data structures and algorithms screens. Others lean harder on take-homes, pair programming on real codebases, or system design as you get more senior. Before you commit months to a pattern plan, spend ten minutes on employer recon: read a handful of job posts for roles you actually want, ask upperclassmen who interviewed at those companies last cycle, and ask a club mentor or TA what they saw. If your targets rarely run classic DSA rounds, you should still be able to read and reason about complexity; you should not burn like you are training for ICPC if that is not the bar you are facing.

## What you are actually training: pattern recognition, not trivia

A pattern is a move you recognize when the story in the prompt matches a shape you have seen before. “Subarray with a budget on duplicates” points different muscles than “shortest path in a grid,” even if both might show up as medium problems in the same list. Free ordered curricula like NeetCode’s roadmap and the NeetCode 150 exist so you stop drawing random problems like a slot machine. Pick one curated track, finish it with intent, then run it again on a second pass where you care more about speed and blind recall than first-time novelty. Debating whether another famous list is “better” is procrastination dressed as research. One list, done twice with a redo rule, beats three lists started once.

For underclassmen, anchor on a short menu first. You can deepen into tries, bit tricks, union-find, and fancier graph machinery after these feel boring:

- **Sliding window:** you need a contiguous segment and the brute force re-counts everything when the window moves.
- **Two pointers:** sorted array or paired walk from both ends, often to eliminate pairs or squeeze a budget.
- **Binary search:** “first index where…” or an answer space you can test with a cheap predicate.
- **Prefix sums:** range queries on static arrays, or subarray sums tied to a target.
- **Stack and monotonic stack:** nested structure, “next greater,” histogram-style compression.
- **Heaps:** “top k,” merging sorted streams, scheduling by priority.
- **Graph BFS and DFS:** layers, connected components, grids as implicit graphs; add multi-source BFS when fires start in multiple places.
- **Intervals:** merge, insert, meeting rooms style scheduling conflicts.

When you finish a problem, tag it with the pattern name in your notes, not just “done.” Forgetting an old solve is normal if you never labeled what you learned.

## One session you can copy every week

Block forty-five to ninety minutes. Same weekday if you can; consistency beats heroic weekends.

Start with a ten- to fifteen-minute warmup: re-solve something you missed last week, from memory, with tests you write yourself. Then pick one new problem at the edge of your comfort, usually medium early on. Set a timer for fifteen to twenty-five minutes and treat it like a real attempt: clarify constraints out loud if you are alone, write examples, name the brute force, then push toward something better. When the timer ends, stop flailing. Read a high-quality editorial or a tight video walkthrough, then close it and re-implement without peeking. If you cannot pass your own examples, you did not redo it; you copied it. That blind redo is the whole point.

Spend five minutes writing two lines: runtime, space, and “why this pattern applied.” Optional: narrate your redo into your phone for ten minutes like you are in a Zoom interview. Weekly, keep a short “revisit” list of misses and schedule one session that is only spaced repetition, not new topics.

## Big-O is a small gate, not a personality test

Before you chase hard problems, get comfortable ordering common costs and knowing what “extra space” usually means in interviews. NeetCode and similar guides treat this as step one for a reason: if you cannot defend why your hash map trade is worth it versus sorting first, interviewers will not trust the rest of your solution. One concrete trade students can own: paying O(n) space for O(n) or O(n log n) time on a single pass structure versus an in-place sort that changes the input and costs O(n log n) time. You are not memorizing thirty pages of calculus. You are learning which family you used and what you gave up to get there.

## How to behave when someone is watching

Pattern knowledge is half the signal. The other half is whether you can think with someone in the room. Employer-facing prep writeups (Levels.fyi’s software engineer interview guides are one example) keep returning to the same behaviors: clarify early, think out loud, compare options, tie the final answer to time and space. Early on, ask real clarifying questions: duplicates allowed, empty inputs, size limits, whether you can mutate input, expected answer format. While you work, keep a light narration going: what you are trying, what might break, what you would test next. When you pick an approach, name one alternative and why you are not doing it right now. Before you call it done, walk edge cases and state time and space in plain language. Silence reads as stuck; repetition reads as rigor. If you need a second to think, say that and write a stub function instead of freezing.

## Pair the solo grind with something human

Solo lists work, but isolation is how good habits die quietly. If you are eligible, structured programs help because they add deadlines, mentors, and peers who expect you to show up. CodePath’s Technical Interview Prep is a free, multi-week style track that hits algorithms, core structures, Big-O, and interview behaviors with a syllabus you can follow instead of inventing one from Reddit threads. ColorStack runs community programming for Black and Latinx CS students; their public partnership work with CodeSignal also points at technical interview prep and practice assessments as part of the support stack, which is a useful reminder that practice can be social, not only a laptop in your dorm. Code2040 publishes an Applicant Playbook aimed at pipeline prep for Black and Latinx talent, which pairs well with the tactical side of this guide. None of these replace reps on problems; they make reps more likely to happen.

Karat has published material on interview access gaps for Black engineers. The practical takeaway is boring on purpose: accountable practice and repeated exposure beat waiting for confidence to show up on its own. Pick one cohort anchor if it fits your life, not five half-applications.

## A weekly shape that survives midterms

Three to five sessions a week is a sane baseline while classes are heavy. If you are plateauing on random mediums, the fix is usually a pattern gap, not “more problems” with the same vague approach. Go back to the menu, pick the weakest label, and do two easy or two mediums that only drill that shape until the trigger words start to feel obvious. CodeDay-style weekend events can be a fun on-ramp for energy and first projects; they do not replace a deliberate problem track if your targets run LeetCode-style screens. Keep the lanes separate so you do not confuse enthusiasm with readiness.

Volume arguments online get loud. Many prep guides land in the ballpark of dozens to low hundreds of well-chosen problems with revisits beating hundreds of shallow one-and-dones. Treat that as a compass, not a superstition about exact counts.

## Twenty-four hours from now

Pick one curated list and block three calendar sessions for this week. In the first session, run the full loop on a single problem: timed attempt, editorial, blind redo, pattern tag, complexity lines. If a structured program fits, start one application or RSVP to one workshop so the accountability exists outside your head. [FACT CHECK: add any Northeastern-specific club pipelines or employer lists the editors want linked once verified.]
