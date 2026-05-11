---

## VERIFICATION LOG: Online Assessment Strategy for Timed Screens
Slug: `online-assessment-strategy`
Phase: A (verification only — `brief.md` not modified)
Publish-year context: 2026
Today: 2026-05-10

Legend: **Verified** = corroborated and safe to use as framed · **Deferred** = only revisit if the draft commits to a specific claim in that area · **Optional** = editorial choice, not blocking synthesis.

---

### 1. Northeastern / course-specific academic integrity (sanctioned distribution) — **Verified**

**Question from brief:** Confirm Northeastern and course-level language if Navigate distributes this as a sanctioned resource.

**Findings:**

- **University-wide policy** is published in the academic catalog and mirrored on the Office of Student Conduct site. Cheating is defined broadly to include, when **unauthorized**, use of notes, text, the internet, **artificial intelligence**, chatbots, cellphones, and similar aids in academic exercises. See:
  - [Academic Integrity Policy (catalog)](https://catalog.northeastern.edu/handbook/policies-regulations/academic-integrity)
  - [Academic Integrity Policy (OSCCR)](https://osccr.sites.northeastern.edu/academic-integrity-policy/)

- **Khoury / CS framing:** Khoury publishes undergraduate academic policies (including integrity expectations) and public commentary that **AI use is course- and assignment-specific** (instructor sets what is allowed). See:
  - [Academic Policies and Procedures — Khoury](https://www.khoury.northeastern.edu/current-undergraduate-students/undergraduate-advising-academic-support/academic-policies-and-procedures/)
  - [Khoury faculty on when — and when not — to use AI in the classroom](https://www.khoury.northeastern.edu/khoury-college-faculty-on-when-and-when-not-to-use-ai-in-the-classroom/)

**Critical distinction for this article:** The synthesis brief is about **employer- or vendor-hosted timed hiring assessments**, not graded Northeastern coursework. University policy governs **academic** work; each **job assessment invite** defines what is allowed for that screen. A sanctioned Navigate article should **not** imply that a rule from CodeSignal, HackerRank, or an employer invite overrides a **course syllabus** (or the reverse).

**Action for draft:**

1. Keep the brief’s existing integrity posture: literal read of the **assessment invite / rules screen**; no “environment hacks”; no leak-style content.
2. If the published piece is officially distributed on behalf of Northeastern-aligned groups, add a **short, accurate** institutional pointer: e.g. one sentence that **coursework** follows each instructor’s policy and the [catalog academic integrity](https://catalog.northeastern.edu/handbook/policies-regulations/academic-integrity) page, while **this guide** addresses hiring-style timed screens. Do not invent NEU-specific permissions for external OAs.
3. The scaffold in `draft/article.md` (“Add any honor-code or academic integrity lines required by your institution”) is consistent with the above — replace with concrete links at draft time if the org wants them in body copy.

---

### 2. Per-platform 2026 UI, screenshots, and “what’s allowed” — **Verified** (as editorial rule)

**Question from brief:** UI and links churn; stay vendor-neutral and point to official help.

**Findings:**

- **CodeSignal** maintains a public help/knowledge base; candidate-facing material includes **Test-taker FAQs** and related articles (hub loads at [help.codesignal.com](https://help.codesignal.com/hc/en-us), with articles hosted under `support.codesignal.com` in fetched content).
- **HackerRank** hosts a **candidate** knowledge base (collections for Test, Interview, etc.) at [candidatesupport.hackerrank.com](https://candidatesupport.hackerrank.com/collections/9416206085-faq). The path `help.hackerrank.com/hc/en-us` is **not** a reliable entry URL (404 as of this check); prefer `www.hackerrank.com/support` or the candidate support domain when linking.

**Action for draft:** Avoid screenshot-dependent claims. For rules (IDE, AI assistant, internet, proctoring), cite **the invite text** first, then **optional** “learn more” links to vendor help—not step-by-step UI tours that go stale.

---

### 3. Optional Navigate anecdote or internal stat — **Deferred** (none located)

**Question from brief:** Optional internal anecdote or stat; double-check whether any exists.

**Findings:**

- Repository scan of `docs/` and related internal drafts did **not** surface a Navigate-specific quantitative stat or a ready-made **online assessment** anecdote for this slug. Cross-guides mention `online-assessment-strategy` as a sibling pointer only.
- The synthesis brief already lists **personal signal: no** and does not depend on an internal story.

**Action for draft:** Treat as **optional**. If the org later adds a vetted anecdote (e.g. from a workshop or member survey with consent), add it in the draft phase with attribution rules; do not fabricate stats.

---

## Summary for the writer

1. **Academic integrity:** Use catalog + OSCCR + Khoury policy/AI pages for **institutional** alignment; keep **hiring OA** tactics clearly separated from **course** GenAI rules. (See item 1.)
2. **Vendor volatility:** Prefer invite text + stable help hubs (**CodeSignal** help center; **HackerRank** candidate support), not brittle UI walkthroughs. (See item 2.)
3. **Internal anecdote:** Not required; no verified internal OA stat was found in-repo—add only if editorially supplied later. (See item 3.)

All **PENDING** lines in `brief.md` for this slug are addressed above. **`brief.md` was not modified.**
