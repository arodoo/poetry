/*
 * File: playwright.config.ts
 * Purpose: Playwright test configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { defineConfig } from '@playwright/test'

export default defineConfig({
  globalSetup: './tests/e2e/global-setup.ts',
  globalTeardown: './tests/e2e/global-teardown.ts',
  timeout: 30000,
  testDir: 'tests/e2e',
  retries: 0,
  use: {
    baseURL: 'http://localhost:8080',
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'default',
      testIgnore: [
        '**/tokens-language-*.spec.ts',
        '**/tokens-*-update.spec.ts',
        '**/tokens-theme-creator.spec.ts',
        '**/tokens-ui-font-visual.spec.ts',
      ],
      workers: 2,
    },
    {
      name: 'tokens',
      testMatch: [
        '**/tokens-*-update.spec.ts',
        '**/tokens-theme-creator.spec.ts',
        '**/tokens-ui-font-visual.spec.ts',
        '**/tokens-language-*.spec.ts',
      ],
      dependencies: ['default'],
      workers: 1,
    },
  ],
  webServer: {
    command: 'node ../tools/logs/backend/dev-with-log.mjs',
    url: 'http://localhost:8080',
    reuseExistingServer: true,
    timeout: 60000,
  },
})
