# Draft pipeline (approved): verification → draft → style

Each inventory slug under `docs/internal_resources_drafts/{slug}/` follows **three phases**. **`synthesis/brief.md` is never deleted or overwritten** by automation.

## Workspace roots (tools)

- **Normal local clone** (repo on a fast local disk, not inside OneDrive sync): Subagents and parents may use **Glob**, **grep**/`rg`, and **SemanticSearch** like any other project when discovery helps.
- **Slow-sync root** (repo under OneDrive or similar): Repo-wide search and Glob often **time out**—use **Read** on paths the parent gave you, **Web** for URLs, and bounded Shell under `docs/internal_resources_drafts` only. Paste the **TOOL ALLOWLIST (slow-sync)** block from §“If sub-agents hang” into child prompts when needed.

## Phase A — Verification (`synthesis/verification-log.md`)

- **Tools:** `Read` / `Write` on the two paths above + **Web** for checks. On **slow-sync roots**, avoid repo-wide `grep`/`rg`, **Glob**, or **SemanticSearch** for discovery (timeouts); on **local clones**, optional.
- **Reads:** `synthesis/brief.md` only (read-only).
- **Writes:** `synthesis/verification-log.md` (create/overwrite).
- **Job:** Work through **PENDING ITEMS** and any author notes in the brief. Per item: **Verified** (source URL/snippet), **Deferred** (human), or **FactCheck** (tag in draft). Web tools only where claims are checkable; no invented stats.
- **Special:** `cs-course-planning-neu` — log NEU manual-sourcing gaps; do not fabricate catalog facts.

## Phase B — Draft (`draft/article.md`)

- **Tools:** three `Read`s + one `Write` to `draft/article.md`. Paths are fixed—no need to search for them. On **slow-sync roots**, do not use Glob/grep/codebase search to locate those files; on **local clones**, discovery tools still unnecessary but not forbidden.
- **Reads:** `synthesis/brief.md`, `synthesis/verification-log.md`, and `.cursor/rules/navigate-writing.mdc` (known paths).
- **Writes:** `draft/article.md` only (full article in one pass per `navigate-writing` workflow).
- **Job:** Follow brief structure + GEMs; inventory word band; required article blocks from Navigate kickoff (what you’ll leave with, opening, sections, mistake, 24h close). Preserve `[FACT CHECK: …]` where verification deferred.
- **Matt Pocock (MOTT) links:** **Only** these four slugs must include at least one substantive link to Matt Pocock’s teaching (e.g. [totaltypescript.com](https://www.totaltypescript.com/) or his canonical materials), tied to a real point—not empty name-drops:
  - `coding-with-ai-foundations`
  - `coding-with-ai-debugging`
  - `coding-with-ai-code-review`
  - `coding-with-ai-learning-path`

## Phase C — Style gate (`draft/article.md` patch)

- **Tools:** `Read` draft + rules, then patch `draft/article.md`. Fix banned patterns by **reading** the draft (do not rely on blind repo-wide search). On **slow-sync roots**, avoid Glob/grep scans across the tree.
- **Reads:** `draft/article.md` + `navigate-writing.mdc`.
- **Writes:** Updates `draft/article.md` only (fix violations, do not change factual claims without re-flagging). **Do not** edit `.cursor/rules/*`, `synthesis/*`, or any path outside that slug’s `draft/article.md`.
- **Job:** Check banned patterns (contrarian “not just X but Y,” rhetorical em dashes, hollow openers, AI-signature vocabulary, stacked transitions), structure (no summary closer, prose-first), and `[FACT CHECK]` preservation.

## Slow-sync roots (e.g. OneDrive): prefer known paths

When the repo lives under **OneDrive or another slow-sync folder**, subagents should treat paths as **given**, not discovered:

- **Avoid** repo-wide **Glob**, **SemanticSearch** / codebase_search for “find a file,” **grep**/`rg`, or recursive **find** across the whole tree (timeouts).
- **Do** use **Read** / **Write** on the exact paths the parent gave you, plus **WebSearch** / **WebFetch** for external URLs.

Parents on slow-sync trees: prefer **Shell** with a **bounded** `-Path` (e.g. only `docs/internal_resources_drafts`) and `Get-ChildItem … -Filter brief.md` instead of `grep -r` across the repo root.

On **normal local clones**, ignore this subsection for tool choice unless operations still feel slow.

### Permissions

The agent cannot click **Allow** on your behalf. Use **allow for workspace** (or trust this folder) when Cursor prompts for **network** or **git_write** on sub-agents so repeats stop; there is no extra “approve all pending” hook from here.

## Order per slug

**A → B → C** for the same slug. Do not run B until `verification-log.md` exists for that slug.

---

## If sub-agents hang (grep / Glob / OneDrive)

**1. Stop the stuck run**  
In Cursor: cancel or dismiss the background Task / sub-agent that is not making progress (often it is waiting on a repo-wide search that will not finish on a slow-sync root).

**2. Relaunch with this block pasted at the very top of the new prompt** (before any other instructions) **only when the clone is on OneDrive or similar**:

```text
TOOL ALLOWLIST (slow-sync / OneDrive clone — obey first):
- ALLOWED: Read(path you were given), Write(path you were given), WebSearch, WebFetch, browser tools for external URLs only.
- FORBIDDEN: grep, rg, ripgrep, Glob (any pattern, including ** or * over this repo), SemanticSearch/codebase_search to discover repo files, find/dir over the repo root, or any recursive search of the workspace. Do not run terminal search. If you need another file, STOP and ask the parent for its full path — do not search for it.
If you already started a forbidden tool, abort that approach and use only Read/Write on the paths in THIS message.
```

**3. Parent must pass full paths**  
Example: `c:\Users\odubi\OneDrive\Desktop\Coding and Projects\Projects\Navigate-Tech-Hub\docs\internal_resources_drafts\{slug}\synthesis\brief.md` — never “find the brief.”

**4. Parent checks progress without grep**  
Use PowerShell only on a **single** folder, e.g.  
`Get-ChildItem -LiteralPath "...\docs\internal_resources_drafts" -Recurse -Filter "verification-log.md"`  
—not `grep -r`.
