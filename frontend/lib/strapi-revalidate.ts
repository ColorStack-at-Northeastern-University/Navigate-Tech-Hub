import { STRAPI_TAG_EXTERNALS, STRAPI_TAG_GUIDES, strapiArticleTag } from '@/lib/strapi-cache-tags';

export interface StrapiWebhookPayload {
    event?: string;
    model?: string;
    uid?: string;
    entry?: Record<string, unknown>;
}

export function parseStrapiWebhookPayload(body: unknown): StrapiWebhookPayload | null {
    if (typeof body !== 'object' || body === null) return null;
    const record = body as Record<string, unknown>;
    const entry = record.entry;
    return {
        event: typeof record.event === 'string' ? record.event : undefined,
        model: typeof record.model === 'string' ? record.model : undefined,
        uid: typeof record.uid === 'string' ? record.uid : undefined,
        entry: typeof entry === 'object' && entry !== null ? (entry as Record<string, unknown>) : undefined,
    };
}

export function resolveRevalidateTags(payload: StrapiWebhookPayload): string[] {
    const tags = new Set<string>();
    const uid = payload.uid ?? '';
    const entry = payload.entry;

    if (uid.includes('resource') || payload.model === 'resource') {
        tags.add(STRAPI_TAG_GUIDES);
        const articleTag = articleTagFromEntry(entry);
        if (articleTag) tags.add(articleTag);
    }

    if (uid.includes('external-resource') || payload.model === 'external-resource') {
        tags.add(STRAPI_TAG_EXTERNALS);
        const relatedSlug = entry?.relatedArticleSlug;
        if (typeof relatedSlug === 'string') {
            const parts = relatedSlug.split('/').filter(Boolean);
            if (parts.length === 2) {
                tags.add(strapiArticleTag(parts[0], parts[1]));
            }
        }
    }

    if (tags.size === 0) {
        tags.add(STRAPI_TAG_GUIDES);
        tags.add(STRAPI_TAG_EXTERNALS);
    }

    return [...tags];
}

function articleTagFromEntry(entry: Record<string, unknown> | undefined): string | null {
    if (!entry) return null;
    const category = entry.category;
    const slug = entry.slug;
    if (typeof category !== 'string' || typeof slug !== 'string') return null;
    if (!category.trim() || !slug.trim()) return null;
    return strapiArticleTag(category, slug);
}
