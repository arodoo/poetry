/*
 * File: subscriptions-delete.spec.ts
 * Purpose: E2E test for subscription deletion confirmation functionality.
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

async function createTestSubscription(
  page: Page
): Promise<{ id: string; name: string }> {
  await page.goto('/en/subscriptions/new')
  await page.waitForLoadState('networkidle')

  const timestamp: number = Date.now()
  const subscriptionName = `DeleteTest${String(timestamp)}`

  await page.getByTestId('subscription-name-input').fill(subscriptionName)
  await page
    .getByTestId('subscription-description-input')
    .fill('Test subscription for deletion')
  await page.getByTestId('subscription-price-input').fill('9.99')
  await page.getByTestId('subscription-currency-select').selectOption('USD')
  await page.getByTestId('subscription-duration-input').fill('30')
  await page.getByTestId('subscription-status-select').selectOption('active')

  const createApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/subscriptions') &&
      response.request().method() === 'POST'
  )

  await page.getByTestId('subscription-submit-button').click()
  const createResponse: Response = await createApiPromise
  const subscriptionData = (await createResponse.json()) as { id?: number }

  return { id: String(subscriptionData.id ?? ''), name: subscriptionName }
}

async function getSubscriptionIdFromButton(
  button: Locator,
  prefix: string
): Promise<string> {
  const testId: string = (await button.getAttribute('data-testid')) ?? ''
  return testId.replace(prefix, '')
}

test('delete button navigates to delete confirmation page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const { id: subscriptionId, name: subscriptionName } =
    await createTestSubscription(page)

  // Navigate to subscriptions list and find our test subscription
  await page.goto('/en/subscriptions')
  await page.waitForLoadState('networkidle')

  // Search for our test subscription
  const searchInput = page.getByPlaceholder(/search/i)
  if (await searchInput.isVisible()) {
    await searchInput.fill(subscriptionName)
    await page.waitForTimeout(1000)
  }

  // Click view button
  const viewButton = page.getByTestId(`view-subscription-${subscriptionId}`)
  await viewButton.waitFor({ state: 'visible', timeout: 5000 })
  await viewButton.click()
  await page.waitForLoadState('networkidle')

  // Click delete button
  const deleteButton = page.getByTestId('delete-subscription-button')
  await expect(deleteButton).toBeVisible({ timeout: 15000 })
  await deleteButton.click()

  // Should be on delete confirmation page
  await expect(page).toHaveURL(
    new RegExp(`/en/subscriptions/${subscriptionId}/delete$`)
  )
  await page.waitForLoadState('networkidle')

  // Check delete confirmation page
  await expect(
    page.getByRole('heading', { name: 'Delete Subscription' })
  ).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByText(subscriptionName)).toBeVisible()
})

test('confirm deletion removes subscription from list', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const { id: subscriptionId, name: subscriptionName } =
    await createTestSubscription(page)

  // Navigate to delete page directly
  await page.goto(`/en/subscriptions/${subscriptionId}/delete`)
  await page.waitForLoadState('networkidle')

  // Wait for delete API response
  const deleteApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes(`/api/v1/subscriptions/${subscriptionId}`) &&
      response.request().method() === 'DELETE'
  )

  // Confirm deletion
  const confirmButton = page.getByTestId('confirm-delete-subscription-button')
  await expect(confirmButton).toBeVisible({ timeout: 15000 })
  await confirmButton.click()

  const deleteResponse: Response = await deleteApiPromise
  expect(deleteResponse.status()).toBe(204)

  // Should redirect to subscriptions list
  await expect(page).toHaveURL(new RegExp('/en/subscriptions$'))
  await page.waitForLoadState('networkidle')

  // Verify subscription no longer appears in list
  await expect(page.getByText(subscriptionName)).not.toBeVisible({
    timeout: 5000,
  })
  await expect(
    page.getByTestId(`view-subscription-${subscriptionId}`)
  ).not.toBeVisible({ timeout: 5000 })
})

test('cancel button on delete page navigates back to detail', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const { id: subscriptionId } = await createTestSubscription(page)

  // Navigate to delete page directly
  await page.goto(`/en/subscriptions/${subscriptionId}/delete`)
  await page.waitForLoadState('networkidle')

  // Click cancel button
  const cancelButton = page.getByTestId('cancel-delete-subscription-button')
  await expect(cancelButton).toBeVisible({ timeout: 15000 })
  await cancelButton.click()

  // Should be back on detail page
  await expect(page).toHaveURL(
    new RegExp(`/en/subscriptions/${subscriptionId}$`)
  )
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({
    timeout: 15000,
  })
})
