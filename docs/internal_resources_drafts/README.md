# Internal resource drafts

Long-form guides are organized **per inventory slug** (see `docs/INTERNAL_GUIDE_INVENTORY.md`).

## Layout

```text
{slug}/
  synthesis/
    brief.md     # Step 1: output from article-synthesizer (approve before drafting)
  draft/
    article.md   # Step 2: full article after brief approval (create when ready)
```

If a guide has not been synthesized yet, `synthesis/` may contain only `STATUS.md` until `brief.md` exists.

## Workflow

1. Run **article-synthesizer** → fill or update `synthesis/brief.md`.
2. After you approve the brief, write `draft/article.md` using `.cursor/rules/navigate-writing.mdc`.
3. Fact-check `[FACT CHECK: …]` tags before publishing to Strapi.

Do not publish to Strapi without explicit approval.

## OneDrive / tool note (parallel synthesis)

If this repo is under OneDrive, **recursive file search (Glob) over the workspace can time out**. For batch synthesis:

- **Parent:** paste inventory row + skill excerpts **inline** in each sub-agent prompt; enumerate outputs with **Shell** (`Get-ChildItem` on a known folder), not broad Glob.
- **Sub-agent:** **WebSearch** / external fetches for research; **Write** once to `docs/internal_resources_drafts/{slug}/synthesis/brief.md`. Avoid Glob and repo-wide traversal.

See `.cursor/skills/article-synthesizer/SKILL.md` → *Before you start — workspace and tools*.
