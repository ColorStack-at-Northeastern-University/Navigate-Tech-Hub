import { expect, test } from '@playwright/test';
import { CATEGORIES } from '@/lib/constants';
import {
    assertArticlePageHealthy,
    assertExternalDirectoryHealthy,
    assertGuidesCatalogHealthy,
    assertNotFoundPage,
    assertPathsReturnOk,
    CATEGORY_HUB_PATHS,
    collectGuideHrefs,
    FOOTER_HUB_PATHS,
    isProdPlaywrightRun,
    PRIMARY_NAV_PATHS,
} from './helpers/public-health';

const describeProd = isProdPlaywrightRun() ? test.describe : test.describe.skip;

describeProd('public site edge cases @prod', () => {
    test('unknown article slug returns 404 page', async ({ page }) => {
        await assertNotFoundPage(
            page,
            '/interview-prep/navigate-playwright-nonexistent-slug-404',
        );
    });

    test('unknown category returns 404 page', async ({ page }) => {
        await assertNotFoundPage(page, '/not-a-real-category/some-article');
    });

    test('browse with trailing slash stays healthy', async ({ page }) => {
        const response = await page.goto('/browse/');
        expect(response?.ok()).toBeTruthy();
        await assertGuidesCatalogHealthy(page);
    });

    test('all primary navbar routes load', async ({ request }) => {
        await assertPathsReturnOk(request, [...PRIMARY_NAV_PATHS]);
    });

    test('footer hub links load from home', async ({ request }) => {
        await assertPathsReturnOk(request, [...FOOTER_HUB_PATHS]);
    });

    test('category hub pages respond without CMS outage', async ({ page, request }) => {
        await assertPathsReturnOk(request, [...CATEGORY_HUB_PATHS]);

        for (const hubPath of CATEGORY_HUB_PATHS) {
            await page.goto(hubPath);
            await assertGuidesCatalogHealthy(page);
            const category = CATEGORIES.find((entry) => `/${entry.slug}` === hubPath);
            if (category) {
                await expect(
                    page.getByRole('heading', { level: 1, name: category.label, exact: true }),
                ).toBeVisible();
            }
        }
    });

    test('about and resume pages load', async ({ page }) => {
        await page.goto('/about');
        await expect(page.getByRole('heading', { name: /about navigate tech hub/i })).toBeVisible();

        await page.goto('/resume');
        await expect(page.getByRole('link', { name: /navigate template/i })).toBeVisible();
    });

    test('start here card opens a healthy article when present', async ({ page }) => {
        await page.goto('/');
        await assertGuidesCatalogHealthy(page);

        const startHereLink = page.getByRole('link', { name: /start here/i }).first();
        if (!(await startHereLink.isVisible())) {
            test.skip(true, 'Start Here card not on homepage');
            return;
        }

        const href = await startHereLink.getAttribute('href');
        expect(href).toBeTruthy();
        const pathOnly = href!.startsWith('http') ? new URL(href!).pathname : href!.split('?')[0];
        await assertArticlePageHealthy(page, pathOnly);
    });

    test('external directory is not empty on prod', async ({ page }) => {
        await page.goto('/external-resources');
        await assertExternalDirectoryHealthy(page);
        await expect(page.locator('a[href^="http"]').first()).toBeVisible();
    });

    test('sampled external resource cards open in a new tab', async ({ page }) => {
        await page.goto('/external-resources');
        const externalLinks = page.locator('main a[href^="http"]');
        const sampleSize = Math.min(await externalLinks.count(), 5);
        expect(sampleSize).toBeGreaterThan(0);

        for (let index = 0; index < sampleSize; index += 1) {
            await expect(externalLinks.nth(index)).toHaveAttribute('target', '_blank');
            await expect(externalLinks.nth(index)).toHaveAttribute('rel', /noopener/);
        }
    });

    test('suggest API rejects GET without creating issues', async ({ request }) => {
        const response = await request.get('/api/suggest-resource');
        expect([405, 404]).toContain(response.status());
    });

    test('mobile viewport renders home and browse', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });

        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1, name: /Navigate/i })).toBeVisible();
        await assertGuidesCatalogHealthy(page);

        await page.goto('/browse');
        await assertGuidesCatalogHealthy(page);
        expect(await collectGuideHrefs(page)).not.toHaveLength(0);
    });

    test('404 page recovery links work', async ({ page, request }) => {
        await page.goto('/interview-prep/definitely-not-published-xyz');
        await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible();

        await page.getByRole('link', { name: /return to home/i }).click();
        await expect(page).toHaveURL(/\/$/);

        await assertPathsReturnOk(request, ['/browse', '/external-resources', '/faq']);
    });
});
