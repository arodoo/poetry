/*
 * File: users-create.spec.ts
 * Purpose: E2E test ensuring admin can create a new user via the form.
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

test('admin can create a new user through form', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const initialResponse: Response | null = await page.goto('/en/users/new')
  if (initialResponse == null) {
    throw new Error('tests.users.create.initialResponse.missing')
  }
  expect(initialResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/users\/new$/)
  await page.waitForLoadState('networkidle')

  await expect(page.getByRole('heading', { name: 'Create user' })).toBeVisible({
    timeout: 15000,
  })

  const usernameInput: Locator = page.getByTestId('user-username-input')
  await expect(usernameInput).toBeVisible({ timeout: 15000 })

  const emailInput: Locator = page.getByTestId('user-email-input')
  await expect(emailInput).toBeVisible()

  const userRoleCheckbox: Locator = page.getByTestId('role-checkbox-user')
  await expect(userRoleCheckbox).toBeVisible()

  const passwordInput: Locator = page.getByTestId('user-password-input')
  await expect(passwordInput).toBeVisible()

  const timestamp: string = Date.now().toString()
  const testUsername: string = `testuser${timestamp}`
  const testEmail: string = `test${timestamp}@example.com`

  await usernameInput.fill(testUsername)
  await emailInput.fill(testEmail)
  await userRoleCheckbox.check()
  await passwordInput.fill('SecurePassword123!')

  const createPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users') &&
      response.request().method() === 'POST'
  )

  const submitButton: Locator = page.getByTestId('user-form-submit')
  await submitButton.click()

  const createResponse: Response = await createPromise
  expect(createResponse.status()).toBe(201)

  await page.waitForURL(/\/en\/users$/)

  await expect(page.getByText(testEmail)).toBeVisible({ timeout: 15000 })
})
