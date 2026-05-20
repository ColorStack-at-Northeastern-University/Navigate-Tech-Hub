import { defineConfig, devices } from '@playwright/test';

const prodBaseUrl = process.env.PLAYWRIGHT_BASE_URL?.replace(/\/$/, '');
const isProdTarget = Boolean(
    prodBaseUrl && !/localhost|127\.0\.0\.1/i.test(prodBaseUrl),
);

/**
 * E2E tests — local smoke (webServer) or prod health (PLAYWRIGHT_BASE_URL).
 *
 * Local:  npm run test:e2e
 * Prod:   PLAYWRIGHT_BASE_URL=https://your-app.vercel.app npm run test:e2e:prod
 *
 * First run: `npx playwright install chromium`
 */
export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    timeout: isProdTarget ? 60_000 : 30_000,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: prodBaseUrl ?? 'http://127.0.0.1:3000',
        trace: 'on-first-retry',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: isProdTarget
        ? undefined
        : {
              command: 'npm run dev',
              url: 'http://127.0.0.1:3000',
              reuseExistingServer: !process.env.CI,
              timeout: 120_000,
          },
});
