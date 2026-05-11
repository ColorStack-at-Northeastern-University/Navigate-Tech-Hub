---
slug: ai-fundamentals-roadmap
title: AI Fundamentals Roadmap for Non-Specialists
category: classes
audienceStage: underclassmen
outcome: Understand AI prerequisite concepts and choose the right next courses.
timeToReadMinutes: 5
contentVolatility: medium
batch: 2
draftStatus: draft
---

# AI Fundamentals Roadmap for Non-Specialists

You open the course search tool and three different things all claim AI in the title. One is a gen-ed literacy module with almost no programming. Another is the first real machine-learning studio with waitlists. A third is a seminar that mostly reads papers on bias and policy. None of them is wrong. They are built for different end states. Sign up for the wrong one relative to your math and data-structures position and you lose a semester to prerequisites you could have stacked on purpose instead of by accident.

**What you'll leave with**

- A written **lane choice** (informed user versus builder) tied to the kinds of courses most CS programs actually run, not to brochure slogans.
- A **prerequisite checklist** you can line up against your department’s catalog and ML course descriptions before add or drop locks.
- A **single end-to-end supervised-learning slice** (one notebook, real metrics) plus a short list of **community and scholarship signals** where those apply to your goals.

## AI is a thread through the degree, not a single sticker

The ACM, IEEE-CS, and AAAI joint revision of undergraduate CS, [CS2023](https://ieeecs-media.computer.org/media/education/reports/CS2023.pdf), lists seventeen knowledge areas. Artificial intelligence is one of them, and Eaton and Epstein explain in [their AAAI-24 analysis](https://ojs.aaai.org/index.php/AAAI/article/view/30352) that AI ideas also show up across software engineering, operating systems, networking, and databases. A knowledge area is not the same as one elective. One course can cover several areas, and one area can be split across several courses. So the scatter of math, statistics, and theory requirements suddenly makes sense when you map ML depth: the department baked a standard into the catalog where AI is core, not a lone seminar you tack on at the end. Your job is to read *your* version of that map: which required line items pull AI, society and ethics, math and statistics foundations, and where the department hides the first course that expects you to train and evaluate models for a grade.

## Pick a lane: informed user or builder

Candon et al. describe a Yale course, [“Artificial Intelligence for Future Presidents,”](https://ojs.aaai.org/index.php/AAAI/article/view/35168) aimed at non-CS students who want to be “safe, effective, and informed users” of AI rather than people who implement models from scratch. The design assumes no programming or mathematics *background* for conveying the technical core. That is one lane: policy-ready vocabulary, limits of models, misuse, and institutional context without committing to the full builder stack. The other lane is the technical sequence your ML course descriptions actually gate on calculus, linear algebra, probability, data structures, and algorithms. The University of Texas documented a rapid, broad-audience [one-credit “Essentials of AI” style offering](https://par.nsf.gov/biblio/10631157-essentials-ai-life-society-ai-literacy-course-university-community) with guest lectures and literacy measures; if your school runs something similar, it can run **parallel** to major depth so you build language before you sit in a room that jumps straight to gradients. Split a sheet into two columns this week. Label them **informed user** and **builder**. Under each column, paste only course types your registrar actually lists. If you cannot name which column your spring pick belongs in, you are not ready to register for it yet.

## The prerequisite map you verify in the catalog

Student-authored ML roadmaps on blogs and forums keep repeating the same stack: Python, then NumPy, Pandas, and Matplotlib, then supervised learning with a real dataset. That pattern matches what CS2023 emphasizes for mathematical and statistical foundations when the goal is implementation, not vibes. Before the next registration window, draw a row for each of these topics and fill in **your** course numbers beside them: calculus sequence, linear algebra, discrete structures, probability and statistics, data structures, algorithms. Pull the exact sentences from the ML or AI electives that list prerequisites or co-requisites. If a course says “comfortable with multivariate calculus” and you are in business calc, you have a number problem, not a motivation problem. You are not being told you need a PhD in analysis; you are being told which **doors** the department coded into Banner or Workday. Bring that grid to an advisor or a trusted upperclassman who survived the same track. No generic article can print your department’s codes; the worksheet is the deliverable.

## First project: supervised learning before architecture tourism

If builder depth is the goal, the first graded-quality slice should be boring on purpose. One tabular or text-classification problem, a train and validation split, a single model family from scikit-learn, and metrics you can defend in plain English (accuracy is not always the right score, but you should know which score you picked and why). Multiple self-study roadmaps converge on **supervised learning first**, then projects, then deeper neural stacks. Skip the week where you read twelve architecture names and never run `fit` on a matrix. Fork one notebook template, house prices or spam or a small Kaggle set, and reproduce train, validate, and report end to end. For how AI tools fit coding practice without replacing that loop, use the hub’s companion slugs `coding-with-ai-foundations`, `coding-with-ai-learning-path`, `coding-with-ai-debugging`, and `coding-with-ai-code-review` so editor habits stay separate from the catalog discipline in this guide.

## Community, scholarships, and literacy that is not optional garnish

Structural gaps in who gets sustained CS and AI exposure show up in frameworks such as the Kapor Center’s [Leaky Tech Pipeline](https://www.kaporcenter.org/the-leaky-tech-pipeline/) and in NSF-backed work on [STEM engagement for Black and Latine youth](https://par.nsf.gov/biblio/10557872-leveraging-ai-improve-stem-engagement-black-latine-youth). For students who will live with automated decisions in hiring, credit, and public services, the society, ethics, and profession slice of the degree belongs in the same roadmap as Python. Spend a focused block on one module your program assigns on bias, dataset representation, or governance; if nothing is assigned yet, pull a responsible-AI reading from a course you trust and treat it like lab prep, not extra humanities flavor. Research on [AI literacy in Hispanic-Serving Institution contexts](https://ojs.aaai.org/index.php/AAAI-SS/article/view/31267) emphasizes faculty-mentored undergraduate research and hands-on activities; if your department offers a structured lab or research-first-year entry, treat it as an accelerator, not a distraction from the checklist. For Black and Latinx CS students building toward selective ML tracks, [ColorStack](https://colorstack.org/) runs programs, summits, and partner scholarships; [NSBE scholarships](https://www.nsbe.org/scholarships) and [ColorStack-supported travel to NSBE Convention](https://www.colorstack.org/news/colorstack-provides-scholarships-for-computer-science-students-to-attend-nsbe-convention) are concrete checkpoints. ColorStack’s inaugural [SambaNova scholarship](https://www.colorstack.org/news/colorstack-announces-its-inaugural-sambanova-scholarship) announcement listed coursework in **Computer Architecture, Operating Systems, or Machine Learning** at **B− or higher** among eligibility requirements (partner rules and graduation windows change cycle to cycle, so re-read the live post before you plan around it). [FACT CHECK: If you cite a specific AfroTech or trade-press article on a partner program, swap in that headline and URL; do not rely on vague “as seen at AfroTech” copy.]

**Watch for:** Treating “AI fundamentals” as the title line on one syllabus instead of a **thread** that runs through math and statistics foundations, core CS, society and ethics, electives, projects, and sometimes a separate literacy course. Waiting until registration closes to discover the prerequisite graph turns lane choice into damage control.

**Next 24 hours:** Fill the two-column lane sheet and highlight exactly **one** course that unlocks either deeper literacy or deeper builder skills next term. If you chose builder, block sixty to ninety minutes to finish the prerequisite grid and send one email to your advisor or director of undergraduate studies with that grid attached and one sentence naming the ML course you are aiming at. If you chose informed user, enroll or bookmark the literacy module that matches that column and assign yourself one bias or governance reading from its syllabus. Open ColorStack and NSBE pages only far enough to note whether your current or planned grades match any published partner requirements so spring choices double as eligibility prep instead of last-minute scrambling.

<!-- Approximate word count: 1,050 (body only, excluding YAML and HTML comment). -->
