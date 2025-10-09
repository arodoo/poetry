import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { createTestSellerCode } from './helpers'

test('confirm delete triggers API and redirects', async ({ page }: { page: Page }) => {
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
  
  const deleteApiPromise: Promise<Response> = page.waitForResponse((response: Response): boolean => response.url().includes(`/api/v1/seller-codes/${sellerCodeId}`) && response.request().method() === 'DELETE')
  const confirmButton = page.getByTestId('confirm-delete-seller-code-button')
  await confirmButton.click()
  const deleteResponse: Response = await deleteApiPromise
  expect([200, 204]).toContain(deleteResponse.status())
  await page.waitForURL(/\/en\/seller-codes$/, { timeout: 10000 })
  await expect(page).toHaveURL(/\/en\/seller-codes$/)
})
