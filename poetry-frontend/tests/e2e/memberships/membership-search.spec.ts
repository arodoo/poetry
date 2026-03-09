/*
 * File: membership-search.spec.ts
 * Purpose: E2E tests for membership user search behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
test.describe('Membership User Search', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/memberships/new')
  })

  test('should debounce search requests', async ({ page }) => {
    let callCount = 0
    await page.route('**/api/v1/users/paged*', async (route) => {
      callCount++
      await route.continue()
    })

    const searchInput = page.getByTestId('user-search-input')
    await expect(searchInput).toBeVisible({ timeout: 5000 })
    callCount = 0
    await searchInput.type('adm', { delay: 50 })

    await page.waitForTimeout(1200)
    expect(callCount).toBeLessThanOrEqual(2)
  })

  test('should show feedback for empty results', async ({ page }) => {
    const searchInput = page.getByTestId('user-search-input')
    await searchInput.fill('Z0_NONEXISTENT_USER_99')
    const dd = page.getByTestId('user-search-input-dropdown')
    await expect(dd).toBeVisible({ timeout: 5000 })
    const buttons = dd.locator('button')
    await expect(buttons).toHaveCount(0)
  })
})
