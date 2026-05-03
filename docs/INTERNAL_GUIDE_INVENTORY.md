# Internal Guide Inventory

This document defines the planned internal guide inventory and required metadata for publication planning.

## 1) Metadata Contract Reminder

Each planned guide includes:
- `slug`
- `title`
- `category`
- `audienceStage`
- `outcome`
- `timeToReadMinutes`
- `contentVolatility`
- `batch`

## 2) How `timeToReadMinutes` is interpreted here

`timeToReadMinutes` is **estimated silent reading time** for the finished markdown guide, not time-on-task (practice, coding along, or filling worksheets).

Published estimates for adult silent reading of general nonfiction often cluster around **roughly 200–250+ words per minute** in meta-analytic summaries; **technical or unfamiliar material reads slower**. For Navigate Tech Hub, treat the target band as **about 3–5 minutes default**, and **up to 7 minutes** only when the outline requires denser checklists or comparison tables while staying scannable (short sections, bullets, clear headings).

Order-of-magnitude word budget (illustrative, not a contract):

- **3 minutes** ≈ on the order of **550–750 words** at ~200–250 wpm.
- **5 minutes** ≈ on the order of **900–1,100 words** at similar rates.
- **7 minutes** ≈ on the order of **1,250–1,550 words** if the prose stays skimmable; if the draft blows past that, **cut scope or split into a linked follow-up guide** rather than raising the minute estimate.

The numbers in the inventory below are chosen to match that policy: **most rows are 4–5**, a few **3** where the guide is intentionally minimal, and **6–7** only where the outline is inherently denser.

## 3) Planned Guide Inventory

| Slug | Title | Category | Audience Stage | Outcome | Time (min) | Volatility | Batch |
|---|---|---|---|---|---:|---|---|
| interview-process-map | Interview Process Map for First-Year CS Students | interview-prep | first-year | Understand the full interview lifecycle and what to prepare at each step. | 5 | medium | 1 |
| resume-for-tech-roles | Resume System for Internships and Co-ops | interview-prep | first-year | Produce a role-targeted resume aligned to recruiter screening expectations. | 5 | low | 1 |
| behavioral-story-bank | Behavioral Interview Story Bank with STAR | interview-prep | first-year | Build reusable STAR stories mapped to common behavioral prompts. | 5 | low | 1 |
| coding-interview-patterns | Coding Interview Patterns and Practice Plan | interview-prep | underclassmen | Apply core problem patterns and a repeatable prep routine. | 6 | medium | 2 |
| online-assessment-strategy | Online Assessment Strategy for Timed Screens | interview-prep | underclassmen | Improve performance in timed assessments through pacing and triage strategy. | 5 | medium | 2 |
| cs-course-planning-neu | CS Course Planning for Northeastern Students | classes | first-semester | Build a semester-by-semester course plan with prerequisite awareness. | 5 | high | 1 |
| selecting-electives-intentionally | How to Select Electives with Career Intent | classes | first-year | Choose electives that support a clear skill pathway. | 4 | medium | 2 |
| ai-fundamentals-roadmap | AI Fundamentals Roadmap for Non-Specialists | classes | underclassmen | Understand AI prerequisite concepts and choose the right next courses. | 5 | medium | 2 |
| project-selection-framework | Project Selection Framework for Portfolio Value | projects | first-year | Select projects that demonstrate practical scope and technical depth. | 4 | low | 1 |
| portfolio-that-converts | Build a Portfolio That Converts Recruiter Interest | projects | first-year | Launch a portfolio that clearly communicates impact and ownership. | 5 | medium | 1 |
| project-scoping-execution | Project Scoping and Execution in 6 Weeks | projects | underclassmen | Ship scoped projects on schedule using milestone planning. | 5 | medium | 2 |
| shipping-fullstack-projects | Shipping Full-Stack Projects with Deployment Basics | projects | underclassmen | Deliver deployed projects with production basics documented. | 7 | medium | 2 |
| hackathon-prep-system | Hackathon Preparation System | hackathons | first-year | Enter hackathons with a prepared team plan and execution checklist. | 5 | medium | 1 |
| hackathon-winning-criteria | What Winning Hackathon Teams Do Differently | hackathons | underclassmen | Align project choices and demos to common judging criteria. | 4 | medium | 2 |
| demo-and-pitch-playbook | Demo and Pitch Playbook for Hackathon Finals | hackathons | underclassmen | Deliver clear demos and concise pitches under time constraints. | 4 | low | 2 |
| networking-for-introverts | Networking System for Introverted Students | community | first-year | Build a repeatable networking routine for events and online outreach. | 5 | low | 1 |
| outreach-templates-that-work | Cold Outreach Templates for Students in Tech | community | first-year | Send high-quality outreach messages with strong response rates. | 3 | low | 1 |
| conference-strategy | Conference and Career Fair Strategy | community | all-levels | Maximize conference outcomes before, during, and after each event. | 6 | high | 3 |
| mentorship-relationship-management | How to Build and Maintain Mentor Relationships | community | underclassmen | Create durable mentor relationships with clear follow-up systems. | 5 | low | 3 |
| coding-with-ai-foundations | Coding with AI: Foundations and Workflow Setup | projects | first-year | Use AI coding tools safely with clear task framing and verification. | 6 | high | 3 |
| coding-with-ai-debugging | Coding with AI: Debugging and Incident Triage | projects | underclassmen | Apply AI-assisted debugging workflows without skipping root-cause analysis. | 6 | high | 3 |
| coding-with-ai-code-review | Coding with AI: Review Standards and Guardrails | projects | underclassmen | Enforce quality, security, and correctness in AI-assisted code review loops. | 6 | high | 3 |
| coding-with-ai-learning-path | Coding with AI: Learning Acceleration Without Dependency | classes | first-year | Build learning plans that use AI for feedback while preserving core skill growth. | 5 | medium | 3 |

## 4) Batch Intent Summary

- Batch 1: Core onboarding and immediate student execution gaps.
- Batch 2: Stronger execution systems for interviews, projects, and hackathons.
- Batch 3: Advanced workflows and AI coding guidance with explicit guardrails.

## 5) Change Control

Inventory updates require:
- category validation against canonical enum,
- audience-stage validation,
- volatility assignment,
- publication batch review by project lead.
