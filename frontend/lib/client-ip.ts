/**
 * Client IP from reverse-proxy headers (Vercel sets x-forwarded-for / x-real-ip).
 */

export function clientIpFromHeaders(headers: Headers): string | undefined {
    const forwardedFor = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwardedFor) return forwardedFor;

    const realIp = headers.get('x-real-ip')?.trim();
    return realIp || undefined;
}

/** Stable key for in-memory rate limits when IP headers are missing. */
export function rateLimitKeyFromHeaders(headers: Headers): string {
    return clientIpFromHeaders(headers) ?? 'unknown';
}

function parseIpv4Octets(ipAddress: string): number[] | null {
    const parts = ipAddress.split('.');
    if (parts.length !== 4) return null;

    const octets = parts.map((part) => {
        if (!/^\d{1,3}$/.test(part)) return -1;
        const value = Number(part);
        if (value > 255) return -1;
        return value;
    });

    if (octets.some((octet) => octet < 0)) return null;
    return octets;
}

function isPrivateIpv4(ipAddress: string): boolean {
    const octets = parseIpv4Octets(ipAddress);
    if (!octets) return true;

    const [first, second] = octets;
    if (first === 10) return true;
    if (first === 127) return true;
    if (first === 192 && second === 168) return true;
    if (first === 169 && second === 254) return true;
    if (first === 172 && second >= 16 && second <= 31) return true;
    return false;
}

function normalizeIpv6(ipAddress: string): string {
    return ipAddress.trim().toLowerCase().replace(/^\[|\]$/g, '');
}

function firstIpv6HextetValue(ipAddress: string): number | null {
    const normalized = normalizeIpv6(ipAddress);
    const beforeCompression = normalized.split('::')[0];
    const firstSegment = beforeCompression.split(':').find((segment) => segment.length > 0);
    if (!firstSegment) return normalized === '::1' ? 0 : null;

    const padded = firstSegment.padStart(4, '0').slice(-4);
    const value = Number.parseInt(padded, 16);
    return Number.isNaN(value) ? null : value;
}

function isPrivateIpv6(ipAddress: string): boolean {
    const normalized = normalizeIpv6(ipAddress);
    if (normalized === '::1') return true;

    const embeddedIpv4 = normalized.match(/(?:^|:)(?:\d{1,3}:){0,4}(\d{1,3}(?:\.\d{1,3}){3})$/);
    if (embeddedIpv4) {
        return isPrivateIpv4(embeddedIpv4[1]);
    }

    const firstHextet = firstIpv6HextetValue(normalized);
    if (firstHextet === null) return true;

    // fc00::/7 unique local
    if ((firstHextet & 0xfe00) === 0xfc00) return true;
    // fe80::/10 link-local
    if ((firstHextet & 0xffc0) === 0xfe80) return true;

    return false;
}

export function isPrivateIp(ipAddress: string): boolean {
    const trimmed = ipAddress.trim();
    if (!trimmed) return true;

    if (trimmed.includes(':')) {
        return isPrivateIpv6(trimmed);
    }

    return isPrivateIpv4(trimmed);
}

/** Public client IP safe to send to Buttondown; undefined when absent or private/local. */
export function subscriberIpForButtondown(headers: Headers): string | undefined {
    const ipAddress = clientIpFromHeaders(headers);
    if (!ipAddress || isPrivateIp(ipAddress)) {
        return undefined;
    }
    return ipAddress;
}
