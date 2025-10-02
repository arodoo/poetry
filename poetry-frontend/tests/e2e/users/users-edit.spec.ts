/*
 * File: users-edit.spec.ts
 * Purpose: E2E test ensuring admin can edit existing user via the form.
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

test('admin can edit a user through form', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const listResponse: Response | null = await page.goto('/en/users')
  if (listResponse == null) {
    throw new Error('tests.users.edit.listResponse.missing')
  }
  expect(listResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/users$/)
  await page.waitForLoadState('networkidle')

  const resultsSection: Locator = page.getByTestId('users-list-results')
  await expect(resultsSection).toBeVisible({ timeout: 15000 })

  const firstEditButton: Locator = page.getByTestId(/^edit-user-/).first()
  await expect(firstEditButton).toBeVisible({ timeout: 15000 })

  const editPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users/') &&
      response.request().method() === 'GET' &&
      !response.url().endsWith('/api/v1/users')
  )

  await firstEditButton.click()

  await page.waitForURL(/\/en\/users\/\d+\/edit$/)
  await page.waitForLoadState('networkidle')

  const detailResponse: Response = await editPromise
  expect(detailResponse.status()).toBe(200)

  await expect(page.getByRole('heading', { name: 'Edit user' })).toBeVisible({
    timeout: 15000,
  })

  const usernameInput: Locator = page.getByTestId('user-username-input')
  await expect(usernameInput).toBeVisible({ timeout: 15000 })

  const emailInput: Locator = page.getByTestId('user-email-input')
  await expect(emailInput).toBeVisible()

  const passwordInput: Locator = page.getByTestId('user-password-input')
  await expect(passwordInput).toHaveCount(0)

  const currentUsername: string = await usernameInput.inputValue()
  const updatedUsername: string = `${currentUsername}-updated`
  await usernameInput.fill(updatedUsername)

  const updatePromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users/') &&
      response.request().method() === 'PUT'
  )

  const submitButton: Locator = page.getByTestId('user-form-submit')
  await submitButton.click()

  const updateResponse: Response = await updatePromise
  expect(updateResponse.status()).toBe(200)

  await expect(page.getByText('User updated successfully')).toBeVisible({
    timeout: 5000,
  })

  await page.waitForURL(/\/en\/users\/\d+$/)
})
