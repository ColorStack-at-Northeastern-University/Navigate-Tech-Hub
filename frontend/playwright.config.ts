import { defineConfig, devices } from '@playwright/test';

/**
 * E2E smoke tests — run against local dev server or set PLAYWRIGHT_BASE_URL.
 *
 * First run: `npx playwright install chromium`
 * CI: set PLAYWRIGHT_BASE_URL to the deployed preview URL and skip webServer.
 */
export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:3000',
        trace: 'on-first-retry',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: process.env.PLAYWRIGHT_BASE_URL
        ? undefined
        : {
              command: 'npm run dev',
              url: 'http://127.0.0.1:3000',
              reuseExistingServer: !process.env.CI,
              timeout: 120_000,
          },
});
