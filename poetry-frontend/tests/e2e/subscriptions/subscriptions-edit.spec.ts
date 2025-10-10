/*
 * File: subscriptions-edit.spec.ts
 * Purpose: E2E test for subscription editing functionality, especially status changes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForSubscriptionsApiResponse } from './subscriptions-list-helpers'

async function getSubscriptionIdFromButton(
  button: Locator,
  prefix: string
): Promise<string> {
  const testId: string = await button.getAttribute('data-testid') ?? ''
  return testId.replace(prefix, '')
}

test('edit subscription form loads with current data', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions')
  await waitForSubscriptionsApiResponse(page)
  
  // Click first view button to get a subscription
  const viewButton: Locator = page
    .locator('[data-testid^="view-subscription-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  
  const subscriptionId: string = await getSubscriptionIdFromButton(viewButton, 'view-subscription-')
  await viewButton.click()
  await page.waitForLoadState('networkidle')
  
  // Click edit button
  const editButton: Locator = page.getByTestId('edit-subscription-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  
  // Should be on edit page
  await expect(page).toHaveURL(new RegExp(`/en/subscriptions/${subscriptionId}/edit$`))
  await page.waitForLoadState('networkidle')
  
  // Check page heading
  await expect(page.getByRole('heading', { name: 'Edit Subscription' })).toBeVisible({
    timeout: 15000,
  })
  
  // Check form fields are populated (not empty)
  const nameInput = page.getByTestId('subscription-name-input')
  await expect(nameInput).toBeVisible()
  await expect(nameInput).not.toHaveValue('')
  
  const priceInput = page.getByTestId('subscription-price-input')
  await expect(priceInput).toBeVisible()
  await expect(priceInput).not.toHaveValue('0')
  
  const statusSelect = page.getByTestId('subscription-status-select')
  await expect(statusSelect).toBeVisible()
})

test('can change subscription status and save successfully', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions')
  await waitForSubscriptionsApiResponse(page)
  
  // Click first view button to get a subscription
  const viewButton: Locator = page
    .locator('[data-testid^="view-subscription-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  
  const subscriptionId: string = await getSubscriptionIdFromButton(viewButton, 'view-subscription-')
  await viewButton.click()
  await page.waitForLoadState('networkidle')
  
  // Click edit button
  const editButton: Locator = page.getByTestId('edit-subscription-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await page.waitForLoadState('networkidle')
  
  // Get current status
  const statusSelect = page.getByTestId('subscription-status-select')
  const currentStatus = await statusSelect.inputValue()
  
  // Change status to opposite
  const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
  await statusSelect.selectOption(newStatus)
  
  // Wait for update API response
  const updateApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes(`/api/v1/subscriptions/${subscriptionId}`) &&
      response.request().method() === 'PUT'
  )
  
  // Submit form
  await page.getByTestId('subscription-submit-button').click()
  
  const updateResponse: Response = await updateApiPromise
  expect(updateResponse.status()).toBe(200)
  
  // Should redirect to detail page
  await expect(page).toHaveURL(new RegExp(`/en/subscriptions/${subscriptionId}$`))
  await page.waitForLoadState('networkidle')
  
  // Verify status was updated on detail page
  const statusDisplay = page.getByTestId('subscription-status-display')
  await expect(statusDisplay).toBeVisible({ timeout: 15000 })
  
  const expectedText = newStatus === 'active' ? 'Active' : 'Inactive'
  await expect(statusDisplay).toHaveText(expectedText)
})

test('cancel button navigates back to detail page', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions')
  await waitForSubscriptionsApiResponse(page)
  
  // Click first view button to get a subscription
  const viewButton: Locator = page
    .locator('[data-testid^="view-subscription-"]')
    .first()
  await expect(viewButton).toBeVisible({ timeout: 15000 })
  
  const subscriptionId: string = await getSubscriptionIdFromButton(viewButton, 'view-subscription-')
  await viewButton.click()
  await page.waitForLoadState('networkidle')
  
  // Click edit button
  const editButton: Locator = page.getByTestId('edit-subscription-button')
  await expect(editButton).toBeVisible({ timeout: 15000 })
  await editButton.click()
  await page.waitForLoadState('networkidle')
  
  // Click cancel button
  const cancelButton = page.getByTestId('subscription-cancel-button')
  await expect(cancelButton).toBeVisible()
  await cancelButton.click()
  
  // Should be back on detail page
  await expect(page).toHaveURL(new RegExp(`/en/subscriptions/${subscriptionId}$`))
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible({
    timeout: 15000,
  })
})