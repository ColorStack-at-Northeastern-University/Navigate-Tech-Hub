---

## VERIFICATION LOG: Using Open Source Contributions as Portfolio Experience

Phase: A (verification only — `brief.md` not modified)  
Scope: Resolve PENDING items and inline `[FACT CHECK]` / attribution notes from `docs/internal_resources_drafts/open-source-as-experience/synthesis/brief.md`.

**Legend**

- **Verified** — claim/decision is settled for the drafting pass.
- **Deferred** — editorial or out-of-scope; not a blocking factual error.
- **FactCheck** — confirm against a live primary source before publication (especially dates, URLs, intake windows, and numeric cohort claims).

---

### PENDING ITEMS (from brief.md, lines 83–89)

**P1. Verify current All In for Students / Contributor Catalyst application facts and URLs if cited in the article body**

- Status: **Mixed — partial Verified, partial FactCheck**

- **All In for Students (historical framing + eligibility pattern)**  
  - **Verified** against primary narrative on the GitHub Blog: [“All In for Students: expanding the next generation of open source leaders”](https://github.blog/news-insight/company-news/all-in-for-students-expanding-the-next-generation-of-open-source-leaders/) (Nov 1–2, 2022). The post documents: pilot scale (30 students, seven universities in 2021); 2023 cohort target of **300** students; eligibility including HBCUs, HSIs, women’s colleges, community colleges, and students at four-year schools who identify as a racial or ethnic minority; full- or part-time enrollment; curriculum emphasizing hackathons and **coding and non-coding** contributions; partner diversity (corporates, startups, nonprofits, OSS communities).  
  - **FactCheck (before asserting “apply now,” current cohort size, or a specific application URL):** Program packaging and intake change over time. In this verification pass, `https://allinopensource.org/access/students/` returned **404**; the blog’s canonical link for the program hub is `https://allinopensource.org/access/`. Do not carry forward historic Google Form links or cohort numbers from blog posts as “current” without checking the live All In site, the [All-In GitHub org README / cohort docs](https://github.com/AllInOpenSource/All-In), or a dated GitHub announcement for the year you publish.

- **Contributor Catalyst (UC Santa Cruz OSPO, HBCU-oriented OSS mentorship)**  
  - **Verified** against UC Santa Cruz news: [“$1M NSF grant expands open source software mentorship program for HBCU students”](https://news.ucsc.edu/2024/09/contributor-catalyst-grant/) (published Sep 2024; page last modified Jun 20, 2025 per site footer). Article confirms: NSF **~$1M** grant for **three years** of expansion; program is **free** with **stipends**; **eight-week** hybrid (in-person at UCSC + remote); students choose OSS projects (examples given: **p5.js** year one; **open source security** projects year two); collaboration with UCSC OSPO and Norfolk State University faculty; quoted expansion plan (**+4** students from one additional HBCU in the next year, then **+8**, then **+8** in subsequent years) and emphasis on alumni peer mentors.  
  - **FactCheck (before “here is how to apply” copy):** The news piece is strong on **what the program is** but is not a substitute for a current **application page / deadline / intake contact**. Pull the apply path from UCSC OSPO or program-maintainer pages at publish time.

- **Action for writer:** Use Section 5 structured-path bullets as **“examples of structured on-ramps exist”** with the verified primary links above. Add a short editor’s note or footnote pattern: eligibility and windows drift — readers should confirm on the live program site. Align with the brief’s own `[FACT CHECK: eligibility, dates, URLs]` on GEM bullets.

**P2. Confirm whether ColorStack publicly documents OSS-specific programming; if not, keep community mention general**

- Status: **Verified** (scoped to public marketing site pass + org GitHub signal)

- **Resolution:** The ColorStack **home** positioning (fetched May 2026) emphasizes community, Slack, **monthly workshops / webinars / coaching**, career fairs, partner resume opportunities, and partner-collaboration events — not an **OSS-specific** program line in the same way the brief’s procedural sources treat OSS contribution playbooks.  
- **Corollary (optional, still not a “program” claim):** ColorStack ships member-facing software in a **public** monorepo ([`colorstackorg/oyster`](https://github.com/colorstackorg/oyster)) described on GitHub as core product software. That supports **“the org participates in the OSS ecosystem as a maintainer of its own stack”** if you need a concrete hook — it does **not** justify inventing a formal “ColorStack OSS track” for members.

- **Action for writer:** Keep audience rails **general** (community, accountability, career infrastructure) unless you add a separate research pass with a specific ColorStack page that names OSS programming. Matches brief lines 24, 45, 64, and 86.

**P3. User: optional personal anecdote (“one merged PR story”) — author note: “havent worked on anything open source”**

- Status: **Verified**

- **Resolution:** Treat **personal signal** as **no** for this article unless the author later supplies a true story. Do not fabricate a merged-PR anecdote. First-year framing stays **doc- and practitioner-grounded**, per brief line 7.

---

### INLINE NOTES / SOURCE-ATTRIBUTION CHECKS (mapped to brief.md)

**N1. Source #6 — “2025” aggregator / tool lists (brief line 22)**

- Status: **FactCheck**  
- **Reason:** Secondary roundup; year-branded posts go stale quickly.  
- **Action for writer:** Before publish, spot-check any **“2025”** headline claims, tool URLs, and listicles against GitHub Docs + First Contributions + maintainer READMEs. Prefer **timeless** procedural language over dated list blog titles.

**N2. Source #8 — ColorStack + `[FACT CHECK: … OSS-specific …]` (brief line 24)**

- Status: **Verified** (merged with **P2**)  
- **Action for writer:** Community context only from public site; no invented OSS tracks.

**N3. Source #9 — GitHub Blog All In + `[FACT CHECK: cohort size, eligibility, application windows]` (brief line 25)**

- Status: **FactCheck** for **current** numbers and applications; **Verified** for **2021–2023-era** facts as cited in the Nov 2022 GitHub Blog expansion post (see **P1**).  
- **Action for writer:** Do not quote **405** or other post-2023 cohort sizes from search snippets without a dated primary source at publish time.

**N4. Source #10 — NSF Contributor Catalyst + `[FACT CHECK: active cohorts, application process]` (brief line 26)**

- Status: **Verified** for program **existence, structure, and NSF expansion narrative** (UCSC news, **P1**); **FactCheck** for **live intake / how to apply**.

**N5. Source #11 — Coding Black Females podcast / Isabel Costa + `[FACT CHECK: if citing quotes]` (brief line 27)**

- Status: **FactCheck**  
- **Reason:** Episode useful for tone and barrier-naming; any **direct quote** needs transcript or episode page re-check before publish.  
- **Action for writer:** Paraphrase themes (“permission to start small,” “navigating unfamiliar communities”) or omit quotes.

**N6. GEM — All In / Catalyst structured paths + `[FACT CHECK: eligibility, dates, URLs]` (brief line 43)**

- Status: **FactCheck** (same resolution as **P1** / **N3** / **N4**). Safe to keep as **optional structured on-ramps** with primary links and a “confirm on live site” caveat.

**N7. GEM — ColorStack community + `[FACT CHECK: OSS-specific offerings]` (brief line 45)**

- Status: **Verified** (same resolution as **P2** / **N2**).

**N8. Recommended Structure — Section 5 `[FACT CHECK block in draft]` (brief line 70)**

- Status: **FactCheck**  
- **Action for writer:** Implement as a compact boxed callout: **two bullets max** (All In pillar + Catalyst-style residency) + **“verify eligibility and deadlines at publish time.”** No speculative application dates.

---

### SUMMARY

- **Verified:** P2 (ColorStack OSS-specific scope), P3 (no personal OSS anecdote), N2, N7, and the **Contributor Catalyst** narrative core + **All In for Students** eligibility **pattern** as of the **2022 GitHub Blog** primary source.  
- **FactCheck before publish:** Current All In **application** path and **cohort stats** (N3, N6, N8); Contributor Catalyst **apply** mechanics (N4); any **2025** roundup specifics (N1); podcast **quotes** (N5).  
- **Deferred:** None blocking Phase A.

**Blocking for draft start?** **No.** The brief’s structure and GEMs are draftable with the caveats above; tighten numbers, URLs, and quotes on the publish pass.

`brief.md` was **not** modified.

---
