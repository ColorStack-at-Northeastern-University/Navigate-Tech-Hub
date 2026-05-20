export type NormalizedSuggestionUrl =
    | { ok: true; url: string }
    | { ok: false };

/**
 * Accepts pasted URLs with or without a scheme. Prepends https:// when missing,
 * then allows only http/https with a hostname.
 */
export function normalizeSuggestionUrl(rawUrl: string): NormalizedSuggestionUrl {
    const trimmed = rawUrl.trim();
    if (!trimmed) return { ok: false };

    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
        const parsed = new URL(withScheme);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return { ok: false };
        if (!parsed.hostname) return { ok: false };
        return { ok: true, url: parsed.toString() };
    } catch {
        return { ok: false };
    }
}
