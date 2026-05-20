import { expect, type APIRequestContext, type Page } from '@playwright/test';
import { CATEGORIES, NAV_LINKS } from '@/lib/constants';

/** Guide categories exposed on /browse (ResourceCard hrefs). */
const GUIDE_CATEGORIES = 'interview-prep|classes|projects|hackathons|community';

export const GUIDE_HREF_PATTERN = new RegExp(
    `^/(${GUIDE_CATEGORIES})/[^/]+/?$`,
);

/** Max articles to visit so a bad deploy cannot hammer prod or run too long. */
export const ARTICLE_CRAWL_CAP = 50;

/** Parallel GET batch size for stress requests against prod. */
export const STRESS_REQUEST_CONCURRENCY = 8;

const CMS_OUTAGE_HEADINGS = [
    /guides temporarily unavailable/i,
    /no guides published yet/i,
] as const;

const EXTERNAL_EMPTY_HEADING = /no external links yet/i;

export const PRIMARY_NAV_PATHS = NAV_LINKS.map((link) => link.href);

export const FOOTER_HUB_PATHS = ['/faq', '/suggest-resource', '/contributions'] as const;

export const CATEGORY_HUB_PATHS = CATEGORIES.map((category) => `/${category.slug}`);

export function isProdPlaywrightRun(): boolean {
    const baseUrl = process.env.PLAYWRIGHT_BASE_URL?.replace(/\/$/, '') ?? '';
    return Boolean(baseUrl && !/localhost|127\.0\.0\.1/i.test(baseUrl));
}

export function normalizeInternalPath(href: string): string | null {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return null;

    let pathOnly: string;
    if (/^https?:\/\//i.test(href)) {
        try {
            pathOnly = new URL(href).pathname;
        } catch {
            return null;
        }
    } else {
        pathOnly = href.split('?')[0].split('#')[0];
    }

    if (!pathOnly.startsWith('/')) return null;
    return pathOnly.replace(/\/$/, '') || '/';
}

/** Fails when Strapi is down or the catalog is empty when it should not be. */
export async function assertGuidesCatalogHealthy(page: Page): Promise<void> {
    for (const pattern of CMS_OUTAGE_HEADINGS) {
        await expect(page.getByRole('heading', { name: pattern })).toHaveCount(0);
    }
}

export async function assertExternalDirectoryHealthy(page: Page): Promise<void> {
    await expect(page.getByRole('heading', { name: EXTERNAL_EMPTY_HEADING })).toHaveCount(0);
}

export async function collectGuideHrefs(page: Page, cap = ARTICLE_CRAWL_CAP): Promise<string[]> {
    const seen = new Set<string>();
    const anchors = page.locator('a[href]');
    const count = await anchors.count();

    for (let index = 0; index < count && seen.size < cap; index += 1) {
        const href = await anchors.nth(index).getAttribute('href');
        if (!href) continue;

        const pathOnly = normalizeInternalPath(href);
        if (pathOnly && GUIDE_HREF_PATTERN.test(pathOnly)) {
            seen.add(pathOnly);
        }
    }

    return [...seen].slice(0, cap);
}

export async function assertArticlePageHealthy(page: Page, articlePath: string): Promise<void> {
    const response = await page.goto(articlePath);
    expect(response?.ok(), `expected 200 for ${articlePath}, got ${response?.status()}`).toBeTruthy();

    const prose = page.locator('article .article-prose');
    await expect(prose).toBeVisible({ timeout: 30_000 });
    await expect(prose).not.toContainText(/slug:\s*\S+/i);
    await expect(prose).not.toContainText(/draftStatus:\s*\S+/i);
    await expect(prose.locator('h2').first()).toBeVisible();
}

export async function assertNotFoundPage(page: Page, path: string): Promise<void> {
    const response = await page.goto(path);
    expect(response?.status(), `expected 404 for ${path}`).toBe(404);
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible();
    await expect(page.getByRole('link', { name: /return to home/i })).toBeVisible();
}

export async function assertPathsReturnOk(
    request: APIRequestContext,
    paths: string[],
    concurrency = STRESS_REQUEST_CONCURRENCY,
): Promise<void> {
    for (let offset = 0; offset < paths.length; offset += concurrency) {
        const chunk = paths.slice(offset, offset + concurrency);
        const responses = await Promise.all(chunk.map((path) => request.get(path)));

        for (let index = 0; index < responses.length; index += 1) {
            const path = chunk[index];
            const response = responses[index];
            expect(
                response.ok(),
                `${path} → HTTP ${response.status()}`,
            ).toBeTruthy();
        }
    }
}
