/**
 * Browser-safe http(s) links and Strapi media paths.
 * Blocks javascript:, data:, and other non-navigational schemes without requiring https-only
 * (legacy http:// career pages and redirects still work).
 */

const BLOCKED_PROTOCOL_PATTERN = /^(javascript|data|vbscript|file|blob):/i;

export function isSafeHttpHref(raw: string): boolean {
    const trimmed = raw.trim();
    if (!trimmed || trimmed === '#') return trimmed === '#';
    if (BLOCKED_PROTOCOL_PATTERN.test(trimmed)) return false;

    try {
        const parsed = new URL(trimmed);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
}

/** Returns a safe href or `#` when the value is missing or uses a dangerous scheme. */
export function sanitizeHttpHref(raw: string | undefined | null): string {
    const trimmed = raw?.trim() ?? '';
    if (!trimmed) return '#';
    if (trimmed === '#') return '#';
    if (!isSafeHttpHref(trimmed)) return '#';
    return trimmed;
}

/**
 * Strapi upload paths are relative (/uploads/...). Absolute values must be http(s).
 * Returns empty string when the value cannot be used in img/src.
 */
export function sanitizeStrapiMediaUrl(path: string, strapiBase: string): string {
    const trimmed = path.trim();
    if (!trimmed) return '';

    if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
        const base = strapiBase.replace(/\/$/, '');
        return `${base}${trimmed}`;
    }

    if (BLOCKED_PROTOCOL_PATTERN.test(trimmed)) return '';

    try {
        const parsed = new URL(trimmed);
        if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
            return parsed.href;
        }
    } catch {
        return '';
    }

    return '';
}

/** Escape user text embedded in GitHub markdown tables. */
export function escapeGitHubTableCell(value: string): string {
    return value.replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}
