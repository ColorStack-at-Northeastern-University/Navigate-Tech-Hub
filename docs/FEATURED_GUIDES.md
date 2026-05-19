# Featured guides (editorial plan)

Homepage carousel pulls from Strapi `featured` flag. Until those articles ship, this is the target set.

## Priority queue

| Topic | Category | Why it belongs on the homepage |
|-------|----------|------------------------------|
| Interview questions (patterns + how to practice) | `interview-prep` | Highest anxiety, highest search intent |
| How to build a project students actually finish | `projects` | Unblocks resume + applications without an internship |
| Cold outreach (professors, recruiters, alumni) | `community` or `interview-prep` | Bridges "I have nothing" to research and referrals |
| First internship without prior experience | `interview-prep` | Directly answers the #1 fear |
| CS course planning at NEU | `classes` | NEU-specific, saves freshmen from bad sequencing |

## Carousel UX (current + next)

- **Now:** Horizontal carousel of Strapi-featured guides (`FeaturedGuideCarousel`).
- **Next:** When fewer than 3 are featured, show a "Coming soon" strip with the titles above (no dead links).
- **Cross-link:** Interview prep hub and `/resume` should link to the internship-without-experience guide when live.

## Strapi checklist per guide

1. Publish under the right category slug.
2. Set `featured: true` only when the article is complete enough to stand on the homepage.
3. Add `timeToReadMinutes` and a one-line description for the card.
