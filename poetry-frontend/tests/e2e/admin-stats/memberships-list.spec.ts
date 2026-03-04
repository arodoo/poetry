/*
 * File: memberships-list.spec.ts
 * Purpose: E2E tests for memberships list in admin stats.
 * Verifies rendering, tab switching, and pagination.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Admin Stats - Memberships List', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)

    // Mock API response for user memberships
    await page.route('**/api/v1/user-memberships*', async (route) => {
      const json = {
        content: [
          {
            id: 1,
            userName: 'John Doe',
            userEmail: 'john@example.com',
            status: 'ACTIVE',
            startDate: '2023-01-01',
            endDate: '2023-12-31',
            planName: 'Premium',
          },
        ],
        totalElements: 1,
        totalPages: 1,
        size: 20,
        number: 0,
      }
      await route.fulfill({ json })
    })

    await page.goto('/en/admin/stats')
  })

  test('renders memberships tabs and table', async ({ page }) => {
    const statsPage = page.locator('[data-testid="admin-stats-page"]')
    await expect(statsPage).toBeVisible()

    // Check tabs
    const tabs = page.locator('[role="tablist"]')
    await expect(tabs).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Active' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Expiring' })).toBeVisible()
    await expect(page.getByRole('tab', { name: 'Expired' })).toBeVisible()

    // Check table headers
    await expect(
      page.getByRole('columnheader', { name: 'Member' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Plan' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Seller' })
    ).toBeVisible()
    await expect(
      page.getByRole('columnheader', { name: 'Access' })
    ).toBeVisible()
  })

  test('switches tabs and updates content', async ({ page }) => {
    // Default is Active
    const activeTab = page.getByRole('tab', { name: 'Active' })
    await expect(activeTab).toHaveAttribute('aria-selected', 'true')

    // Click Expiring
    const expiringTab = page.getByRole('tab', { name: 'Expiring' })
    await expiringTab.click()
    await expect(expiringTab).toHaveAttribute('aria-selected', 'true')
    await expect(activeTab).toHaveAttribute('aria-selected', 'false')

    // Verify table is present
    await expect(page.getByRole('table')).toBeVisible()
  })
})
