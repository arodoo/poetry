/*
 * File: users-list-render.spec.ts
 * Purpose: E2E test for users list page rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForUsersApiResponse } from './users-list-helpers'

test('users list page renders seeded admin entry', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const apiResponsePromise: Promise<Response> = waitForUsersApiResponse(page)
  const initialResponse: Response | null = await page.goto('/en/users')
  if (initialResponse == null)
    throw new Error('tests.users.initialResponse.missing')
  expect(initialResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')
  const apiResponse: Response = await apiResponsePromise
  expect(apiResponse.status()).toBe(200)
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible({
    timeout: 15000,
  })
  await expect(
    page.getByRole('heading', { name: 'Page not found' })
  ).toHaveCount(0)
  await expect(page.getByText('Latest user records available.')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByTestId('users-list-results')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByText('admin@example.com')).toBeVisible({
    timeout: 15000,
  })
})
