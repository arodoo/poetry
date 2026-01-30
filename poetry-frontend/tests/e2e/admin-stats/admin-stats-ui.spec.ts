/*
 * File: admin-stats-ui.spec.ts
 * Purpose: E2E UI tests for Admin Dashboard statistics page.
 * Verifies that KPI cards and list tabs render correctly with data.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Admin Stats Dashboard UI', () => {
  test.beforeEach(async ({ page }) => {
    // Inject auth tokens to bypass login screen
    await injectTokens(page)
  })

  test('Loads dashboard and displays KPI cards with data', async ({ page }) => {
    await page.goto('/en/admin/stats')
    await page.waitForLoadState('networkidle')

    // Wait for page to load - could be loading, error, or actual page
    await page.waitForTimeout(2000)

    // Wait for the admin stats page container to render (tolerate loading)
    await page.waitForSelector('[data-testid="admin-stats-page"]', {
      timeout: 20000,
    })
    // Then verify page title (allow fallback to heading text if testid is missing)
    const titleLocator = page.locator('[data-testid="admin-stats-title"]')
    const titleRegex = /Admin (?:Stats|Dashboard)/i
    if ((await titleLocator.count()) > 0) {
      await expect(titleLocator.first()).toBeVisible()
    } else {
      // prefer explicit role lookup to avoid strict-mode ambiguity
      await expect(
        page.getByRole('heading', { name: titleRegex, level: 1 })
      ).toBeVisible()
    }

    // Check KPI cards existence
    const activeCard = page.getByTestId('kpi-card-active')
    const expiringCard = page.getByTestId('kpi-card-expiring')
    const expiredCard = page.getByTestId('kpi-card-expired')

    await expect(activeCard).toBeVisible()
    await expect(expiringCard).toBeVisible()
    await expect(expiredCard).toBeVisible()

    // Check that values are not 0 (assuming bootstrap ran)
    // Note: Using regex to match non-zero digits, as 0 would be single digit 0
    // But if bootstrap fails, it might be 0. We expect > 0.
    // Wait for data to load
    await expect(activeCard.locator('p').first()).not.toHaveText('0', {
      timeout: 10000,
    })
    await expect(expiringCard.locator('p').first()).not.toHaveText('0')
    // 1 in 4 should be expired, so roughly 5 expired out of 20
    await expect(expiredCard.locator('p').first()).not.toHaveText('0')
  })
})
