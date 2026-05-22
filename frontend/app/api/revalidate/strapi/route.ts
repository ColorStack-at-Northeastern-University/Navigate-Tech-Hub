import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { parseStrapiWebhookPayload, resolveRevalidateTags } from '@/lib/strapi-revalidate';

/**
 * POST /api/revalidate/strapi
 *
 * Strapi Cloud webhook target (Settings → Webhooks). Invalidates Next fetch cache
 * tags so published CMS changes appear without waiting for STRAPI_REVALIDATE_SECONDS.
 *
 * Required: STRAPI_REVALIDATE_SECRET — shared secret; send as header:
 *   X-Revalidate-Secret: <secret>
 *
 * Optional: configure the same value in Strapi webhook custom headers.
 */

export async function POST(request: NextRequest): Promise<NextResponse> {
    const configuredSecret = process.env.STRAPI_REVALIDATE_SECRET?.trim();
    if (!configuredSecret) {
        console.error('[revalidate/strapi] Missing STRAPI_REVALIDATE_SECRET');
        return NextResponse.json({ error: 'Revalidation is not configured.' }, { status: 503 });
    }

    const providedSecret = request.headers.get('x-revalidate-secret')?.trim();
    if (!providedSecret || providedSecret !== configuredSecret) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
    }

    const payload = parseStrapiWebhookPayload(body);
    if (!payload) {
        return NextResponse.json({ error: 'Unrecognized webhook payload.' }, { status: 422 });
    }

    const tags = resolveRevalidateTags(payload);
    for (const tag of tags) {
        revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({
        ok: true,
        event: payload.event ?? null,
        revalidatedTags: tags,
    });
}
