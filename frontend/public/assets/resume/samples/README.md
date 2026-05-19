# Resume samples (Word downloads)

## Adding sources (you)

1. Copy four original Word files into **`source/`** as:
   - `resume-sample-1.docx` … `resume-sample-4.docx`
2. Ask Cursor to run the sanitization workflow in [`internal-docs/resume-sanitization.md`](../../../../../internal-docs/resume-sanitization.md) (MCP `docx-editor`).
3. Copy reviewed sanitized docx into **this folder** (public downloads):
   - `resume-sample-1.docx` … `resume-sample-4.docx`
4. Set `downloadAvailable: true` for each sample in `resumeSectionData.ts`.
5. Run `node scripts/verify-static-assets.mjs` from repo root.

## Folders

| Folder | Contents |
|--------|----------|
| `source/` | Original docx (gitignored — may contain PII) |
| `sanitized/` | Scrubbed docx from agent (gitignored) |
| `resume-sample-*.docx` here | Public site downloads (commit when ready) |
