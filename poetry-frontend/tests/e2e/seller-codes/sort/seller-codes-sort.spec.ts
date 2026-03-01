/*
 * File: seller-codes-sort.spec.ts
 * Purpose: E2E test for seller codes list server-side
 * sort. Verifies sort param in API calls when
 * clicking column headers (asc → desc cycle).
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

async function waitForSellerCodesApi(page: Page): Promise<Response> {
  return page.waitForResponse(
    (res: Response): boolean =>
      res.url().includes('/api/v1/seller-codes/paged') &&
      res.request().method() === 'GET'
  )
}

test('click code header sends sort=code,asc', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  const th = page.locator('th', {
    hasText: /code/i,
  })
  const apiP = waitForSellerCodesApi(page)
  await th.click()
  const res = await apiP
  expect(res.url()).toContain('sort=code%2Casc')
  expect(res.status()).toBe(200)
})

test('second click sends sort=code,desc', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/seller-codes')
  const th = page.locator('th', {
    hasText: /code/i,
  })
  await th.click()
  await waitForSellerCodesApi(page)
  const apiP = waitForSellerCodesApi(page)
  await th.click()
  const res = await apiP
  expect(res.url()).toContain('sort=code%2Cdesc')
})
