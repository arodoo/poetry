/*
 * File: users-list-search.spec.ts
 * Purpose: E2E test for users list search functionality.
 * Tests server-side search filtering across all records.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

async function waitForPagedUsersApi(page: Page): Promise<Response> {
  return page.waitForResponse(
    (res: Response): boolean =>
      res.url().includes('/api/v1/users/paged') &&
      res.request().method() === 'GET'
  )
}

test('search input is visible and interactive', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  const searchInput = page.getByTestId('table-search-input')
  await expect(searchInput).toBeVisible()
  await expect(searchInput).toBeEnabled()
  await expect(searchInput).toHaveAttribute('placeholder', /Search/i)
})

test('search for user by typing maintains focus', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.click()
  await searchInput.type('20', { delay: 50 })
  await expect(searchInput).toBeFocused()
  await expect(searchInput).toHaveValue('20')
})

test('search triggers API call with search parameter', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.fill('admin')
  const apiPromise: Promise<Response> = waitForPagedUsersApi(page)
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('search=admin')
  expect(apiRes.status()).toBe(200)
})

test('search for "20" finds matching records', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  await searchInput.click()
  const apiPromise: Promise<Response> = waitForPagedUsersApi(page)
  await searchInput.type('20', { delay: 100 })
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('search=20')
  const json = await apiRes.json()
  expect(json.content).toBeDefined()
  expect(json.totalElements).toBeGreaterThan(0)
  await expect(page.locator('tbody tr')).toHaveCount(json.content.length, {
    timeout: 5000,
  })
})

test('clear button clears search and reloads data', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const searchInput = page.getByTestId('table-search-input')
  const apiPromise1: Promise<Response> = waitForPagedUsersApi(page)
  await searchInput.fill('test')
  await apiPromise1
  await expect(searchInput).toHaveValue('test')
  const clearBtn = page.getByTestId('table-search-clear')
  await expect(clearBtn).toBeVisible()
  await clearBtn.click()
  await expect(searchInput).toHaveValue('')
  await page.waitForTimeout(500)
  const rows = page.locator('tbody tr')
  await expect(rows.first()).toBeVisible({ timeout: 5000 })
})
