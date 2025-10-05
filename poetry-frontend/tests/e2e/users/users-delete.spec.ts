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

test('delete button navigates to delete confirmation page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  const deleteButton = page.getByTestId('delete-user-1')
  await deleteButton.waitFor({ state: 'visible', timeout: 5000 })
  await deleteButton.click()
  await page.waitForURL(/\/en\/users\/1\/delete/)
  await expect(page).toHaveURL(/\/en\/users\/1\/delete/)
})

test('delete confirmation page displays correctly', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users/1/delete')
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
  await page.goto('/en/users/1/delete')
  await page.waitForLoadState('networkidle')
  const cancelButton = page.getByTestId('cancel-delete-user-button')
  await cancelButton.click()
  await page.waitForURL(/\/en\/users\/1$/)
  await expect(page).toHaveURL(/\/en\/users\/1$/)
})

test('confirm delete triggers API call and redirects', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users/1/delete')
  await page.waitForLoadState('networkidle')
  const updateApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users/1') &&
      response.request().method() === 'PUT'
  )
  const confirmButton = page.getByTestId('confirm-delete-user-button')
  await confirmButton.click()
  const updateResponse: Response = await updateApiPromise
  expect(updateResponse.status()).toBe(200)
  await page.waitForURL(/\/en\/users$/, { timeout: 5000 })
  await expect(page).toHaveURL(/\/en\/users$/)
})
