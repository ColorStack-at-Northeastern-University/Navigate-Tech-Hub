import type { NextConfig } from 'next';

const strapiOrigin = (() => {
    try {
        return new URL(process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337').origin;
    } catch {
        return 'http://localhost:1337';
    }
})();

const securityHeaders = [
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
        key: 'Content-Security-Policy',
        value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
            "style-src 'self' 'unsafe-inline'",
            `img-src 'self' data: blob: https: ${strapiOrigin}`,
            "font-src 'self'",
            `connect-src 'self' ${strapiOrigin} https://vitals.vercel-insights.com`,
            "frame-ancestors 'self'",
            "base-uri 'self'",
            "form-action 'self'",
        ].join('; '),
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
