/*
 * File: memberships-list-render.spec.ts
 * Purpose: E2E test for memberships list page rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForMembershipsApiResponse } from './memberships-list-helpers'

test('memberships list page renders with data', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const apiResponsePromise: Promise<Response> =
    waitForMembershipsApiResponse(page)
  const initialResponse: Response | null = await page.goto('/en/memberships')
  if (initialResponse == null)
    throw new Error('tests.memberships.initialResponse.missing')
  expect(initialResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/memberships$/)
  await page.waitForLoadState('networkidle')
  const apiResponse: Response = await apiResponsePromise
  expect(apiResponse.status()).toBe(200)
  await expect(
    page.getByRole('heading', { name: /membership/i })
  ).toBeVisible({
    timeout: 15000,
  })
  await expect(
    page.getByRole('heading', { name: 'Page not found' })
  ).toHaveCount(0)
})
