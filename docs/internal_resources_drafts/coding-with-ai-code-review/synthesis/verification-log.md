# Phase A — Verification log

**Slug:** `coding-with-ai-code-review`  
**Brief (read-only):** `docs/internal_resources_drafts/coding-with-ai-code-review/synthesis/brief.md`  
**This log:** `docs/internal_resources_drafts/coding-with-ai-code-review/synthesis/verification-log.md`  
**Date:** 2026-05-10

## Path confirmation

| Role | Path |
|------|------|
| Read only | `docs/internal_resources_drafts/coding-with-ai-code-review/synthesis/brief.md` |
| Written (this file) | `docs/internal_resources_drafts/coding-with-ai-code-review/synthesis/verification-log.md` |

`brief.md` was not modified.

---

## PENDING ITEMS (from brief) — resolution

| Item | Status | Notes |
|------|--------|--------|
| Optional real `CONTRIBUTING.md` or course policy snippet to anchor team norms | **Deferred (human)** | No repo-specific snippet was supplied in synthesis. Phase B may use generic GitHub guidance on `CONTRIBUTING.md` (see verified GitHub doc below) or wait for author/org material. |
| Before publish: any named CVE, Copilot/IDE capability, privacy/training setting, or quantitative security study from blogs → primary doc/paper | **FactCheck (publish gate)** | Procedure locked: trace each such claim to vendor docs, advisory, or peer-reviewed/arxiv primary. This log does not enumerate future draft sentences; drafter re-checks at publish time. |
| Optional verified statistic only with primary source | **Verified** | Acceptable primary statistics for CodeGuard (see §4): F1 **0.93** for PromptShield and **30–65%** reduction in harmful/policy-violating completions are stated in the paper abstract; article language must remain “authors report” / “in their experiments,” not generalized to commercial IDEs. Otherwise omit statistics. |

---

## Inline brief notes / source list — verification

### 1. GitHub Docs — “Review AI-generated code”

| Check | Result |
|-------|--------|
| Page reachable | **Verified** — `https://docs.github.com/en/copilot/tutorials/review-ai-generated-code` (title: *Review AI-generated code*). |
| Structure vs brief | **Verified** — Sections match brief: functional checks (tests, static analysis, CodeQL, Dependabot) → context/intent → quality → dependencies (incl. hallucinated packages, slopsquatting) → AI-specific pitfalls → collaborative review → automation/CI → `CONTRIBUTING.md` / guidelines. |
| Copilot Chat cookbook links | **Verified (spot-check)** — Page links to paths under `copilot/tutorials/copilot-chat-cookbook/` (e.g. generate unit tests, E2E tests, readability, templates, debugging invalid JSON). **FactCheck** before final publish: re-open the tutorial page once before ship; GitHub occasionally restructures docs URLs. |

### 2. GitHub Resources — “Human Oversight in Modern Code Review”

| Check | Result |
|-------|--------|
| Linked from tutorial “Further reading” | **Verified** — URL on live page: `https://resources.github.com/enterprise/human-oversight-modern-code-review/` |
| Use in article | **FactCheck** if pulling specific quantitative claims — treat as secondary marketing/resources page; skim before citing numbers or dated product claims. |

### 3. SecureFlag — “Performing Secure Code Reviews with AI Assistants” (2026)

| Check | Result |
|-------|--------|
| Exists | **Verified** — `https://blog.secureflag.com/2026/04/09/ai-assisted-secure-code-review/` (search + index alignment with brief themes: scoped PR review, adversarial framing, scanners vs judgment, workflow embedding). |
| Product/integration sentences | **FactCheck** — Any named product, SKU, or integration must be quoted only after reading that post at publish time; brief already flags vendor drift. |

### 4. Raihan et al. — CodeGuard (arXiv:2602.02509v1)

| Check | Result |
|-------|--------|
| Record exists | **Verified** — `https://arxiv.org/abs/2602.02509` (*CodeGuard: Improving LLM Guardrails in CS Education*). |
| Taxonomy labels IR / RS / RU | **Verified** — Abstract and §3 describe Irrelevant (IR), Relevant–Safe (RS), Relevant–Unsafe (RU). |
| Dataset size | **Verified** — Abstract: 8,000 prompts. |
| PromptShield F1 0.93 | **Verified** — Abstract: “PromptShield achieves 0.93 F1 score” (authors’ benchmark). |
| 30–65% reduction | **Verified** — Abstract: reduces “potentially harmful or policy-violating code completions by 30-65%” without degrading legitimate educational tasks (authors’ experiments). |
| EACL 2026 | **FactCheck** — Brief mentions EACL 2026 findings; arXiv landing page shows paper; **confirm venue/final bibliographic detail** from published proceedings or camera-ready if cited formally in article. |

### 5. ShellNet Security — “AI-Assisted Code Review: A Practical Framework” (2026)

| Check | Result |
|-------|--------|
| Exists | **Verified** — `https://blog.shellnetsecurity.com/posts/2026/ai-assisted-code-review-practical-framework/` (matches brief intent: AI for consistency/patterns; humans for design, business context, org knowledge). |
| Authority | **FactCheck** — Opinion/practitioner blog; cross-verify any strong factual claim used in draft. |

### 6. Bright / vendor “AI code review” posts (2026)

| Check | Result |
|-------|--------|
| Brief stance | **Verified (process)** — No URL verification run; brief says use only for themes confirmed elsewhere. **FactCheck** any Copilot/Cursor/Windsurf capability line against current vendor docs at publish. |

### 7. DEV Community — Copilot security / GitGuardian-style narratives

| Check | Result |
|-------|--------|
| Brief stance | **Deferred / FactCheck** — No DEV URLs verified in this pass. Article must not reproduce exploit steps from secondhand summaries; use author post + GitHub advisory/issue when making incident claims. |

### 8. CodeGrade — AI assistant guardrail tiers (marketing)

| Check | Result |
|-------|--------|
| | **FactCheck** — Tier names and feature list must be copied from current CodeGrade marketing page at publish; not verified here. |

### 9. `in-the-loop-labs/pair-review` (GitHub)

| Check | Result |
|-------|--------|
| Repo exists | **Verified** — `https://github.com/in-the-loop-labs/pair-review` (description: AI-assisted code review with human in the loop; low star count). |
| Maturity if named | **FactCheck** — If draft names the project, add one line on scope/stars/maintenance from repo README at publish time. |

### 10. Audience search — demographic identity × AI code-review outcomes

| Check | Result |
|-------|--------|
| | **Verified (method)** — Brief states no direct sources in that session; policy unchanged: no unsupported group-difference claims; use inclusive examples + CodeGuard + course/employer policy as binding guardrails. |

---

## GEM / structure alignment (sanity)

| Brief element | Status |
|---------------|--------|
| Review order: automation → intent → quality → deps → AI pitfalls | **Verified** against GitHub tutorial section order (aligned; wording may vary). |
| Matt Pocock link requirement for this slug (Phase B) | **Noted** — Per `DRAFT_PIPELINE.md`, Phase B draft must include ≥1 substantive Matt Pocock / Total TypeScript link; out of scope for Phase A verification content but logged for B. |

---

## Phase A outcome

**PENDING / notes:** Resolved as above (human-deferred items explicit; publish-time **FactCheck** tags preserved where the brief already required them).  

**Ready for Phase B:** Yes — `verification-log.md` exists; drafter reads this file plus `brief.md` per pipeline.
