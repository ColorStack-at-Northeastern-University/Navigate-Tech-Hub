---
name: resume-sample-sanitization
description: |
  Anonymize Navigate freshman resume sample .docx files for public PDF download.
  Applies persona placeholders, school vs employer aliases, relaxed bullets.
  Activate when user says: sanitize resume, anonymize resume sample, scrub resume docx,
  resume PII, run resume sanitization.
---

# Resume sample sanitization

## Product context

Published samples on `/resume` must not expose student PII or easy re-identification via school-specific headers. **Bullet achievement text stays verbatim** (relaxed mode): hackathon names, tools, metrics, and org names inside bullets are kept.

Config: [`docs/config/resume-sanitization-placeholders.json`](../../docs/config/resume-sanitization-placeholders.json)  
Folders: [`docs/resume-sanitization.md`](../../docs/resume-sanitization.md)

## Paths (repo root relative)

| Role | Path |
|------|------|
| Source (gitignored) | `frontend/public/assets/resume/samples/source/resume-sample-{N}.docx` |
| Output (gitignored) | `frontend/public/assets/resume/samples/sanitized/resume-sample-{N}.docx` |
| Public downloads | `frontend/public/assets/resume/samples/resume-sample-{N}.docx` |

**Not** `public/assets/resume/source` — use `samples/source/` above.

## MCP

Use **`docx-editor`** (`docx-mcp-server`). Every edit: `track_changes: false`, `include_headers_footers: true` when replacing contact info.

## Persona (pick one per file)

| Field | John | Jane |
|-------|------|------|
| Name | John Doe | Jane Doe |
| Phone | 555-555-5555 | 555-555-5555 |
| Email | johndoe@gmail.com | janedoe@gmail.com |
| LinkedIn | linkedin.com/in/johndoe | linkedin.com/in/janedoe |
| GitHub | github.com/johndoe | github.com/janedoe |
| Location lines | City, ST | City, ST |

Normalize URLs: strip `https://`, `www.`, fix typos to match persona handle.

## Organization aliases (header / education lines only)

Assign in **document order** of first appearance. **Do not rewrite bullets** unless Tier A PII appears inside a bullet.

| Kind | Label pattern | When to use |
|------|---------------|-------------|
| **School club** | School Club 1, 2, 3… | Campus orgs, chapter projects, research clubs tied to a university |
| **Startup** | Startup A, B, C… | Early-stage / intern-at-startup employers (often SF, “Intern”, MVP language) |
| **Small company** | Small Company A, B… | Established but low-profile employers, contract AI training shops, etc. |
| **University** | University A, {College name generic} | Replace real school + college names |
| **Fellowship** (optional) | Fellowship A, B… | Professional development blocks that are programs, not jobs |

Examples:

- `ColorStack – Northeastern University` / `ColorStack - Northeastern University` → **School Club 1**
- `Oasis – Northeastern University` → **School Club 2**
- `Outlier AI` → **Small Company A**
- `TELO Trucks` → **Startup A**
- `VOICEplug AI` → **Startup B**

## Education substitutions

- `Northeastern University, Khoury College of Computer Science` → `University A, College of Computer Science`
- `Northeastern University, D'Amore-McKim School of Business` → `University A, School of Business`
- `Husky Competitive Programming (Club)` → `Competitive Programming Club`
- Named honors (Martinson, Ujima, etc.) → generic equivalents in config `educationReplacements`
- All `Boston, MA` / `Oakland, CA` / `San Francisco, CA` on **location columns** → `City, ST`

## Relaxed bullets (default)

**Keep unchanged:** project titles, bullet copy, hackathon/sponsor names, `EmptyNEU`, in-bullet `ColorStack national board`, etc.

**Still replace inside bullets if present:** emails, phones, personal URLs, student legal name.

## Orchestration

1. List `samples/source/*.docx` to process.
2. Copy each file to `samples/sanitized/` (never edit source in place).
3. `read_document` + `search_text` for `@`, phone patterns, `linkedin`, `github`, `.edu`, `Northeastern`, known employers from config.
4. Merge **file-specific** `replacements` from JSON with global rules; apply longest-first via `replace_text`.
5. `read_header_footer` on each sanitized file; second pass for missed contact lines.
6. If `replace_text` returns 0 matches but `search_text` finds contact handles, use **`edit_paragraph`** on block index `1` with the full persona contact line.
7. Run validation checklist (below).
8. Copy reviewed outputs to `samples/resume-sample-{N}.docx`; set `downloadAvailable: true` in `resumeSectionData.ts`.
9. Emit report.

### Suggested persona per sample file

| File | Default persona |
|------|-----------------|
| resume-sample-1.docx | John |
| resume-sample-2.docx | Jane |
| resume-sample-3.docx | John |
| resume-sample-4.docx | Jane |

## Validation checklist

- [ ] No email except persona gmail
- [ ] No phone except `555-555-5555`
- [ ] LinkedIn/GitHub paths use persona handle only
- [ ] No `Northeastern`, `Khoury`, `D'Amore`, `Husky` in **headers/education**
- [ ] Employer header lines use Startup / Small Company / School Club labels only
- [ ] Location columns use `City, ST`
- [ ] Source files untouched; outputs only in `sanitized/`

## Output

```text
## Resume sanitization — {date}

Files: resume-sample-1.docx, ...
Persona: John / Jane
Replacements: N total (list any 0-match searches)
Flags: [ambiguous strings for human review]

Outputs: frontend/public/assets/resume/samples/sanitized/
Next: copy sanitized docx → samples/resume-sample-{N}.docx → enable download in resumeSectionData.ts
```

## Hard rules

- Never commit `source/` or `sanitized/` `.docx` (gitignored).
- Never invent replacement text outside config personas and alias tables.
- Do not change bullet wording in relaxed mode except Tier A PII.
