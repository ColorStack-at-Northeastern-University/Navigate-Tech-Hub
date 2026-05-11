---
slug: coding-interview-patterns
title: Coding Interview Patterns and Practice Plan
category: interview-prep
audienceStage: underclassmen
outcome: Apply core problem patterns and a repeatable prep routine.
timeToReadMinutes: 6
contentVolatility: medium
batch: 2
draftStatus: phase-c
---

# Coding Interview Patterns and Practice Plan

You can put serious hours into practice and still draw a blank when the prompt is a cousin of something you “already solved.” That feeling is usually a systems problem. Random problem roulette trains your fingers, not your recognition. Interviewers keep pulling from the same dozen-ish ideas: sliding windows, two pointers, “turn this into a graph walk,” hash maps that trade memory for speed. Your job is to train those shapes on purpose, then repeat them until redoing a problem cold is boring, not heroic.

## Confirm the screen before you optimize for it

Some internships and new-grad pipelines still lean on data structures and algorithms screens. Others lean harder on take-homes, pair programming on real codebases, or system design as you get more senior. Before you commit months to a pattern plan, spend ten minutes on employer recon: read a handful of job posts for roles you actually want, ask upperclassmen who interviewed at those companies last cycle, and ask a club mentor or TA what they saw. If your targets rarely run classic DSA rounds, you should still be able to read and reason about complexity; you should not burn like you are training for ICPC if that is not the bar you are facing.

## A pattern map you can memorize

A pattern is a trigger plus a move. When you see “longest substring with at most k distinct characters,” that is sliding window energy. When the input is sorted and you can throw away half the search space each step, that is binary search. When you need the cheapest “next step” repeatedly, a heap often shows up. You do not need every advanced topic on day one. Start with a tight set, learn the cue phrases, then widen.

For underclassmen, anchor on a short menu first. You can deepen into tries, bit tricks, union-find, and fancier graph machinery after these feel boring:

- **Sliding window:** you need a contiguous segment and the brute force re-counts everything when the window moves.
- **Two pointers:** sorted array or paired walk from both ends, often to eliminate pairs or squeeze a budget.
- **Binary search:** “first index where…” or an answer space you can test with a cheap predicate.
- **Prefix sums:** range queries on static arrays, or subarray sums tied to a target.
- **Stack and monotonic stack:** nested structure, “next greater,” histogram-style compression.
- **Heaps:** “top k,” merging sorted streams, scheduling by priority.
- **Graph BFS and DFS:** layers, connected components, grids as implicit graphs; add multi-source BFS when fires start in multiple places.
- **Intervals:** merge, insert, meeting-rooms-style scheduling conflicts.

Hash maps and frequency counts still belong in your head as the default when you need O(1) lookups, complements, or character counts; they sit underneath half of the bullets above. When you finish a problem, tag it with the pattern name in your notes, not just “done.” Forgetting an old solve is normal if you never labeled what you learned.

Pick one ordered curriculum and stay on it. NeetCode’s roadmap and [NeetCode 150](https://neetcode.io/practice) are free paths with a sane topic order and video walkthroughs; the site’s own prep write-up lays out Big-O first, then fundamentals, then patterns ([How to Prepare for Coding Interviews](https://blog.neetcode.io/p/prepare-coding-interviews)). A paid tier exists for extras like interactive courses, but the list plus videos is enough to run the system described here ([pricing](https://neetcode.io/pricing)). “Pick one curated list and finish it twice” beats debating brand names.

## One session you can repeat

Block forty-five to ninety minutes. Start with a five- to fifteen-minute warmup: re-solve something you missed last week, from memory, with tests you write yourself. Then pick one new medium from your list. Set a timer for fifteen to twenty-five minutes and treat it like the real room: restate the problem, name two edge cases, then code. When the timer ends, stop performing and switch to learning. Read the editorial or watch a solution, then re-implement from a blank file without looking. Close the tab by writing three lines in your notes: pattern tag, time complexity, space complexity, and one sentence on why that pattern fit.

Once a week, schedule a spaced revisit: only problems you got wrong or forgot. Volume matters less than honest redos. Eighty to one hundred fifty well-chosen problems with spaced repetition beats five hundred shallow one-offs. The forgetting curve is not a moral failure; it is a scheduling problem.

## Big-O you can defend in one breath

You are not auditioning to recite a textbook. You are showing you can reason about cost. Know the relative ordering: constant, log n, linear, n log n, quadratic, exponential. When you pick a hash map over sorting, say what you bought and what you paid: faster expected lookup, extra memory. When you sort first to enable two pointers, say you traded an n log n setup for simpler scanning. One concrete trade to own: paying O(n) space for O(n) or O(n log n) time on a single-pass structure versus an in-place sort that changes the input and costs O(n log n) time. NeetCode’s sequencing treats this as step one for a reason; do not skip it to chase hards you cannot analyze.

## What to say while you code

Pattern knowledge alone will not carry the interview. You also need to sound like someone people want on a team. Levels.fyi’s software engineer interview guide pushes behaviors that interviewers actually score: ask clarifying questions early, keep a running narration, call out trade-offs, and tie your final answer back to time and space ([guide](https://www.levels.fyi/blog/interview-guides/software-engineer.html)). Clarifying questions should change your plan. “Can the input be empty?” matters. “Can I mutate the array?” matters. Repeating the prompt to buy time does not.

Practice the boring parts out loud. Ten minutes a week of verbal walk-through on a problem you already solved still counts; optional: narrate a blind redo into your phone like you are on a Zoom screen. Gayle Laakmann McDowell’s *Cracking the Coding Interview* shows up in that same prep ecosystem as an optional book if you like paper references; it is not a requirement to start.

## Add a second track beside solo grinding

Solo sessions are necessary. They are also easy to quit when no one checks your calendar. Layer in structure where you qualify for it. CodePath’s [Technical Interview Prep](https://www.codepath.org/courses/tech-interview-prep) is a free, syllabus-driven track with peers and industry mentors, built for students who want a class-shaped rhythm instead of only YouTube and willpower. ColorStack runs national programming for Black and Latinx CS students; CodeSignal and ColorStack’s [public partnership](https://codesignal.com/newsroom/press-releases/codesignal-and-colorstack-announce-new-partnership-to-increase-the-number-of-black-and-latinx-developers-in-tech) points to mentorship, technical prep activities, and practice assessments for members. If you are at Northeastern, the chapter page is a concrete starting point: [ColorStack at Northeastern University](https://www.colorstack.org/chapters/northeastern-university). CODE2040’s [Applicant Playbook](https://playbook.code2040.org/) frames internship prep timelines without pretending the pipeline is colorblind. Karat’s writing on interview access for Black engineers makes a simple case: structured practice and real reps matter when informal networks are thinner. Use that as motivation to book mocks and cohorts, not as anxiety fuel.

CodeDay-style weekend events can spark interest and early projects. They do not replace a deliberate pattern plan. Treat them as on-ramp energy, not proof you are “done” with DSA.

## Weekly shape and when to change tactics

Aim for three to five real sessions per week if you are carrying a normal course load. Two of those can be shorter maintenance blocks; one should be the full loop with blind redo. If you plateau, the fix is rarely “more random problems.” It is usually a pattern gap (you keep missing graph modeling), a complexity gap (you code but cannot justify cost), or a communication gap (you solve in silence and panic on narration). Name which one it is, then adjust for a week.

The mistake that wastes the most semesters is treating problem count as progress. Tags, blind redos, and calendar blocks beat a streak icon. Volume arguments online get loud; treat “dozens to low hundreds of well-chosen problems with revisits” as a compass, not a superstition about exact counts.

## Twenty-four hours from now

Pick NeetCode 150 or another single curated list and block three sessions on your calendar for this week. In the first session, run the full loop on one medium: timed attempt, editorial, blind redo, pattern tag, complexity lines. If you match a community program’s eligibility, submit the application or join the chapter GBM this week so solo work is not your only thread. [FACT CHECK: add any Northeastern-specific club pipelines or employer lists the editors want linked once verified.]
