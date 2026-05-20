import { expect, test } from '@playwright/test';
import {
    assertArticlePageHealthy,
    assertGuidesCatalogHealthy,
    collectGuideHrefs,
    isProdPlaywrightRun,
} from './helpers/public-health';

const describeProd = isProdPlaywrightRun() ? test.describe : test.describe.skip;

describeProd('public site health @prod', () => {
    test('home loads without CMS empty or outage states', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1, name: /Navigate/i })).toBeVisible();
        await assertGuidesCatalogHealthy(page);
    });

    test('browse lists guides without CMS empty or outage states', async ({ page }) => {
        await page.goto('/browse');
        await expect(page.getByRole('heading', { name: /browse all resources/i })).toBeVisible();
        await assertGuidesCatalogHealthy(page);

        const guideHrefs = await collectGuideHrefs(page);
        expect(guideHrefs.length, 'browse should expose at least one guide link').toBeGreaterThan(0);
    });

    test('every browse guide link renders a healthy article', async ({ page }) => {
        await page.goto('/browse');
        await assertGuidesCatalogHealthy(page);

        const guideHrefs = await collectGuideHrefs(page);
        expect(guideHrefs.length).toBeGreaterThan(0);

        for (const href of guideHrefs) {
            await assertArticlePageHealthy(page, href);
        }
    });

    test('featured section has a working guide link', async ({ page }) => {
        await page.goto('/');
        await assertGuidesCatalogHealthy(page);

        const featuredSection = page.locator('section').filter({
            has: page.getByText(/^featured guides$/i),
        });
        const featuredLinks = featuredSection.locator('a[href^="/"]');

        const count = await featuredLinks.count();
        if (count === 0) {
            test.skip(true, 'no featured guides in carousel');
            return;
        }

        const firstHref = await featuredLinks.first().getAttribute('href');
        expect(firstHref).toBeTruthy();
        const pathOnly = firstHref!.startsWith('http')
            ? new URL(firstHref!).pathname
            : firstHref!.split('?')[0];

        await assertArticlePageHealthy(page, pathOnly);
    });

    test('external resources directory loads', async ({ page }) => {
        await page.goto('/external-resources');
        await expect(page.getByRole('heading', { name: /external resources directory/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /recurring programs/i })).toBeVisible();
        await expect(page.getByText(/student conferences & recruiting events/i)).toBeVisible();
    });

    test('ColorStack CSV download triggers', async ({ page }) => {
        await page.goto('/');
        const downloadButton = page.getByRole('button', { name: /download csv/i });
        await expect(downloadButton).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await downloadButton.click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toMatch(/^colorstack-opportunities-\d{4}-\d{2}-\d{2}\.csv$/);
    });

    test('program reminders ICS download triggers when offered', async ({ page }) => {
        await page.goto('/external-resources');
        const downloadButton = page.getByRole('button', { name: /download all reminders/i });

        if (!(await downloadButton.isVisible())) {
            test.skip(true, 'no recurring programs with generatable reminders');
            return;
        }

        const downloadPromise = page.waitForEvent('download');
        await downloadButton.click();
        const download = await downloadPromise;

        expect(download.suggestedFilename()).toBe('navigate-program-reminders.ics');
    });

    test('faq contributions and suggest pages render', async ({ page }) => {
        await page.goto('/faq');
        await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();

        await page.goto('/contributions');
        await expect(page.getByRole('heading', { name: /help build the hub/i })).toBeVisible();

        await page.goto('/suggest-resource');
        await expect(page.getByRole('heading', { name: /suggest a resource/i })).toBeVisible();
        await expect(page.getByLabel(/resource name/i)).toBeVisible();
    });
});
