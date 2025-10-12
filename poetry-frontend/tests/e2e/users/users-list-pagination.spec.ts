/*
 * File: users-list-pagination.spec.ts
 * Purpose: E2E test for users list pagination with server-side
 * data fetching, page navigation, and size selection.
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

test('pagination displays correct info for first page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const apiPromise: Promise<Response> = waitForPagedUsersApi(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  const apiRes: Response = await apiPromise
  expect(apiRes.status()).toBe(200)
  const json = await apiRes.json()
  expect(json.content).toBeDefined()
  expect(json.totalElements).toBeGreaterThan(0)
  await expect(page.getByText(/Showing 1-\d+ of \d+/)).toBeVisible({
    timeout: 10000,
  })
  await expect(page.getByText('Page 1')).toBeVisible()
})

test('next button navigates to second page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const nextBtn = page.getByRole('button', { name: 'Next' })
  await expect(nextBtn).toBeVisible()
  const apiPromise: Promise<Response> = waitForPagedUsersApi(page)
  await nextBtn.click()
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('page=1')
  await expect(page.getByText('Page 2')).toBeVisible({ timeout: 10000 })
})

test('previous button disabled on first page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  const prevBtn = page.getByRole('button', { name: 'Previous' })
  await expect(prevBtn).toBeVisible()
  await expect(prevBtn).toBeDisabled()
})

test('page size selector changes items per page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const sizeSelect = page.locator('select')
  await expect(sizeSelect).toBeVisible()
  expect(await sizeSelect.inputValue()).toBe('10')
  const apiPromise: Promise<Response> = waitForPagedUsersApi(page)
  await sizeSelect.selectOption('25')
  const apiRes: Response = await apiPromise
  expect(apiRes.url()).toContain('size=25')
  expect(await sizeSelect.inputValue()).toBe('25')
  await expect(page.getByText(/Showing 1-\d+ of \d+/)).toBeVisible()
})

test('navigation between pages updates page indicator', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  await expect(page.getByText('Page 1')).toBeVisible()
  const nextBtn = page.getByRole('button', { name: 'Next' })
  await nextBtn.click()
  await expect(page.getByText('Page 2')).toBeVisible({ timeout: 10000 })
  const prevBtn = page.getByRole('button', { name: 'Previous' })
  await prevBtn.click()
  await expect(page.getByText('Page 1')).toBeVisible({ timeout: 10000 })
})
