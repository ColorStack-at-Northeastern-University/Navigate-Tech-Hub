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

## References

1. `docs/PRODUCT.md`
2. `frontend/lib/guides-catalog.ts`
3. `.cursor/skills/ux-product/` — merge gate for UI changes
