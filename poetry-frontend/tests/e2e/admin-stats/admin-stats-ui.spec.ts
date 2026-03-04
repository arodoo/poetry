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
    await injectTokens(page)
    await page.route('**/api/v1/statistics/memberships*', (route) =>
      route.fulfill({
        json: { active: 5, expiringSoon: 3, expired: 2, total: 10 },
      })
    )
    await page.route('**/api/v1/user-memberships*', (route) => {
      const url = new URL(route.request().url())
      const status = url.searchParams.get('status') ?? 'ACTIVE'
      const row = {
        id: 1,
        userName: 'John Doe',
        userEmail: 'john@example.com',
        status,
        startDate: '2024-01-01',
        endDate: '2025-12-31',
        planName: 'Premium',
        sellerCode: 'codigo001',
        hasFingerprint: true,
      }
      return route.fulfill({
        json: {
          content: [row],
          totalElements: 1,
          totalPages: 1,
          currentPage: 0,
          pageSize: 20,
          hasNext: false,
          hasPrevious: false,
        },
      })
    })
  })

  test('Loads dashboard and displays KPI cards with data', async ({ page }) => {
    await page.goto('/en/admin/stats')

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
    await expect(activeCard.locator('p').first()).not.toHaveText('0', {
      timeout: 10000,
    })
    await expect(expiringCard.locator('p').first()).not.toHaveText('0')
    await expect(expiredCard.locator('p').first()).not.toHaveText('0')
  })

  test('Loads member lists when switching tabs', async ({ page }) => {
    await page.goto('/en/admin/stats')

    // Wait for tabs to be visible
    const tabs = page.locator('[role="tablist"]')
    await expect(tabs).toBeVisible()

    // The first tab (Active) should be selected by default and have rows
    const table = page.locator('table')
    await expect(table).toBeVisible()
    // Wait for at least one row in the active list (excluding header)
    await expect(page.locator('tbody tr')).not.toHaveCount(0, {
      timeout: 10000,
    })

    await page.getByRole('tab', { name: /Expiring/i }).click()
    await expect(page.locator('tbody tr')).not.toHaveCount(0, {
      timeout: 10000,
    })
    const firstExpiringRow = page.locator('tbody tr').first()
    await expect(firstExpiringRow).toBeVisible()

    // Click on "Expired" tab
    await page.getByRole('tab', { name: /Expired/i }).click()
    await expect(page.locator('tbody tr')).not.toHaveCount(0, {
      timeout: 10000,
    })
    const firstExpiredRow = page.locator('tbody tr').first()
    await expect(firstExpiredRow).toBeVisible()
  })
})
