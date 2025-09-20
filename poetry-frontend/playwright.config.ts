/*
 * File: playwright.config.ts
 * Purpose: Playwright test configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { defineConfig } from '@playwright/test'

export default defineConfig({
  timeout: 30000,
  testDir: 'tests/e2e',
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'npm run dev:raw',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30000,
  },
})
