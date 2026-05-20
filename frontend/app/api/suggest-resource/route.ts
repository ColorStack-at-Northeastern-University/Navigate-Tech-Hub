import { NextRequest, NextResponse } from 'next/server';
import { checkSuggestRateLimit } from '@/lib/suggest-rate-limit';

/**
 * POST /api/suggest-resource
 *
 * Validates a structured resource suggestion and creates a GitHub Issue
 * in the hub repository. The issue is labelled `resource-suggestion` so a
 * weekly agent can triage and batch-review them.
 *
 * Required env vars (set in .env.local / Vercel dashboard):
 *   GITHUB_SUGGEST_TOKEN — fine-grained PAT with Issues:write on the hub repo
 *   GITHUB_REPO_OWNER    — e.g. "navigate-tech-hub"
 *   GITHUB_REPO_NAME     — e.g. "Navigate-Tech-Hub"
 *
 * Rate limiting is best-effort per serverless instance. It protects beta
 * traffic from accidental/spiky abuse without introducing external infra.
 */

const GITHUB_TOKEN = process.env.GITHUB_SUGGEST_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;

interface SuggestionPayload {
    resourceName: string;
    url: string;
    suggestedTier: string;
    suggestedCategory: string;
    whyItMatters: string;
    contact?: string;
}

function validatePayload(body: unknown): SuggestionPayload | null {
    if (typeof body !== 'object' || body === null) return null;
    const b = body as Record<string, unknown>;
    if (
        typeof b.resourceName !== 'string' || b.resourceName.trim().length === 0
        || typeof b.url !== 'string' || b.url.trim().length === 0
        || typeof b.suggestedTier !== 'string'
        || typeof b.suggestedCategory !== 'string'
        || typeof b.whyItMatters !== 'string' || b.whyItMatters.trim().length < 10
    ) {
        return null;
    }
    return {
        resourceName: b.resourceName.trim().slice(0, 200),
        url: b.url.trim().slice(0, 500),
        suggestedTier: b.suggestedTier,
        suggestedCategory: b.suggestedCategory,
        whyItMatters: b.whyItMatters.trim().slice(0, 2000),
        contact: typeof b.contact === 'string' ? b.contact.trim().slice(0, 200) : undefined,
    };
}

function isAllowedSuggestionUrl(rawUrl: string): boolean {
    try {
        const parsedUrl = new URL(rawUrl);
        return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
    } catch {
        return false;
    }
}

/**
 * Machine-readable block matches `.github/ISSUE_TEMPLATE/resource-suggestion.yml`
 * field ids so agents/scripts can parse issues filed via the site or GitHub UI.
 */
function buildIssueBody(payload: SuggestionPayload): string {
    return `<!-- navigate-suggestion: resource-suggestion v1 -->

## Resource Suggestion

| Field | Value |
|-------|-------|
| resource-name | ${payload.resourceName} |
| url | ${payload.url} |
| suggested-tier | ${payload.suggestedTier} |
| suggested-category | ${payload.suggestedCategory} |
| contact | ${payload.contact ?? '_none_'} |

### Why it matters

${payload.whyItMatters}

---
_Submitted via the Navigate Tech Hub suggestion form. Review before merging into Strapi._
`;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    if (!GITHUB_TOKEN || !REPO_OWNER || !REPO_NAME) {
        console.error('[suggest-resource] Missing GitHub env vars — GITHUB_SUGGEST_TOKEN, GITHUB_REPO_OWNER, GITHUB_REPO_NAME');
        return NextResponse.json(
            { error: 'Suggestion service is not configured. Contact the site admin.' },
            { status: 503 },
        );
    }

    const rateLimit = checkSuggestRateLimit(request.headers);
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { error: 'Too many suggestions. Try again later.' },
            {
                status: 429,
                headers: rateLimit.retryAfterSeconds
                    ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
                    : undefined,
            },
        );
    }

    let rawBody: unknown;
    try {
        rawBody = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const payload = validatePayload(rawBody);
    if (!payload) {
        return NextResponse.json(
            { error: 'Missing or invalid fields. resourceName, url, and whyItMatters are required.' },
            { status: 422 },
        );
    }

    if (!isAllowedSuggestionUrl(payload.url)) {
        return NextResponse.json(
            { error: 'Enter a valid http or https URL for the resource.' },
            { status: 422 },
        );
    }

    const issueBody = {
        title: `[Suggestion] ${payload.resourceName}`,
        body: buildIssueBody(payload),
        labels: ['resource-suggestion', 'triage'],
    };

    const ghResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(issueBody),
        },
    );

    if (!ghResponse.ok) {
        const errorText = await ghResponse.text().catch(() => '(no body)');
        console.error('[suggest-resource] GitHub API error', ghResponse.status, errorText);
        return NextResponse.json(
            { error: 'Failed to create suggestion. Try again later.' },
            { status: 502 },
        );
    }

    const created = await ghResponse.json() as { html_url: string; number: number };
    return NextResponse.json({ issueUrl: created.html_url, number: created.number }, { status: 201 });
}
