import { expect, test, type Page } from '@playwright/test';
import { collectGuideHrefs } from './helpers/public-health';

async function openFirstBrowseArticle(page: Page): Promise<string> {
    await page.goto('/browse');
    const guideHrefs = await collectGuideHrefs(page, 1);
    expect(guideHrefs.length, 'browse must link at least one guide for article smoke').toBeGreaterThan(0);
    const articlePath = guideHrefs[0];
    const response = await page.goto(articlePath);
    expect(response?.ok(), `${articlePath} should not 404`).toBeTruthy();
    return articlePath;
}

test.describe('public pages', () => {
    test('home loads', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('heading', { level: 1, name: /Navigate/i })).toBeVisible();
    });

    test('browse loads', async ({ page }) => {
        await page.goto('/browse');
        await expect(page.getByRole('heading', { name: /browse all resources/i })).toBeVisible();
    });

    test('external resources loads', async ({ page }) => {
        await page.goto('/external-resources');
        await expect(page.getByRole('heading', { name: /external resources directory/i })).toBeVisible();
    });

    test('category hub loads', async ({ page }) => {
        await page.goto('/interview-prep');
        await expect(page.getByRole('heading', { name: /interview prep/i })).toBeVisible();
    });

    test('article body does not leak draft frontmatter', async ({ page }) => {
        await openFirstBrowseArticle(page);
        const prose = page.locator('article .article-prose');
        await expect(prose).toBeVisible();
        await expect(prose).not.toContainText(/slug:\s*\S+/i);
        await expect(prose).not.toContainText(/draftStatus:\s*\S+/i);
        await expect(prose.locator('h2').first()).toBeVisible();
    });

    test('article prose renders markdown section structure', async ({ page }) => {
        await openFirstBrowseArticle(page);
        const prose = page.locator('article .article-prose');
        await expect(prose.locator('h2').first()).toBeVisible({ timeout: 15_000 });
        await expect(prose.locator('p').first()).toBeVisible();
    });

    test('external resources shows conference strip', async ({ page }) => {
        await page.goto('/external-resources');
        await expect(page.getByText(/student conferences & recruiting events/i)).toBeVisible();
    });

    test('contributions page loads stepper lanes', async ({ page }) => {
        await page.goto('/contributions');
        await expect(page.getByRole('heading', { name: /help build the hub/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /suggest a link or program/i })).toBeVisible();
        await expect(
            page.getByRole('complementary').getByRole('link', { name: /odubiyi\.a@northeastern\.edu/i }),
        ).toBeVisible();
    });

    test('faq page loads quick answers', async ({ page }) => {
        await page.goto('/faq');
        await expect(page.getByRole('heading', { name: /frequently asked questions/i })).toBeVisible();
        await expect(page.getByRole('heading', { name: /who is navigate tech hub for/i })).toBeVisible();
    });

    test('suggest resource form renders', async ({ page }) => {
        await page.goto('/suggest-resource');
        await expect(page.getByRole('heading', { name: /suggest a resource/i })).toBeVisible();
        await expect(page.getByLabel(/resource name/i)).toBeVisible();
    });
});

test.describe('static assets', () => {
    const requiredPaths = [
        '/images/navtechhub-logo.png',
        '/images/husky-head.png',
        '/fonts/gotham-black.otf',
        '/assets/resume/navigate-tech-hub-resume-template.docx',
    ];

    for (const assetPath of requiredPaths) {
        test(`serves ${assetPath}`, async ({ request }) => {
            const response = await request.get(assetPath);
            expect(response.ok()).toBeTruthy();
        });
    }

    test('home shows navbar logo', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByRole('link', { name: /navigate tech hub/i }).locator('img')).toBeVisible();
    });

    test('resume page links to navigate template download', async ({ page }) => {
        await page.goto('/resume');
        const templateLink = page.getByRole('link', { name: /navigate template/i });
        await expect(templateLink).toBeVisible();
        await expect(templateLink).toHaveAttribute(
            'href',
            '/assets/resume/navigate-tech-hub-resume-template.docx',
        );
    });
});
