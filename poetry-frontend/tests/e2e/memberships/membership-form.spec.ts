/*
 * File: membership-form.spec.ts
 * Purpose: E2E tests for membership form interactions and state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
test.describe('Membership Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/memberships/new')
    await page.waitForLoadState('networkidle')
  })

  test('should validate seller code in real-time', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()
    await expect(page.getByTestId('subscription-select')).toBeVisible({
      timeout: 5000,
    })

    await page
      .getByTestId('subscription-select')
      .selectOption({ label: 'Basic Monthly' })
    // We fill a code that should be invalid in the real system or we'll see what the real system says
    await page.getByTestId('membership-seller-code-input').fill('INVALID')
    await page.getByTestId('submit-membership-button').click()

    // Wait for the real API response
    await expect(page.getByTestId('eligibility-error')).toBeVisible({
      timeout: 10000,
    })
  })

  test('should disable submit button until form is valid', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()

    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeVisible({ timeout: 5000 })
    await expect(submitBtn).toBeDisabled()

    // Fill sub but not seller code
    await page.getByTestId('subscription-select').selectOption({ index: 1 })
    await expect(submitBtn).toBeDisabled()
  })

  test('should reset form state when a new user is selected', async ({
    page,
  }) => {
    const searchInput = page.getByTestId('user-search-input')

    await searchInput.fill('admin')
    await page.getByTestId('user-search-result-1').click()
    await expect(page.getByTestId('eligibility-checking')).toBeVisible()

    // Switch user immediately
    await searchInput.fill('test')
    await page
      .getByTestId(/user-search-result-/)
      .first()
      .click()
    await expect(page.getByTestId('eligibility-checking')).toBeVisible()
  })

  test('should navigate back to list on cancellation', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()

    const cancelBtn = page.getByRole('button', { name: /Cancel/i })
    await expect(cancelBtn).toBeVisible({ timeout: 5000 })
    await cancelBtn.click()

    await expect(page).toHaveURL(/\/en\/memberships$/)
  })
})
