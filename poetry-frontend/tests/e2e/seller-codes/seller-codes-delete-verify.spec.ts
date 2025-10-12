/*
 * File: seller-codes-delete-verify.spec.ts
 * Purpose: E2E test to verify seller code deletion actually works.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Seller Code Delete Verification', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('deleted seller code should not appear in list', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const testCode = `DELETE-TEST-${Date.now()}`

    await page.goto('/en/seller-codes/new')
    await page.waitForLoadState('networkidle')

    await page.getByTestId('seller-code-input').fill(testCode)
    await page.getByTestId('seller-code-org-input').fill('delete-test-org')

    const userSelect: Locator = page.getByTestId('seller-code-user-select')
    await expect(userSelect).toBeVisible()
    await page.waitForTimeout(1000)

    const options: Locator = userSelect.locator('option')
    const optionsCount: number = await options.count()
    if (optionsCount <= 1) {
      test.skip(true, 'No users available')
    }

    await userSelect.selectOption({ index: 1 })
    await page.getByTestId('seller-code-status-select').selectOption('active')

    await page.getByRole('button', { name: /Create seller code/i }).click()
    await page.waitForURL(/\/en\/seller-codes$/, { timeout: 10000 })

    await expect(page.getByText(/created successfully/i)).toBeVisible({
      timeout: 5000,
    })

    const searchInput: Locator = page.getByPlaceholder(/search/i)
    await searchInput.fill(testCode)
    await page.waitForTimeout(1000)

    const codeCell: Locator = page.locator(`text=${testCode}`)
    await expect(codeCell).toBeVisible()

    const row: Locator = codeCell.locator('xpath=ancestor::tr')
    const viewButton: Locator = row.locator(
      '[data-testid^="view-seller-code-"]'
    )
    await viewButton.click()
    await page.waitForLoadState('networkidle')

    const deleteButton: Locator = page.getByTestId('delete-seller-code-button')
    await expect(deleteButton).toBeVisible()
    await deleteButton.click()

    await page.waitForURL(/\/en\/seller-codes\/\d+\/delete$/, {
      timeout: 10000,
    })

    const confirmButton: Locator = page.getByTestId(
      'confirm-delete-seller-code-button'
    )
    await expect(confirmButton).toBeVisible()

    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/api/v1/seller-codes/') &&
        response.request().method() === 'DELETE'
    )

    await confirmButton.click()

    const response = await responsePromise
    const status = response.status()

    console.log(`DELETE response status: ${status}`)

    if (status !== 200 && status !== 204) {
      const body = await response.text()
      console.error(`DELETE failed with status ${status}: ${body}`)
      throw new Error(`Expected 200 or 204, got ${status}`)
    }

    await page.waitForURL('/en/seller-codes', { timeout: 10000 })

    await expect(page.getByText(/deleted successfully/i)).toBeVisible({
      timeout: 5000,
    })

    await searchInput.fill(testCode)
    await page.waitForTimeout(1000)

    await expect(page.locator(`text=${testCode}`)).not.toBeVisible({
      timeout: 5000,
    })
  })
})
