import { NextRequest, NextResponse } from 'next/server';
import { subscriberIpForButtondown } from '@/lib/client-ip';
import { checkNewsletterRateLimit } from '@/lib/newsletter-rate-limit';

const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;
const BUTTONDOWN_TAG = process.env.BUTTONDOWN_NEWSLETTER_TAG?.trim();
const BUTTONDOWN_API_BASE = 'https://api.buttondown.com';

interface NewsletterPayload {
    email: string;
    source?: string;
    website?: string;
}

function normalizePayload(body: unknown): NewsletterPayload | null {
    if (typeof body !== 'object' || body === null) return null;
    const record = body as Record<string, unknown>;
    if (typeof record.email !== 'string') return null;

    const email = record.email.trim().toLowerCase();
    if (!isValidEmail(email)) return null;

    return {
        email,
        source: typeof record.source === 'string' ? record.source.trim().slice(0, 120) : undefined,
        website: typeof record.website === 'string' ? record.website.trim().slice(0, 200) : undefined,
    };
}

function isValidEmail(value: string): boolean {
    return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isAlreadySubscribed(status: number, body: string): boolean {
    if (status !== 400 && status !== 409) return false;
    return /email_already_exists|already subscribed|duplicate|exists/i.test(body);
}

export async function POST(request: NextRequest): Promise<NextResponse> {
    let rawBody: unknown;
    try {
        rawBody = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const payload = normalizePayload(rawBody);
    if (!payload) {
        return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 422 });
    }

    // Honeypot: pretend success so simple bots do not learn anything from the endpoint.
    if (payload.website) {
        return NextResponse.json({ ok: true }, { status: 202 });
    }

    const rateLimit = checkNewsletterRateLimit(request.headers);
    if (!rateLimit.allowed) {
        return NextResponse.json(
            { error: 'Too many signup attempts. Try again later.' },
            {
                status: 429,
                headers: rateLimit.retryAfterSeconds
                    ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
                    : undefined,
            },
        );
    }

    if (!BUTTONDOWN_API_KEY) {
        console.error('[newsletter] Missing BUTTONDOWN_API_KEY');
        return NextResponse.json(
            { error: 'Newsletter signup is not configured yet.' },
            { status: 503 },
        );
    }

    const subscriberIp = subscriberIpForButtondown(request.headers);
    const subscribeResponse = await fetch(`${BUTTONDOWN_API_BASE}/v1/subscribers`, {
        method: 'POST',
        headers: {
            Authorization: `Token ${BUTTONDOWN_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email_address: payload.email,
            ...(BUTTONDOWN_TAG ? { tags: [BUTTONDOWN_TAG] } : {}),
            ...(subscriberIp ? { ip_address: subscriberIp } : {}),
        }),
    });

    if (!subscribeResponse.ok) {
        const errorText = await subscribeResponse.text().catch(() => '(no body)');
        if (isAlreadySubscribed(subscribeResponse.status, errorText)) {
            return NextResponse.json({ ok: true, alreadySubscribed: true }, { status: 200 });
        }

        console.error('[newsletter] Buttondown API error', subscribeResponse.status, errorText);
        return NextResponse.json(
            { error: 'Could not join the update list right now. Try again later.' },
            { status: 502 },
        );
    }

    return NextResponse.json({ ok: true }, { status: 201 });
}
