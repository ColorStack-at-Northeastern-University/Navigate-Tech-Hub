# Strapi publish checklist — Start Here anchor

Use these values when you publish in **Content Manager → Resource** (or extend the bulk publish script later).

| Field | Suggested value |
|-------|-----------------|
| **slug** | `start-here-navigate-tech-hub` |
| **title** | _Your title — e.g. "Start Here: Why Navigate Tech Hub Exists"_ |
| **category** | `community` |
| **audienceStage** | `first-semester` |
| **timeToReadMinutes** | `5` (adjust after you finish writing) |
| **contentVolatility** | `low` |
| **outcome** | _One sentence — e.g. "Know why this hub exists, how to use it, and which guides to open first."_ |
| **description** | First paragraph of the article (shows on cards if listed elsewhere) |
| **content** | Paste from `draft/article.md` |
| **startHere** | **`true`** (only this article) |
| **featured** | optional `true` |
| **relatedArticles** | Pick 2–3 batch-1 guides, e.g. `cs-course-planning-neu`, `first-internship-without-experience`, `colorstack-nsbe-afrotech-guide` |

**Important:** Turn **`startHere` off** on any other Resource that had it before. The homepage shows the newest published entry with `startHere: true`.

Route when published: `/community/start-here-navigate-tech-hub`
