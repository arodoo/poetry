/*
 * File: users-sort.spec.ts
 * Purpose: E2E test for users list server-side sort.
 * Verifies sort param in API calls when clicking
 * sortable column headers (asc → desc → reset).
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

async function waitForUsersApi(page: Page): Promise<Response> {
  return page.waitForResponse(
    (res: Response): boolean =>
      res.url().includes('/api/v1/users/paged') &&
      res.request().method() === 'GET'
  )
}

test('click full name header sends sort=username,asc', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const initP = waitForUsersApi(page)
  await page.goto('/en/users')
  await initP
  const th = page.locator('th', {
    hasText: /full name/i,
  })
  const apiP = waitForUsersApi(page)
  await th.click()
  const res = await apiP
  expect(res.url()).toContain('sort=username%2Casc')
  expect(res.status()).toBe(200)
})

test('second click sends sort=username,desc', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const initP = waitForUsersApi(page)
  await page.goto('/en/users')
  await initP
  const th = page.locator('th', {
    hasText: /full name/i,
  })
  const ascP = waitForUsersApi(page)
  await th.click()
  const ascRes = await ascP
  expect(ascRes.url()).toContain('sort=username%2Casc')
  const descP = waitForUsersApi(page)
  await th.click()
  const res = await descP
  expect(res.url()).toContain('sort=username%2Cdesc')
})
