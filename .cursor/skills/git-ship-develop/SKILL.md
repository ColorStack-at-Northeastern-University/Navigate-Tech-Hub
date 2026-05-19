---
name: git-ship-develop
description: |
  Conventional commits on develop, defensive pre-push checks, push to origin/develop,
  merge develop into main, and push main. Activate when user says ship to dev,
  commit and push, merge to main, git ship, land changes, release to main.
---

# Git ship (develop → main)

## Branch policy

| Branch | Use |
|--------|-----|
| `develop` | Integration branch — all feature work lands here first |
| `main` | Production-aligned — only via merge from `develop` |

Never force-push `main` or `develop`.

## Conventional commit types

| Type | When |
|------|------|
| `feat(scope)` | User-facing capability |
| `fix(scope)` | Bug fix |
| `docs` | Documentation only |
| `chore(scope)` | Tooling, MCP, gitignore, generated churn |
| `test` | Tests only |
| `refactor(scope)` | Code change without behavior change |

Message format: `type(scope): imperative summary` — one concern per commit.

## Pre-flight (run before any commit)

From repo root:

```powershell
git status
git branch --show-current   # must be develop for this workflow
git fetch origin
```

**Stop and ask the user** if:

- Not on `develop` (unless they explicitly want another branch)
- Merge conflicts after `git fetch` / `git pull`
- Uncommitted secrets (`.env`, credentials, API keys)
- Large binaries that should use Git LFS (unexpected multi-MB files)

## Grouping commits

Stage **one logical concern** per commit. Suggested order:

1. `chore` — MCP, gitignore, scripts that don’t change product behavior
2. `feat` / `fix` — product code (frontend, backend)
3. `docs` — markdown under `docs/`
4. `chore(skills)` — `.cursor/skills/` additions

Do **not** commit (verify `.gitignore`):

- `frontend/public/assets/resume/samples/source/*.docx` (PII)
- `frontend/public/assets/resume/samples/sanitized/*.docx` (working copies)
- Local-only paths under `.cursor/skills/` listed in `.gitignore` (ship-internal-guide, resume-sample-sanitization, publish-gate, opportunity-radar, external-programs-maintenance, colorstack-opportunities-ingest, article-synthesizer)
- `node_modules/`, `.next/`, `backend/.tmp/`, build artifacts

If skills were previously tracked, remove with `git rm -r --cached .cursor/skills/<name>/` (files stay on disk).

## Commit commands (PowerShell)

```powershell
git add <paths>
git commit -m @"
type(scope): short summary

Optional body: why, not what.
"@
```

Repeat per group until `git status` is clean (except intentionally untracked).

## Pre-push verification

```powershell
node scripts/verify-static-assets.mjs
# If frontend changed:
cd frontend; npm run lint; cd ..
```

Fix failures before push.

## Push develop

```powershell
git pull origin develop
git push origin develop
```

If push rejected: `git pull --rebase origin develop`, resolve conflicts, re-run checks, push again.

## Merge to main

```powershell
git checkout main
git pull origin main
git merge develop -m "merge develop into main"
git push origin main
git checkout develop
```

If merge conflicts: resolve, `git add`, `git commit` (merge commit), push `main`, return to `develop`.

## Output template

```text
## Git ship complete

Commits on develop:
- <hash> type(scope): summary
- ...

Pushed: origin/develop
Merged: develop → main, pushed origin/main
Current branch: develop

Skipped / not committed: [list if any]
```

## Hard rules

- Never `git push --force` to `main` or `develop` unless user explicitly requests it.
- Never skip hooks (`--no-verify`) unless user explicitly requests it.
- Never amend pushed commits unless user explicitly requests it and branch is not shared.
- Use `gh` only when PR workflow is requested; this skill uses direct merge to `main`.
