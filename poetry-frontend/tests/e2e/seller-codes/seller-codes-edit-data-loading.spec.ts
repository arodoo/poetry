/*
 * File: seller-codes-edit-data-loading.spec.ts
 * Purpose: E2E test to verify seller code edit page loads data into inputs.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Seller Code Edit Data Loading', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('edit page loads seller code data into form inputs', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/seller-codes')
    await page.waitForLoadState('networkidle')

    const firstViewButton: Locator = page
      .locator('[data-testid^="view-seller-code-"]')
      .first()
    await firstViewButton.waitFor({ state: 'visible', timeout: 5000 })

    const testIdAttr: string | null =
      await firstViewButton.getAttribute('data-testid')
    const sellerCodeId: string = testIdAttr?.replace('view-seller-code-', '') || ''
    expect(sellerCodeId).toBeTruthy()

    await firstViewButton.click()
    await page.waitForURL(`/en/seller-codes/${sellerCodeId}`)
    await page.waitForLoadState('networkidle')

    const editButton: Locator = page.getByTestId('edit-seller-code-button')
    await editButton.click()

    await page.waitForURL(`/en/seller-codes/edit/${sellerCodeId}`)
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Edit seller code/i })
    ).toBeVisible({ timeout: 10000 })

    await page.waitForTimeout(1000)

    const codeInput: Locator = page.getByTestId('seller-code-input')
    const orgInput: Locator = page.getByTestId('seller-code-org-input')
    const userSelect: Locator = page.getByTestId('seller-code-user-select')
    const statusSelect: Locator = page.getByTestId('seller-code-status-select')

    await expect(codeInput).toBeVisible()
    await expect(orgInput).toBeVisible()
    await expect(userSelect).toBeVisible()
    await expect(statusSelect).toBeVisible()

    const codeValue: string = (await codeInput.inputValue()) || ''
    const orgValue: string = (await orgInput.inputValue()) || ''
    const userValue: string = (await userSelect.inputValue()) || ''
    const statusValue: string = (await statusSelect.inputValue()) || ''

    console.log('Code input value:', codeValue)
    console.log('Org input value:', orgValue)
    console.log('User select value:', userValue)
    console.log('Status select value:', statusValue)

    expect(codeValue).toBeTruthy()
    expect(orgValue).toBeTruthy()
    expect(userValue).toBeTruthy()
    expect(statusValue).toBeTruthy()
  })
})
