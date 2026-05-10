/**
 * verify-findings.mjs — deterministic tiering of Opportunity Radar company findings.
 *
 * Reads ONLY docs/opportunities-radar/findings/*.md (no repo-wide walk).
 * Uses explicit predicates (see README in this folder). Default bias: Tier B
 * (review queue) instead of dropping when in doubt.
 *
 * Usage:
 *   node docs/opportunities-radar/scripts/verify-findings.mjs
 *   node docs/opportunities-radar/scripts/verify-findings.mjs --include-orgs
 *   node docs/opportunities-radar/scripts/verify-findings.mjs --strict
 *
 * Outputs (gitignored during merges by default):
 *   docs/opportunities-radar/scripts/output/verification-report.md
 *   docs/opportunities-radar/scripts/output/verification-report.jsonl
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const DEFAULT_FINDINGS = path.join(REPO_ROOT, 'docs', 'opportunities-radar', 'findings');
const DEFAULT_ALIASES = path.join(REPO_ROOT, 'docs', 'opportunities-radar', 'sources', 'aliases.md');
const DEFAULT_DENY = path.join(REPO_ROOT, 'docs', 'opportunities-radar', 'sources', 'deny-list.md');
const OUT_DIR = path.join(__dirname, 'output');

const PROGRAM_TYPES = new Set([
    'early-career-program',
    'fellowship',
    'pre-internship',
    'insight-event',
    'conference',
]);

const DEAD_ALIAS_PATTERN = /\b(CANCELLED|SHUT\s+DOWN|DOES\s+NOT\s+EXIST)\b/i;

function parseArgs(argv) {
    const args = { includeOrgs: false, strict: false };
    for (const a of argv) {
        if (a === '--include-orgs') args.includeOrgs = true;
        if (a === '--strict') args.strict = true;
    }
    return args;
}

function loadDenySlugs(denyPath) {
    const text = fs.readFileSync(denyPath, 'utf8');
    const slugs = new Set();
    for (const line of text.split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        const m = t.match(/^([a-z0-9-]+)\s*\|/i);
        if (m) slugs.add(m[1].toLowerCase());
    }
    return slugs;
}

/** @returns {{ oldName: string, newName: string, companySlug: string }[]} */
function loadAliases(aliasPath) {
    const text = fs.readFileSync(aliasPath, 'utf8');
    const rows = [];
    for (const line of text.split('\n')) {
        const t = line.trim();
        if (!t || t.startsWith('#')) continue;
        if (t.startsWith('Format:') || t.startsWith('---')) continue;
        const parts = t.split('|').map((s) => s.trim());
        if (parts.length < 3) continue;
        const [oldName, newName, companySlug] = parts;
        if (!oldName || !newName) continue;
        rows.push({ oldName, newName, companySlug });
    }
    return rows;
}

function parseFrontmatter(raw) {
    const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!m) return {};
    const block = m[1];
    const data = {};
    for (const line of block.split('\n')) {
        const kv = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
        if (kv) data[kv[1]] = kv[2].trim();
    }
    return data;
}

/**
 * Extract program sections: heading line is ### Title, body until next ### or ## at column 0.
 */
function extractPrograms(markdown) {
    const lines = markdown.split(/\r?\n/);
    const programs = [];
    let i = 0;
    while (i < lines.length) {
        const line = lines[i];
        if (line.startsWith('### ')) {
            const title = line.slice(4).trim();
            const bodyLines = [];
            i += 1;
            while (i < lines.length) {
                const L = lines[i];
                if (L.startsWith('### ') || (L.startsWith('## ') && !L.startsWith('###'))) break;
                bodyLines.push(L);
                i += 1;
            }
            programs.push({ title, body: bodyLines.join('\n') });
            continue;
        }
        i += 1;
    }
    return programs;
}

function parseKeyValueBlock(body) {
    const fields = {};
    for (const line of body.split('\n')) {
        const m = line.match(/^- ([a-zA-Z0-9_]+):\s*(.*)$/);
        if (m) fields[m[1]] = m[2].trim();
    }
    return fields;
}

function isHttpsUrl(s) {
    return /^https:\/\//i.test(s || '');
}

function aliasHardBlock(programTitle, fileSlug, aliases) {
    const normTitle = programTitle.toLowerCase().trim();
    for (const row of aliases) {
        if (!DEAD_ALIAS_PATTERN.test(row.newName)) continue;
        const old = row.oldName.toLowerCase().trim();
        if (normTitle === old || normTitle.includes(old)) {
            if (row.companySlug === '-' || row.companySlug.toLowerCase() === fileSlug.toLowerCase()) {
                return `ALIAS_DEAD:${row.oldName}→${row.newName}`;
            }
        }
    }
    return null;
}

function tierProgram({ fileSlug, fileStatus, programTitle, fields }, denySlugs, aliases, strict) {
    const reasons = [];

    if (denySlugs.has(fileSlug.toLowerCase())) {
        return { tier: 'C', code: 'DENY_LIST_COMPANY', reasons: ['B2: company slug on deny-list'] };
    }

    const ab = aliasHardBlock(programTitle, fileSlug, aliases);
    if (ab) {
        return { tier: 'C', code: 'ALIAS_PROGRAM', reasons: [`B3: ${ab}`] };
    }

    if (fileStatus === 'NO_PROGRAMS_FOUND' || fileStatus === 'BLOCKED') {
        return { tier: 'C', code: 'FILE_STATUS', reasons: [`B1: file status ${fileStatus}`] };
    }

    const url = fields.official_url || '';
    const ptype = fields.program_type || '';
    const window = fields.application_window_2026 || '';

    if (!url) {
        reasons.push('MISSING_OFFICIAL_URL');
    } else if (url.toUpperCase().includes('OFFICIAL URL NOT FOUND')) {
        reasons.push('SECONDARY_OR_UNKNOWN_URL');
    } else if (!isHttpsUrl(url)) {
        reasons.push('NON_HTTPS_URL');
    }

    if (!ptype) {
        reasons.push('MISSING_PROGRAM_TYPE');
    } else if (!PROGRAM_TYPES.has(ptype)) {
        reasons.push(`UNKNOWN_PROGRAM_TYPE:${ptype}`);
    }

    if (strict && /unknown/i.test(window)) {
        reasons.push('STRICT:APPLICATION_WINDOW_UNKNOWN');
    }

    const hardReasons = reasons.filter((r) => r.startsWith('UNKNOWN_PROGRAM_TYPE'));
    if (hardReasons.length) {
        return { tier: 'B', code: 'PARSE_ENUM', reasons };
    }

    if (
        isHttpsUrl(url)
        && PROGRAM_TYPES.has(ptype)
        && (!strict || !/unknown/i.test(window))
    ) {
        const soft = reasons.filter((r) => !r.startsWith('STRICT'));
        if (soft.length === 0) {
            return { tier: 'A', code: 'READY', reasons: ['A1–A4 satisfied'] };
        }
        return { tier: 'B', code: 'SOFT_SIGNAL', reasons };
    }

    return { tier: 'B', code: 'REVIEW_QUEUE', reasons: reasons.length ? reasons : ['INCOMPLETE_FIELDS'] };
}

function processCompanyFile(filePath, denySlugs, aliases, strict) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const fm = parseFrontmatter(raw);
    const slug = fm.slug || path.basename(filePath, '.md');
    const status = fm.status || 'UNKNOWN';
    const programs = extractPrograms(raw);
    const rows = [];

    if (status === 'NO_PROGRAMS_FOUND' || status === 'BLOCKED') {
        rows.push({
            kind: 'file',
            file: path.basename(filePath),
            slug,
            tier: 'C',
            title: null,
            reasons: [`B1: ${status}`],
        });
        return rows;
    }

    for (const p of programs) {
        const fields = parseKeyValueBlock(p.body);
        const t = tierProgram(
            { fileSlug: slug, fileStatus: status, programTitle: p.title, fields },
            denySlugs,
            aliases,
            strict,
        );
        rows.push({
            kind: 'program',
            file: path.basename(filePath),
            slug,
            tier: t.tier,
            title: p.title,
            official_url: fields.official_url || null,
            program_type: fields.program_type || null,
            application_window_2026: fields.application_window_2026 || null,
            code: t.code,
            reasons: t.reasons,
        });
    }
    return rows;
}

function main() {
    const args = parseArgs(process.argv.slice(2));
    const strict = args.strict;
    fs.mkdirSync(OUT_DIR, { recursive: true });

    const denySlugs = loadDenySlugs(DEFAULT_DENY);
    const aliases = loadAliases(DEFAULT_ALIASES);

    const findingsDir = DEFAULT_FINDINGS;
    const allRows = [];

    const names = fs
        .readdirSync(findingsDir)
        .filter((n) => n.endsWith('.md') && n !== '.gitkeep' && !n.startsWith('_orgs'));

    for (const name of names.sort()) {
        const fp = path.join(findingsDir, name);
        const stat = fs.statSync(fp);
        if (!stat.isFile()) continue;
        allRows.push(...processCompanyFile(fp, denySlugs, aliases, strict));
    }

    if (args.includeOrgs) {
        const orgDir = path.join(findingsDir, '_orgs');
        if (fs.existsSync(orgDir)) {
            for (const name of fs.readdirSync(orgDir).filter((n) => n.endsWith('.md') && n !== '.gitkeep').sort()) {
                const fp = path.join(orgDir, name);
                const slug = path.basename(name, '.md');
                const raw = fs.readFileSync(fp, 'utf8');
                const fm = parseFrontmatter(raw);
                const status = fm.status || 'UNKNOWN';
                if (denySlugs.has(slug.toLowerCase())) {
                    allRows.push({
                        kind: 'org-file',
                        file: `_orgs/${name}`,
                        slug,
                        tier: 'C',
                        title: null,
                        reasons: ['B2: org slug on deny-list'],
                    });
                    continue;
                }
                const programs = extractPrograms(raw);
                for (const p of programs) {
                    const fields = parseKeyValueBlock(p.body);
                    const t = tierProgram(
                        { fileSlug: slug, fileStatus: status, programTitle: p.title, fields },
                        denySlugs,
                        aliases,
                        strict,
                    );
                    allRows.push({
                        kind: 'org-program',
                        file: `_orgs/${name}`,
                        slug,
                        tier: t.tier,
                        title: p.title,
                        official_url: fields.official_url || null,
                        program_type: fields.program_type || null,
                        code: t.code,
                        reasons: t.reasons,
                    });
                }
            }
        }
    }

    const jsonlPath = path.join(OUT_DIR, 'verification-report.jsonl');
    const mdPath = path.join(OUT_DIR, 'verification-report.md');

    const ws = fs.createWriteStream(jsonlPath, { encoding: 'utf8' });
    for (const row of allRows) {
        ws.write(`${JSON.stringify(row)}\n`);
    }
    ws.end();

    const counts = { A: 0, B: 0, C: 0 };
    for (const r of allRows) {
        if (r.tier === 'A') counts.A += 1;
        else if (r.tier === 'B') counts.B += 1;
        else counts.C += 1;
    }

    const md = [];
    md.push('# Findings verification report');
    md.push('');
    md.push(`Generated: ${new Date().toISOString()}`);
    md.push(`Company files: ${names.length}`);
    md.push(`Tier A (ready): ${counts.A} · Tier B (review): ${counts.B} · Tier C (excluded): ${counts.C}`);
    md.push('');
    md.push('## Tier A');
    md.push('');
    for (const r of allRows.filter((x) => x.tier === 'A')) {
        md.push(`- **${r.slug}** — ${r.title || r.file} (${r.file})`);
    }
    md.push('');
    md.push('## Tier B (generous default — do not drop)');
    md.push('');
    for (const r of allRows.filter((x) => x.tier === 'B')) {
        md.push(`- **${r.slug}** — ${r.title || '(file)'} — ${r.reasons.join('; ')}`);
    }
    md.push('');
    md.push('## Tier C (hard excludes)');
    md.push('');
    for (const r of allRows.filter((x) => x.tier === 'C')) {
        md.push(`- **${r.slug}** — ${r.title || r.file} — ${(r.reasons || []).join('; ')}`);
    }
    md.push('');

    fs.writeFileSync(mdPath, md.join('\n'), 'utf8');

    // eslint-disable-next-line no-console
    console.log(`Wrote ${jsonlPath}`);
    // eslint-disable-next-line no-console
    console.log(`Wrote ${mdPath}`);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(counts));
}

main();
