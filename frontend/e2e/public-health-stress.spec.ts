import { expect, test } from '@playwright/test';
import {
    assertGuidesCatalogHealthy,
    assertPathsReturnOk,
    ARTICLE_CRAWL_CAP,
    CATEGORY_HUB_PATHS,
    collectGuideHrefs,
    FOOTER_HUB_PATHS,
    isProdPlaywrightRun,
    PRIMARY_NAV_PATHS,
    STRESS_REQUEST_CONCURRENCY,
} from './helpers/public-health';

const describeProd = isProdPlaywrightRun() ? test.describe : test.describe.skip;

describeProd('public site stress @prod', () => {
    test.describe.configure({ timeout: 180_000 });

    test('parallel burst of primary routes and category hubs', async ({ request }) => {
        const burstPaths = [
            ...PRIMARY_NAV_PATHS,
            ...CATEGORY_HUB_PATHS,
            ...FOOTER_HUB_PATHS,
            '/suggest-resource',
        ];
        await assertPathsReturnOk(request, burstPaths, STRESS_REQUEST_CONCURRENCY);
    });

    test('parallel GET of all browse guide articles', async ({ page, request }) => {
        await page.goto('/browse');
        await assertGuidesCatalogHealthy(page);

        const guideHrefs = await collectGuideHrefs(page, ARTICLE_CRAWL_CAP);
        expect(guideHrefs.length).toBeGreaterThan(0);

        await assertPathsReturnOk(request, guideHrefs, STRESS_REQUEST_CONCURRENCY);
    });

    test('rapid navigation across core pages stays healthy', async ({ page }) => {
        const routeCycle = ['/', '/browse', '/external-resources', '/faq', '/contributions', '/browse'] as const;

        for (let lap = 0; lap < 3; lap += 1) {
            for (const path of routeCycle) {
                const response = await page.goto(path);
                expect(response?.ok(), `lap ${lap + 1} ${path}`).toBeTruthy();
            }

            if (lap === 0) {
                await assertGuidesCatalogHealthy(page);
            }
        }
    });

    test('browse survives repeated reloads', async ({ page }) => {
        await page.goto('/browse');
        await assertGuidesCatalogHealthy(page);

        for (let reload = 0; reload < 5; reload += 1) {
            await page.reload();
            await assertGuidesCatalogHealthy(page);
            const hrefs = await collectGuideHrefs(page);
            expect(hrefs.length).toBeGreaterThan(0);
        }
    });

    test('back-to-back CSV downloads both succeed', async ({ page }) => {
        await page.goto('/');
        const downloadButton = page.getByRole('button', { name: /download csv/i });
        await expect(downloadButton).toBeVisible();

        for (let attempt = 0; attempt < 2; attempt += 1) {
            const downloadPromise = page.waitForEvent('download');
            await downloadButton.click();
            const download = await downloadPromise;
            expect(download.suggestedFilename()).toMatch(/^colorstack-opportunities-/);
        }
    });

    test('external resources and homepage load under parallel browser contexts', async ({ browser }) => {
        const paths = ['/', '/external-resources', '/browse', '/faq'] as const;
        const contexts = await Promise.all(
            paths.map(() => browser.newContext()),
        );

        try {
            const results = await Promise.all(
                contexts.map(async (context, index) => {
                    const page = await context.newPage();
                    const response = await page.goto(paths[index]);
                    return response?.ok() ?? false;
                }),
            );
            expect(results.every(Boolean)).toBeTruthy();
        } finally {
            await Promise.all(contexts.map((context) => context.close()));
        }
    });
});
