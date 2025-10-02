/*
 * File: users-list.spec.ts
 * Purpose: Ensure admin can load the users list view with seeded data.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  test,
  expect,
  type Page,
  type Response,
  type Locator,
} from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('users list page renders seeded admin entry', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  // Prefer network-level wait to avoid race conditions
  const apiResponsePromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users') &&
      response.request().method() === 'GET'
  )

  const initialResponse: Response | null = await page.goto('/en/users')
  if (initialResponse == null) {
    throw new Error('tests.users.initialResponse.missing')
  }
  expect(initialResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')

  const apiResponse: Response = await apiResponsePromise
  expect(apiResponse.status()).toBe(200)

  // Title via heading role
  await expect(page.getByRole('heading', { name: 'Users' })).toBeVisible({
    timeout: 15000,
  })

  // Ensure no 404 heading rendered
  await expect(
    page.getByRole('heading', { name: 'Page not found' })
  ).toHaveCount(0)

  // Assert readiness helper text (translation key ui.users.status.ready)
  await expect(page.getByText('Latest user records available.')).toBeVisible({
    timeout: 15000,
  })

  // Prefer data-testid for results section
  const resultsSection: Locator = page.getByTestId('users-list-results')
  await expect(resultsSection).toBeVisible({ timeout: 15000 })

  // Verify seeded admin email inside results
  await expect(page.getByText('admin@example.com')).toBeVisible({
    timeout: 15000,
  })
})
