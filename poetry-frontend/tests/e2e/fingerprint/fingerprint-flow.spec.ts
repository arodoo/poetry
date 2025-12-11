/*
 * File: fingerprint-flow.spec.ts
 * Purpose: E2E tests for fingerprint enrollment and verification flows.
 * Tests UI navigation and form interactions for fingerprint pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Fingerprint Flow', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await injectTokens(page)
  })

  test('enroll page loads correctly', async ({ page }) => {
    await page.goto('/en/fingerprints/enroll', { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading')).toBeVisible()
    await expect(
      page.locator('form, [data-testid="enroll-form"]')
    ).toBeVisible()
  })

  test('verify page loads correctly', async ({ page }) => {
    await page.goto('/en/fingerprints/verify', { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading')).toBeVisible()
  })

  test('fingerprints list page loads', async ({ page }) => {
    await page.goto('/en/fingerprints', { waitUntil: 'networkidle' })

    await expect(page.getByRole('heading')).toBeVisible()
  })

  test('simulator page loads', async ({ page }) => {
    await page.goto('/en/fingerprints/simulator', { waitUntil: 'networkidle' })

    await expect(page.locator('body')).toBeVisible()
  })
})
