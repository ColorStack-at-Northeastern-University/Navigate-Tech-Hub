# Phase A — Verification log

**Slug:** `coding-with-ai-debugging`  
**Brief (read-only):** `docs/internal_resources_drafts/coding-with-ai-debugging/synthesis/brief.md`  
**This log:** `docs/internal_resources_drafts/coding-with-ai-debugging/synthesis/verification-log.md`

Paths confirmed relative to repo root:  
`Navigate-Tech-Hub/docs/internal_resources_drafts/coding-with-ai-debugging/synthesis/verification-log.md`

---

## Scope

Phase A per `docs/internal_resources_drafts/DRAFT_PIPELINE.md`: resolve **PENDING ITEMS** and inline verification notes from the brief **without** editing `brief.md`.

---

## PENDING ITEMS (from brief)

### 1. Course-specific integrity language

| Status | **Deferred (human)** |
| --- | --- |
| Reason | Institution policies on AI-assisted debugging vs. code generation are not repo- or web-verifiable in a universal way. |
| For Phase B | Add **one line** in the article pointing readers to their school’s official academic integrity / AI policy (or course syllabus), aligned with the brief’s tool-agnostic stance. |

### 2. Optional personal debugging story

| Status | **Deferred (human)** |
| --- | --- |
| Reason | Optional bounded anecdote; only the author can supply it. Brief already caps at one example. |
| For Phase B | Include only if the author provides a concrete, bounded story; otherwise omit without blocking publish. |

### 3. ICER 2025 — full paper read before publish cite

| Status | **Verified (core claim)** + **FactCheck (draft tag for nuance)** |
| --- | --- |
| Paper | Shao-Heng Ko, Amy Isvik, Danyang Zhuo, Kristin Stephens-Martinez, and Nick Feamster. *Relationships Between Computing Students’ Characteristics, Help-Seeking Approaches, and Help-Seeking Behavior in Introductory Courses and Beyond.* **ICER 2025** (ACM). |
| Checkable locations | ACM program entry: `https://icer2025.acm.org/details/icer-2025-papers/13/Relationships-Between-Computing-Students-Characteristics-Help-Seeking-Approaches-a` — author PDF (Duke): `https://users.cs.duke.edu/~ksm/pubs/icer2025relationships.pdf` |
| Snippet (author PDF, abstract / summary of results) | *“We found Latinx/e/a/o and non-CS major students relied on people outside of the course more than their peers”* (same wording appears in the results narrative). |
| Alignment with brief | Matches the brief’s careful framing: **help-seeking / who is asked**, not “who uses AI more.” **Not** about AI tools specifically. |
| For Phase B | **Before publish:** read the paper’s **methods, limitations, and exact population labels** so article prose does not overgeneralize or imply causation beyond the study. Keep **modest** “landscape” framing per brief. Preserve or add `[FACT CHECK: …]` anywhere the draft touches intersectionality, inference beyond the paper, or policy implications. |

---

## Inline note from brief (KEY FINDINGS)

### `[FACT CHECK: paraphrase findings only; do not overclaim causality or generalize beyond the paper’s methods.]`

| Resolution | **FactCheck (carry into draft)** |
| --- | --- |
| Evidence | Primary PDF supports the **specific** comparative statement on Latinx/e/a/o students and reliance on people **outside the course** vs. peers (see §3 above). |
| Action | Do **not** drop the tag for the final article until an author has reviewed **Discussion / limitations** in the full paper and tightened wording accordingly. |

---

## Optional spot-check (non-pending, brief anchor)

### GitHub Blog — progressive debugging, `/explain` before `/fix`, `@workspace`, human oversight

| Status | **Verified** |
| --- | --- |
| URL | `https://github.blog/ai-and-ml/github-copilot/how-to-debug-code-with-github-copilot/` (dated **February 21, 2025** on the page). |
| Snippet | Article names **progressive debugging** as understand → analyze → fix; example order starts with **`/explain`**, mentions **`/startDebugging`**, then **`/fix`**; **`@workspace`** for multi-file context; closing section stresses **human oversight** (“developer in the pilot’s chair”). |

---

## Phase A gate

- **PENDING:** integrity → **Deferred**; personal story → **Deferred**; ICER cite prep → **Verified** for core claim, **FactCheck** for publish-safe limitations wording.  
- **`brief.md`:** not modified.  
- **Ready for Phase B** after `verification-log.md` exists (this file).
