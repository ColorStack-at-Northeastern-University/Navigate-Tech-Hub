# Static assets (downloads & files)

Files here are served at `/assets/...` by Next.js (`frontend/public/`).

## Layout

| Path | Use |
|------|-----|
| `assets/resume/` | Resume templates (`.docx`) and anonymized sample resumes (`.docx`) |
| `assets/resume/samples/source/` | Original sample `.docx` (gitignored; see `docs/resume-sanitization.md`) |
| `assets/guides/` | Optional future: printable checklists, one-pagers tied to articles |
| `images/` (sibling) | Site UI only: logos, icons, marketing art |
| `fonts/` (sibling) | Self-hosted font files |

## Why separate from `images/`?

- **Different lifecycle:** downloads are versioned documents; images are tied to UI deploys.
- **Clear intent:** `assets/` = something a student saves to their machine; `images/` = something the page renders.
- **Easier permissions:** you can document who may add binaries without touching brand assets.

## Anonymized freshman samples

Workflow: [`docs/resume-sanitization.md`](../../../docs/resume-sanitization.md) — drop sources in `resume/samples/source/`, sanitize via MCP `docx-editor`, publish `.docx` to `resume/samples/`.

## Adding the Navigate resume template

1. Drag your file to: `public/assets/resume/navigate-tech-hub-resume-template.docx`
2. Keep that exact name (or update `frontend/lib/siteAssets.ts`).
3. Commit the file so Vercel/production can serve it (use Git LFS if the file is very large).

## URLs in code

Use `frontend/lib/siteAssets.ts` — do not hardcode paths in components.
