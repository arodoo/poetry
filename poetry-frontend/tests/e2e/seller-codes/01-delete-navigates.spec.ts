import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { createTestSellerCode } from './helpers'

test('delete button navigates to confirmation page', async ({ page }: { page: Page }) => {
  await injectTokens(page)
  const { id: sellerCodeId, code } = await createTestSellerCode(page)
  await page.goto('/en/seller-codes')
  await page.waitForLoadState('networkidle')
  const search = page.getByTestId('table-search-input')
  await search.fill(code)
  await page.waitForResponse((response) => response.url().includes('/api/v1/seller-codes') && response.request().method() === 'GET')
  const row = page.locator('tr', { hasText: code }).first()
  await expect(row).toBeVisible({ timeout: 10000 })
  const deleteButton = row.locator(`[data-testid="delete-seller-code-${sellerCodeId}"]`)
  await deleteButton.click()
  await page.waitForURL(new RegExp(`/en/seller-codes/${sellerCodeId}/delete`))
  await expect(page).toHaveURL(new RegExp(`/en/seller-codes/${sellerCodeId}/delete`))
})
