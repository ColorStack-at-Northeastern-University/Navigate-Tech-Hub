interface RateLimitRecord {
    count: number;
    windowStartedAt: number;
}

interface RateLimitResult {
    allowed: boolean;
    retryAfterSeconds?: number;
}

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_SECONDS = 60 * 60;
const rateLimitStore = new Map<string, RateLimitRecord>();

export function checkSuggestRateLimit(headers: Headers, now = Date.now()): RateLimitResult {
    const limit = positiveIntegerFromEnv(process.env.SUGGEST_RATE_LIMIT_MAX, DEFAULT_LIMIT);
    const windowSeconds = positiveIntegerFromEnv(
        process.env.SUGGEST_RATE_LIMIT_WINDOW_SECONDS,
        DEFAULT_WINDOW_SECONDS,
    );
    const windowMs = windowSeconds * 1000;
    const key = clientIpFromHeaders(headers);
    const current = rateLimitStore.get(key);

    if (!current || now - current.windowStartedAt >= windowMs) {
        rateLimitStore.set(key, { count: 1, windowStartedAt: now });
        return { allowed: true };
    }

    if (current.count >= limit) {
        const retryAfterSeconds = Math.max(
            1,
            Math.ceil((windowMs - (now - current.windowStartedAt)) / 1000),
        );
        return { allowed: false, retryAfterSeconds };
    }

    current.count += 1;
    return { allowed: true };
}

function positiveIntegerFromEnv(rawValue: string | undefined, fallback: number): number {
    const parsed = Number(rawValue);
    if (!Number.isInteger(parsed) || parsed <= 0) return fallback;
    return parsed;
}

function clientIpFromHeaders(headers: Headers): string {
    const forwardedFor = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    if (forwardedFor) return forwardedFor;

    return headers.get('x-real-ip')?.trim() || 'unknown';
}
