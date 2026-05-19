---
name: publish-gate
description: |
  Pre-publish checklist and Strapi sync for Navigate Tech Hub internal guides.
  Activate when user says: publish gate, publish guides, sync guides to Strapi,
  ship guides to CMS, republish internal articles, push drafts to Strapi.
---

# Publish Gate (redirect)

**Use `ship-internal-guide` instead** with `mode: publish` (or `mode: full`).

1. Invoke skill: **ship-internal-guide**
2. User paste: `slug: {slug}` + `mode: publish`
3. Agent reads `.cursor/skills/ship-internal-guide/references/publish.md`

Legacy full instructions were merged into that reference file.
