# Resume sample sanitization

Anonymize four freshman resume Word files before publishing PDFs on the resume page.

**Do not commit unsanitized `.docx` files** — they may contain real student PII. Raw inputs live in a gitignored folder; only anonymized PDFs (or reviewed sanitized docx) belong in version control.

## Folder layout

| Path | Purpose | Git |
|------|---------|-----|
| `frontend/public/assets/resume/samples/source/` | Drop **original** `.docx` here | Ignored (`*.docx`) |
| `frontend/public/assets/resume/samples/sanitized/` | Agent output after scrubbing | Ignored (`*.docx`) |
| `frontend/public/assets/resume/samples/resume-sample-{1–4}.docx` | Public downloads | Committed when ready |

### File names when you drop sources

Use exact names so the agent and docs stay aligned:

- `resume-sample-1.docx`
- `resume-sample-2.docx`
- `resume-sample-3.docx`
- `resume-sample-4.docx`

## Skill

Use the **resume-sample-sanitization** skill (`.cursor/skills/resume-sample-sanitization/SKILL.md`).

Rules and per-file aliases: [`docs/config/resume-sanitization-placeholders.json`](config/resume-sanitization-placeholders.json).

**Correct source path:** `frontend/public/assets/resume/samples/source/` (not `public/assets/resume/source`).

## MCP: `docx-editor`

Configured in [`.cursor/mcp.json`](../.cursor/mcp.json) as `docx-mcp-server` (`npx -y docx-mcp-server`).

After changing MCP config: **reload MCP in Cursor** (Settings → MCP, or restart Cursor).

### Quick prompt

```
Sanitize resume samples per resume-sample-sanitization skill and docs/config/resume-sanitization-placeholders.json.
Copy source → sanitized, relaxed bullets, edit_paragraph for contact line if replace_text misses split runs.
```

### Useful tools

| Tool | Use |
|------|-----|
| `search_text` | Find PII before replacing |
| `replace_text` | Bulk find/replace (`track_changes: false`) |
| `read_header_footer` | Contact line in header/footer |
| `edit_table_cell` | Bullets inside tables |

## Placeholder map

Edit [`docs/config/resume-sanitization-placeholders.json`](config/resume-sanitization-placeholders.json) when you know the real values in a source file. Add one `replacements` entry per distinct string (case-sensitive unless you use `case_sensitive: false` in MCP).

Personas (**John** / **Jane Doe**), locations (**City, ST**), and org aliases (**School Club N**, **Startup N**, **Small Company N**) are defined in the JSON config and skill. Bullets stay verbatim in relaxed mode except embedded PII.

## Human steps after MCP

1. Open each file in `samples/sanitized/` in Word — visual pass for missed PII, layout, one page.
2. Copy reviewed file to `frontend/public/assets/resume/samples/resume-sample-{N}.docx`.
3. Set `downloadAvailable: true` for that sample in `resumeSectionData.ts`.
4. Run from repo root: `node scripts/verify-static-assets.mjs` (optional docx should show `ok`).
5. Commit published **samples/*.docx** only (not `source/` or `sanitized/`).

## Code registry

- Paths: [`frontend/lib/siteAssets.ts`](../frontend/lib/siteAssets.ts)
- UI cards: [`frontend/components/sections/resumeSectionData.ts`](../frontend/components/sections/resumeSectionData.ts)

Sample download links point at `SITE_ASSETS.resume.samples.*`; they work once the matching PDF exists on disk.
