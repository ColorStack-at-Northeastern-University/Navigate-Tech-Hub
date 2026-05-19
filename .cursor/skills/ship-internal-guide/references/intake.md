# Intake — what the user pastes

## Minimal (recommended)

```text
ship guide: coding-with-ai-learning-path
```

Defaults to `mode: full` if `draft/article.md` exists; else `from-brief` if only brief exists.

## Explicit

```text
slug: resume-for-tech-roles
mode: full
```

## Modes

| Mode | Runs |
| ---- | ---- |
| `full` | metadata (if needed) → A→B→C → publish |
| `metadata` | card summary, related/external JSON, frontmatter only |
| `pipeline` | Phase A→B→C only |
| `publish` | validate + Strapi publish only |
| `from-brief` | metadata + pipeline (assumes brief exists; no new synthesis) |

## Batch

```text
slugs:
- resume-for-tech-roles
- behavioral-story-bank
mode: pipeline
```

Parent: sequential metadata per slug, parallel pipeline sub-agents (max 3 concurrent), single publish at end.

## New guide (no folder yet)

User must confirm inventory row + run **article-synthesizer** first. Then:

```text
slug: new-slug-here
mode: from-brief
```

Metadata step may require inventory edit — ask once.
