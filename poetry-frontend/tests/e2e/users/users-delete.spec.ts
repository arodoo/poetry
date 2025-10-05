/*
 * File: users-delete.spec.ts
 * Purpose: E2E tests for user deletion confirmation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  test,
  expect,
  type Page,
  type Response,
} from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

async function createTestUser(page: Page): Promise<string> {
  await page.goto('/en/users/new')
  await page.waitForLoadState('networkidle')
  const timestamp: number = Date.now()
  const username = `deletetest${String(timestamp)}`
  await page.getByTestId('user-firstname-input').fill('Delete')
  await page.getByTestId('user-lastname-input').fill('Test')
  await page.getByTestId('user-username-input').fill(username)
  await page.getByTestId('user-email-input').fill(`${username}@example.com`)
  await page.getByTestId('user-password-input').fill('SecurePass123!')
  await page.getByTestId('role-checkbox-admin').check()
  const createApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users') &&
      response.request().method() === 'POST'
  )
  await page.getByRole('button', { name: 'Create user' }).click()
  const createResponse: Response = await createApiPromise
  const userData = (await createResponse.json()) as { id?: number }
  return String(userData.id ?? '')
}

test('delete button navigates to delete confirmation page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const userId = await createTestUser(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const deleteButton = page.getByTestId(`delete-user-${userId}`)
  await deleteButton.waitFor({ state: 'visible', timeout: 5000 })
  await deleteButton.click()
  await page.waitForURL(new RegExp(`/en/users/${userId}/delete`))
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}/delete`))
})

test('delete confirmation page displays correctly', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const userId = await createTestUser(page)
  await page.goto(`/en/users/${userId}/delete`)
  await page.waitForLoadState('networkidle')
  const heading = page.getByRole('heading', { name: /delete/i, level: 1 })
  await expect(heading).toBeVisible()
  const confirmButton = page.getByTestId('confirm-delete-user-button')
  await expect(confirmButton).toBeVisible()
  const cancelButton = page.getByTestId('cancel-delete-user-button')
  await expect(cancelButton).toBeVisible()
})

test('cancel button navigates back to user detail', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const userId = await createTestUser(page)
  await page.goto(`/en/users/${userId}/delete`)
  await page.waitForLoadState('networkidle')
  const cancelButton = page.getByTestId('cancel-delete-user-button')
  await cancelButton.click()
  await page.waitForURL(new RegExp(`/en/users/${userId}$`))
  await expect(page).toHaveURL(new RegExp(`/en/users/${userId}$`))
})

test('confirm delete triggers API call and redirects', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  const userId = await createTestUser(page)
  await page.goto(`/en/users/${userId}/delete`)
  await page.waitForLoadState('networkidle')
  const deleteApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes(`/api/v1/users/${userId}`) &&
      response.request().method() === 'PUT'
  )
  const confirmButton = page.getByTestId('confirm-delete-user-button')
  await confirmButton.click()
  const deleteResponse: Response = await deleteApiPromise
  expect([200, 204]).toContain(deleteResponse.status())
  await page.waitForURL(/\/en\/users$/, { timeout: 5000 })
  await expect(page).toHaveURL(/\/en\/users$/)
})
