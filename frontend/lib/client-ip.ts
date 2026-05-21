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

export function isPrivateIp(ipAddress: string): boolean {
    return ipAddress === '127.0.0.1'
        || ipAddress === '::1'
        || ipAddress.startsWith('192.168.')
        || ipAddress.startsWith('10.');
}

/** Public client IP safe to send to Buttondown; undefined when absent or private/local. */
export function subscriberIpForButtondown(headers: Headers): string | undefined {
    const ipAddress = clientIpFromHeaders(headers);
    if (!ipAddress || isPrivateIp(ipAddress)) {
        return undefined;
    }
    return ipAddress;
}
