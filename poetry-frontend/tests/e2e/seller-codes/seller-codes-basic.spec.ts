/*
 * File: seller-codes-basic.spec.ts
 * Purpose: E2E tests for seller codes basic functionality.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('seller codes list page loads successfully', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: 'Seller Codes' })).toBeVisible(
    {
      timeout: 15000,
    }
  )
  const createButton: Locator = page.locator(
    '[data-testid="create-seller-code-button"]'
  )
  await expect(createButton).toBeVisible()
})

test('create button navigates to new seller code page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForLoadState('networkidle')
  const createButton: Locator = page.locator(
    '[data-testid="create-seller-code-button"]'
  )
  await expect(createButton).toBeVisible({ timeout: 15000 })
  await createButton.click()
  await expect(page).toHaveURL(/\/en\/seller-codes\/new/)
  await expect(page.getByTestId('seller-code-input')).toBeVisible()
})

test('seller code detail page renders sections', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForLoadState('networkidle')
  const viewButton: Locator = page
    .locator('[data-testid^="view-seller-code-"]')
    .first()
  const isViewButtonVisible: boolean = await viewButton
    .isVisible()
    .catch(() => false)
  if (!isViewButtonVisible) {
    console.log('No seller codes available, skipping detail test')
    return
  }
  await viewButton.click()
  await page.waitForLoadState('networkidle')
  await expect(
    page.getByRole('heading', { name: 'Seller Code Detail', level: 1 })
  ).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByTestId('seller-code-detail-content')).toBeVisible()
})

test('create seller code form has required fields', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes/new')
  await page.waitForLoadState('networkidle')
  await expect(page.getByTestId('seller-code-input')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByTestId('seller-code-user-select')).toBeVisible()
  await expect(page.getByTestId('seller-code-status-select')).toBeVisible()
  await expect(page.getByTestId('seller-code-org-input')).toBeVisible()
})
