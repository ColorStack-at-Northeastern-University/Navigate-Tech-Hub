/**
 * Create a Buttondown email draft from a repo markdown file.
 *
 * Usage (repo root):
 *   node scripts/draft-buttondown-newsletter.mjs docs/newsletter/drafts/2026-05-21-sample-issue.md
 *   node scripts/draft-buttondown-newsletter.mjs path/to/issue.md --dry-run
 *   node scripts/draft-buttondown-newsletter.mjs path/to/issue.md --email-id em_xxx --send-test you@example.com
 *
 * Env: BUTTONDOWN_API_KEY (frontend/.env.local or shell)
 */

import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BUTTONDOWN_API_BASE = 'https://api.buttondown.com';

function loadEnvFile(path) {
    const out = {};
    if (!existsSync(path)) return out;
    for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
        if (!line || line.startsWith('#')) continue;
        const index = line.indexOf('=');
        if (index < 0) continue;
        const key = line.slice(0, index).trim();
        let value = line.slice(index + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        out[key] = value;
    }
    return out;
}

function resolveApiKey() {
    if (process.env.BUTTONDOWN_API_KEY?.trim()) {
        return process.env.BUTTONDOWN_API_KEY.trim();
    }
    const envPath = join(REPO_ROOT, 'frontend', '.env.local');
    const fromFile = loadEnvFile(envPath).BUTTONDOWN_API_KEY;
    if (fromFile?.trim()) return fromFile.trim();
    console.error('Missing BUTTONDOWN_API_KEY. Set in frontend/.env.local or the environment.');
    process.exit(1);
}

function parseDraftFile(raw) {
    const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!frontmatterMatch) {
        throw new Error('Draft must start with YAML frontmatter: ---\\nsubject: ...\\n---');
    }

    const frontmatter = frontmatterMatch[1];
    const body = frontmatterMatch[2].trim();
    const subjectLine = frontmatter.split(/\r?\n/).find((line) => line.startsWith('subject:'));
    if (!subjectLine) {
        throw new Error('Frontmatter must include subject: Your subject line');
    }

    const subject = subjectLine.replace(/^subject:\s*/i, '').trim();
    if (!subject || !body) {
        throw new Error('subject and body after frontmatter are required.');
    }

    return { subject, body };
}

async function patchDraft(apiKey, emailId, subject, body) {
    const response = await fetch(`${BUTTONDOWN_API_BASE}/v1/emails/${emailId}`, {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, body }),
    });

    const responseText = await response.text();
    if (!response.ok) {
        throw new Error(`Buttondown PATCH ${response.status}: ${responseText}`);
    }

    return JSON.parse(responseText);
}

async function sendDraftTest(apiKey, emailId, testEmailAddress) {
    const response = await fetch(`${BUTTONDOWN_API_BASE}/v1/emails/${emailId}/send-draft`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: testEmailAddress }),
    });

    const responseText = await response.text();
    if (!response.ok) {
        throw new Error(`Buttondown send-draft ${response.status}: ${responseText}`);
    }

    return responseText ? JSON.parse(responseText) : {};
}

async function createDraft(apiKey, subject, body) {
    const response = await fetch(`${BUTTONDOWN_API_BASE}/v1/emails`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subject,
            body,
            status: 'draft',
        }),
    });

    const responseText = await response.text();
    if (!response.ok) {
        throw new Error(`Buttondown API ${response.status}: ${responseText}`);
    }

    return JSON.parse(responseText);
}

function parseFlagValue(flag) {
    const index = process.argv.indexOf(flag);
    if (index < 0) return undefined;
    const inline = process.argv[index].includes('=')
        ? process.argv[index].split('=').slice(1).join('=')
        : undefined;
    if (inline) return inline;
    return process.argv[index + 1];
}

function main() {
    const dryRun = process.argv.includes('--dry-run');
    const sendTestEmail = parseFlagValue('--send-test');
    const emailId = parseFlagValue('--email-id');
    const draftPath = process.argv.slice(2).find((arg) => !arg.startsWith('--') && !arg.includes('@'));

    if (!draftPath) {
        console.error(
            'Usage: node scripts/draft-buttondown-newsletter.mjs <draft.md> [--dry-run] '
            + '[--email-id em_xxx] [--send-test you@example.com]',
        );
        process.exit(1);
    }

    const absolutePath = join(process.cwd(), draftPath);
    if (!existsSync(absolutePath)) {
        console.error(`File not found: ${absolutePath}`);
        process.exit(1);
    }

    const { subject, body } = parseDraftFile(readFileSync(absolutePath, 'utf8'));
    const payload = { subject, body, status: 'draft' };

    if (dryRun) {
        console.log(JSON.stringify(payload, null, 2));
        return;
    }

    const apiKey = resolveApiKey();

    const run = async () => {
        if (emailId) {
            await patchDraft(apiKey, emailId, subject, body);
            console.log('Draft updated in Buttondown.');
            console.log(`  id: ${emailId}`);
            console.log(`  subject: ${subject}`);
            if (sendTestEmail) {
                await sendDraftTest(apiKey, emailId, sendTestEmail);
                console.log(`  Test send requested → ${sendTestEmail}`);
            } else {
                console.log('  Open Buttondown → Emails → Send test, or pass --send-test you@example.com');
            }
            return;
        }

        const email = await createDraft(apiKey, subject, body);
        console.log('Draft created in Buttondown.');
        console.log(`  id: ${email.id}`);
        console.log(`  subject: ${email.subject ?? subject}`);
        if (sendTestEmail) {
            await sendDraftTest(apiKey, email.id, sendTestEmail);
            console.log(`  Test send requested → ${sendTestEmail}`);
        } else {
            console.log('  Open Buttondown → Emails → edit → Send test.');
        }
    };

    run().catch((error) => {
        console.error(error.message);
        process.exit(1);
    });
}

main();
