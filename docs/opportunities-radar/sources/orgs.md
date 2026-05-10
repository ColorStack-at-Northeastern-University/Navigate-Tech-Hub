# Opportunity Radar — Org Sources
# Format: <slug> | <display name> | <public archive URL>
#
# These are public newsletter archives, newsrooms, and event calendars
# that the org-source variant of the skill diffs weekly.
# No inbox auth, no IMAP — public pages only.
#
# When the agent runs the org-source pass, it:
#   1. Fetches the page
#   2. Extracts new entries since last_run (from findings/_orgs/<slug>.md)
#   3. Writes updated findings/_orgs/<slug>.md with the diff

# ─────────────────────────────────────────────────────────────
# PRIMARY ORG SOURCES (confirmed public archives as of May 2026)
# ─────────────────────────────────────────────────────────────

colorstack-updates   | ColorStack Updates             | https://www.colorstack.org/news
nsbe-news            | NSBE Newsroom                  | https://www.nsbe.org/news
afrotech-articles    | AfroTech Articles              | https://afrotech.com/category/news
codepath-news        | CodePath Newsroom              | https://www.codepath.org/news
mlt-news             | MLT News                       | https://mlt.org/news/
seo-news             | SEO News                       | https://www.seo-usa.org/news/
rewriting-the-code   | Rewriting the Code Updates     | https://rewritingthecode.org/news
ai4all-news          | AI4ALL News                    | https://ai-4-all.org/news/

# ─────────────────────────────────────────────────────────────
# NORTHEASTERN-SPECIFIC SOURCES
# ─────────────────────────────────────────────────────────────

khoury-career        | Khoury Co-op & Career          | https://www.khoury.northeastern.edu/co-op/
neu-career-events    | NEU Career Design Events       | https://careers.northeastern.edu/events/
neu-colorstack       | ColorStack @ Northeastern      | https://www.colorstack.org/chapters/northeastern-university

# ─────────────────────────────────────────────────────────────
# ADDITIONAL SOURCES (added from May 2026 web research)
# ─────────────────────────────────────────────────────────────

outintech-news       | Out in Tech News               | https://outintech.com/news/
latinas-in-tech      | Latinas in Tech                | https://latinasintech.org/news/
formation-updates    | Formation (Netflix pipeline)   | https://formation.dev/blog
brilliant-black      | Brilliant Black Minds          | https://brilliantblackminds.co
base-fellowship      | BASE Fellowship                | https://www.basefellowship.org/news
hsf-news             | Hispanic Scholarship Fund      | https://www.hsf.net/news
nsf-reu-cs           | NSF REU Computer Science       | https://www.nsf.gov/crssprgm/reu/reu_search.jsp

# ─────────────────────────────────────────────────────────────
# VERIFY BEFORE NEXT RUN (public archive existence uncertain)
# ─────────────────────────────────────────────────────────────

codeland-archive     | Codeland / dev.to C: Community | VERIFY — check https://dev.to/codeland or https://codeland.org
basta-updates        | BASTA Fellowship               | https://www.projectbasta.com/news
