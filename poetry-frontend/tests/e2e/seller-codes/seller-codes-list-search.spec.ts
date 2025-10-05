/*
 * File: seller-codes-list-search.spec.ts
 * Purpose: E2E test for seller codes search functionality.
 * Tests server-side search filtering by code or organization.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

async function waitPagedApi(page: Page): Promise<Response> {
  return page.waitForResponse(
    (res: Response): boolean =>
      res.url().includes('/api/v1/seller-codes/paged') &&
      res.request().method() === 'GET'
  )
}

test('search input visible on seller codes list', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForURL(/\/en\/seller-codes$/)
  const searchInput = page.getByTestId('table-search-input')
  await expect(searchInput).toBeVisible()
  await expect(searchInput).toBeEnabled()
})

test('search maintains focus when typing', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForURL(/\/en\/seller-codes$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.click()
  await searchInput.type('20', { delay: 50 })
  await expect(searchInput).toBeFocused()
  await expect(searchInput).toHaveValue('20')
})

test('search triggers API with search param', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForURL(/\/en\/seller-codes$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.fill('TEST')
  const apiPromise: Promise<Response> = waitPagedApi(page)
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('search=TEST')
})

test('search for "20" finds matching seller codes', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForURL(/\/en\/seller-codes$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.click()
  const apiPromise: Promise<Response> = waitPagedApi(page)
  await searchInput.type('20', { delay: 100 })
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('search=20')
  const json = await apiRes.json()
  expect(json.content).toBeDefined()
})

test('clear button resets search', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  await page.waitForURL(/\/en\/seller-codes$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  const apiPromise1: Promise<Response> = waitPagedApi(page)
  await searchInput.fill('xyz')
  await apiPromise1
  const clearBtn = page.getByTestId('table-search-clear')
  await expect(clearBtn).toBeVisible()
  await clearBtn.click()
  await expect(searchInput).toHaveValue('')
})
