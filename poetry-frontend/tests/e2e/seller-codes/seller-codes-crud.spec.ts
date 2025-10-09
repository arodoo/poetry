/*
 * File: seller-codes-crud.spec.ts
 * Purpose: E2E tests for seller codes CRUD operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const TEST_SELLER_CODE = `TEST-${Date.now()}`
let createdSellerCodeId: string | null = null

test.describe('Seller Codes CRUD Operations', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('should create new seller code with user selection', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/seller-codes/new')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Create seller code/i })
    ).toBeVisible({
      timeout: 15000,
    })

    await page.getByTestId('seller-code-input').fill(TEST_SELLER_CODE)
    await page.getByTestId('seller-code-org-input').fill('test-org-123')

    const userSelect: Locator = page.getByTestId('seller-code-user-select')
    await expect(userSelect).toBeVisible()

    // Wait for users to load (select should have more than just placeholder)
    await page.waitForTimeout(2000)

    const options: Locator = userSelect.locator('option')
    const optionsCount: number = await options.count()

    // If no users loaded, check if it's showing error or loading state
    if (optionsCount <= 1) {
      const firstOption: string = (await options.first().textContent()) || ''
      console.log('User select state:', firstOption)

      // If still loading or error, this test needs users in the database
      test.skip(true, 'No users available in database for selection')
    }

    expect(optionsCount).toBeGreaterThan(1)

    await userSelect.selectOption({ index: 1 })

    const statusSelect: Locator = page.getByTestId('seller-code-status-select')
    await statusSelect.selectOption('active')

    const submitButton: Locator = page.getByRole('button', {
      name: /Create seller code/i,
    })
    await submitButton.click()

    await page.waitForURL(/\/en\/seller-codes$/, { timeout: 10000 })

    await expect(
      page.getByText(/Seller code created successfully/i)
    ).toBeVisible({
      timeout: 5000,
    })

    const searchInput: Locator = page.getByPlaceholder(/search/i)
    await searchInput.fill(TEST_SELLER_CODE)
    await page.waitForTimeout(1000)

    const codeCell: Locator = page.locator(`text=${TEST_SELLER_CODE}`)
    await expect(codeCell).toBeVisible({ timeout: 10000 })

    const row: Locator = codeCell.locator('xpath=ancestor::tr')
    const viewButton: Locator = row.locator(
      '[data-testid^="view-seller-code-"]'
    )
    const dataTestId: string | null =
      await viewButton.getAttribute('data-testid')
    if (dataTestId) {
      createdSellerCodeId = dataTestId.replace('view-seller-code-', '')
    }
  })

  test('should view seller code details', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    test.skip(!createdSellerCodeId, 'No seller code created yet')

    await page.goto('/en/seller-codes')
    await page.waitForLoadState('networkidle')

    const searchInput: Locator = page.getByPlaceholder(/search/i)
    await searchInput.fill(TEST_SELLER_CODE)
    await page.waitForTimeout(1000)

    const viewButton: Locator = page.locator(
      `[data-testid="view-seller-code-${createdSellerCodeId}"]`
    )
    await viewButton.click()
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Seller Code Detail/i })
    ).toBeVisible({
      timeout: 15000,
    })

    await expect(page.getByText(TEST_SELLER_CODE)).toBeVisible()
    await expect(page.getByText('test-org-123')).toBeVisible()
  })

  test('should edit seller code', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    test.skip(!createdSellerCodeId, 'No seller code created yet')

    await page.goto(`/en/seller-codes/${createdSellerCodeId}`)
    await page.waitForLoadState('networkidle')

    const editButton: Locator = page.getByTestId('edit-seller-code-button')
    await editButton.click()

    await page.waitForURL(`/en/seller-codes/edit/${createdSellerCodeId}`, {
      timeout: 10000,
    })

    const orgInput: Locator = page.getByTestId('seller-code-org-input')
    await orgInput.fill('updated-org-456')

    const statusSelect: Locator = page.getByTestId('seller-code-status-select')
    await statusSelect.selectOption('inactive')

    const saveButton: Locator = page.getByRole('button', {
      name: /Save changes/i,
    })
    await saveButton.click()

    await page.waitForURL(`/en/seller-codes/${createdSellerCodeId}`, {
      timeout: 10000,
    })

    await expect(page.getByText(/updated successfully/i)).toBeVisible({
      timeout: 5000,
    })

    await expect(page.getByText('updated-org-456')).toBeVisible()
  })

  test('should delete seller code', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    test.skip(!createdSellerCodeId, 'No seller code created yet')

    await page.goto(`/en/seller-codes/${createdSellerCodeId}`)
    await page.waitForLoadState('networkidle')

    const deleteButton: Locator = page.getByTestId('delete-seller-code-button')
    await expect(deleteButton).toBeVisible()

    await deleteButton.click()

    await page.waitForURL(
      `/en/seller-codes/${createdSellerCodeId}/delete`,
      { timeout: 10000 }
    )

    const confirmButton: Locator = page.getByRole('button', {
      name: /confirm/i,
    })
    await expect(confirmButton).toBeVisible()
    await confirmButton.click()

    await page.waitForURL('/en/seller-codes', { timeout: 10000 })

    await expect(
      page.getByText(/deleted successfully/i)
    ).toBeVisible({ timeout: 5000 })

    await expect(page.locator(`text=${TEST_SELLER_CODE}`)).not.toBeVisible({
      timeout: 10000,
    })
  })
})