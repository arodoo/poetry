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
  const initP = waitForSellerCodesApi(page)
  await page.goto('/en/seller-codes')
  await initP
  const th = page.getByRole('columnheader', { name: 'Code' })
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
  const initP = waitForSellerCodesApi(page)
  await page.goto('/en/seller-codes')
  await initP
  const th = page.getByRole('columnheader', { name: 'Code' })
  const ascP = waitForSellerCodesApi(page)
  await th.click()
  const ascRes = await ascP
  expect(ascRes.url()).toContain('sort=code%2Casc')
  const descP = waitForSellerCodesApi(page)
  await th.click()
  const res = await descP
  expect(res.url()).toContain('sort=code%2Cdesc')
})
