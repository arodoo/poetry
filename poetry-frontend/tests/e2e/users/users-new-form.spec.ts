/*
 * File: users-new-form.spec.ts
 * Purpose: E2E test for users create form rendering and roles field.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('loads create user form with roles checkboxes', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })
  const rolesApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/roles') &&
      response.request().method() === 'GET',
    { timeout: 10000 }
  )
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: 'Create user' })).toBeVisible({
    timeout: 15000,
  })
  const rolesResponse: Response = await rolesApiPromise
  expect(rolesResponse.status()).toBe(200)
  await expect(page.getByTestId('user-username-input')).toBeVisible()
  await expect(page.getByTestId('user-email-input')).toBeVisible()
  await expect(page.getByTestId('user-password-input')).toBeVisible()
  await expect(page.getByTestId('role-checkbox-admin')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByTestId('role-checkbox-manager')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByTestId('role-checkbox-user')).toBeVisible({
    timeout: 15000,
  })
})
