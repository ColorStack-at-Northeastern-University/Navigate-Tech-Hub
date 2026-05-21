# UX reference

Primary actions and states per public route. Copy lives in components; this doc is the map for reviews and agents.

## Routes

| Route | Primary action | Data source |
|-------|----------------|-------------|
| `/` | Start Here / browse featured | Strapi + static opportunities |
| `/browse` | Open a guide | Strapi catalog |
| `/[category]` | Category hub | Strapi |
| `/[category]/[slug]` | Read article | Strapi `content` → markdown |
| `/external-resources` | Open vetted links | Strapi external resources |
| `/contributions` | Pick a contribution lane | Static copy + GitHub links |
| `/suggest-resource` | Submit suggestion form | POST → GitHub issue |
| `/faq` | Read Q&A | `frontend/lib/faqContent.ts` |
| `/resume` | Download template | Static files in `public/` |

## Empty and error states (guides)

| Condition | User sees | Code |
|-----------|-----------|------|
| Strapi down / token bad (prod) | “Guides temporarily unavailable” | `getGuidesUnavailableEmptyState()` |
| Zero published guides | “No guides published yet” (or category variant) | `resolveGuidesEmptyState` + `empty` |
| Normal | Card grid | `loadStatus === 'loaded'` |

Prod Playwright fails if home or browse shows unavailable **or** empty when live content is expected.

## External resource cards

- **Tools & communities:** entire card is one outbound link.
- **Recurring programs:** card links to careers hub; callout buttons use `stopPropagation` for calendar/hub actions.

Unsafe URL schemes from CMS are sanitized to `#` via `frontend/lib/safeUrl.ts`.

## Trust copy

FAQ states guides are human-edited and how to report issues (`/contributions#fix-content`). Keep FAQ aligned with `docs/PRODUCT.md` when product positioning changes.

## Value analytics

Vercel Web Analytics owns site-wide visitors and page views. Custom events track high-value outcomes only.

| Event | Question answered |
|-------|-------------------|
| `opportunity_outbound_click` | How many visitors left to apply through the ColorStack opportunity carousel? |
| `external_resource_outbound_click` | How many visitors used curated Strapi directory cards or careers hubs? |
| `meta_strip_outbound_click` | How often static job-board and conference pointers are used. |
| `article_engaged_60s` | How many visitors kept an article visible for at least one minute. |
| `asset_download` | How many visitors took resume samples, the Navigate template, CSV, or ICS files. |
| `outbound_click` | High-value external actions that are not downloads, such as Jake's Resume or Google Calendar. |
| `contribution_cta_click` | Which contribution lane gets intent before a completed submission. |
| `suggest_resource_submit` | How many resource suggestions were successfully submitted. |

## References

1. `docs/PRODUCT.md`
2. `frontend/lib/guides-catalog.ts`
3. `.cursor/skills/ux-product/` — merge gate for UI changes
