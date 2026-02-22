/*
 * File: membership-success.spec.ts
 * Purpose: E2E test for the successful membership creation flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Membership Success Flow', () => {
  test.beforeEach(async ({ page }) => {
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))
    page.on('request', (req) => console.log('REQ:', req.method(), req.url()))
    page.on('response', (res) => console.log('RES:', res.status(), res.url()))

    await injectTokens(page)
    await page.goto('/en/memberships/new')
    await page.waitForLoadState('networkidle')
  })

  test('should create a membership successfully', async ({ page }) => {
    const searchInput = page.getByTestId('user-search-input')
    await searchInput.fill('admin')

    // Quick wait for result
    const result = page.getByTestId('user-search-result-1')
    await expect(result).toBeVisible({ timeout: 3000 })
    await result.click()

    // Wait for eligibility check
    await expect(page.getByTestId('eligibility-checking')).not.toBeVisible({
      timeout: 5000,
    })
    await expect(page.getByTestId('selected-user-label')).toContainText(
      /admin/i
    )

    // Form interaction
    const subSelect = page.getByTestId('subscription-select')
    const subOptions = subSelect.locator('option')
    await expect(subOptions).not.toHaveCount(0, { timeout: 5000 })
    await subSelect.selectOption({ label: 'Basic Monthly' })

    await page.getByTestId('membership-seller-code-input').fill('ADMIN-SC-001')

    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeEnabled({ timeout: 2000 })
    await submitBtn.click()

    // Redirect check
    await expect(page).toHaveURL(/\/en\/memberships$/, { timeout: 3000 })
  })
})
