# Sanitization report — 2026-05-19

Outputs: `resume-sample-1.docx` (John Doe), `resume-sample-2.docx` (Jane Doe)

## resume-sample-1.docx

| Change | Count |
|--------|-------|
| University → University A, College of Computer Science | 1 |
| Outlier AI → Small Company A | 1 |
| ColorStack – Northeastern University → School Club 1 | 1 |
| Oasis – Northeastern University → School Club 2 | 1 |
| Husky Competitive Programming (Club) → Competitive Programming Club | 1 |
| Boston, MA → City, ST | 3 |
| Contact line → `edit_paragraph` (handles split runs) | 1 |

**Relaxed (unchanged in bullets):** ColorStack national board, EmptyNEU, MIT/Harvard/a16z/Allium, etc.

## resume-sample-2.docx

| Change | Count |
|--------|-------|
| Bryce Blaylock → Jane Doe | 1 |
| Phone → 555-555-5555 | 1 |
| Contact line → `edit_paragraph` | 1 |
| NEU business school → University A, School of Business | 1 |
| Honors line → generic + School Club 1 | 1 |
| TELO Trucks → Startup A | 1 |
| VOICEplug AI → Startup B | 1 |
| ColorStack - NEU → School Club 1 | 1 |
| Archimedes Research Club - NEU → School Club 2 | 1 |
| City of Oakland AI Research Project - NEU → School Club 3 | 1 |
| AI4ALL Ignite → Fellowship A | 1 |
| BobaTalks → Fellowship B | 1 |
| SF / Oakland / Boston → City, ST | 7 |

**Relaxed (unchanged in bullets):** Navigate Tech Hub, Northeastern-City of Oakland partnership wording, program details.

## Review before publish

- [ ] Open both files in Word — layout, one page, tables intact
- [ ] Confirm no real emails/phones remain
- [ ] Decide if bullet mentions of Northeastern / Navigate Tech Hub need strict-mode pass later

## Published for download (2026-05-19)

Copied to `../resume-sample-1.docx` and `../resume-sample-2.docx` — site serves Word downloads at `/assets/resume/samples/`.
