/*
 * File: users-new-interactions.spec.ts
 * Purpose: E2E tests for user creation interactions and submission.
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

test('can select multiple roles via checkboxes', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users/new')
  await page.waitForLoadState('networkidle')
  const adminCheckbox: Locator = page.getByTestId('role-checkbox-admin')
  const managerCheckbox: Locator = page.getByTestId('role-checkbox-manager')
  await adminCheckbox.waitFor({ state: 'visible', timeout: 15000 })
  await adminCheckbox.check()
  await expect(adminCheckbox).toBeChecked()
  await managerCheckbox.check()
  await expect(managerCheckbox).toBeChecked()
  await managerCheckbox.uncheck()
  await expect(managerCheckbox).not.toBeChecked()
  await expect(adminCheckbox).toBeChecked()
})
test('submits form with selected roles', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users/new')
  await page.waitForLoadState('networkidle')
  const firstNameInput: Locator = page.getByTestId('user-firstname-input')
  const lastNameInput: Locator = page.getByTestId('user-lastname-input')
  const usernameInput: Locator = page.getByTestId('user-username-input')
  const emailInput: Locator = page.getByTestId('user-email-input')
  const passwordInput: Locator = page.getByTestId('user-password-input')
  const adminCheckbox: Locator = page.getByTestId('role-checkbox-admin')
  await usernameInput.waitFor({ state: 'visible', timeout: 15000 })
  const timestamp: number = Date.now()
  await firstNameInput.fill('Test')
  await lastNameInput.fill('User')
  await usernameInput.fill(`testuser${String(timestamp)}`)
  await emailInput.fill(`test${String(timestamp)}@example.com`)
  await adminCheckbox.check()
  // Wait for React state update to make password field visible
  await passwordInput.waitFor({ state: 'visible', timeout: 5000 })
  await passwordInput.fill('SecurePass123!')
  const createApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users') &&
      response.request().method() === 'POST'
  )
  await page.getByRole('button', { name: 'Create user' }).click()
  const createResponse: Response = await createApiPromise
  expect([200, 201]).toContain(createResponse.status())
  await expect(page.getByText('User created successfully')).toBeVisible({
    timeout: 5000,
  })
  await expect(page).toHaveURL(/\/en\/users$/, { timeout: 15000 })
})
