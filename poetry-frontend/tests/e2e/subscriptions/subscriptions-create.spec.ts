/*
 * File: subscriptions-create.spec.ts
 * Purpose: E2E test for subscription creation form functionality.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

async function createTestSubscription(
  page: Page
): Promise<{ name: string; id: string }> {
  const timestamp: number = Date.now()
  const subscriptionName = `TestSub${String(timestamp)}`

  await page.goto('/en/subscriptions/new')

  // Fill form fields
  await page.getByTestId('subscription-name-input').fill(subscriptionName)
  await page
    .getByTestId('subscription-description-input')
    .fill('Test subscription description')
  await page.getByTestId('subscription-price-input').fill('19.99')
  await selectOption(page, 'subscription-currency-select', 'USD')
  await page.getByTestId('subscription-duration-input').fill('30')
  await selectOption(page, 'subscription-status-select', 'active')

  // Wait for create API response
  const createApiPromise: Promise<Response> = page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/subscriptions') &&
      response.request().method() === 'POST'
  )

  // Submit form
  await page.getByTestId('subscription-submit-button').click()

  const createResponse: Response = await createApiPromise
  const subscriptionData = (await createResponse.json()) as { id?: number }

  return { name: subscriptionName, id: String(subscriptionData.id ?? '') }
}

test('loads create subscription form with all fields', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions/new', { waitUntil: 'domcontentloaded' })

  // Check page heading
  await expect(
    page.getByRole('heading', { name: 'Create Subscription' })
  ).toBeVisible({
    timeout: 15000,
  })

  // Check all form fields are present
  await expect(page.getByTestId('subscription-name-input')).toBeVisible()
  await expect(page.getByTestId('subscription-description-input')).toBeVisible()
  await expect(page.getByTestId('subscription-price-input')).toBeVisible()
  await expect(page.getByTestId('subscription-currency-select')).toBeVisible()
  await expect(page.getByTestId('subscription-duration-input')).toBeVisible()
  await expect(page.getByTestId('subscription-status-select')).toBeVisible()

  // Check buttons
  await expect(page.getByTestId('subscription-submit-button')).toBeVisible()
  await expect(page.getByTestId('subscription-cancel-button')).toBeVisible()
})

test('creates new subscription successfully', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)

  const { name: subscriptionName, id: subscriptionId } =
    await createTestSubscription(page)

  // Should redirect to subscriptions list
  await expect(page).toHaveURL(new RegExp('/en/subscriptions$'))

  // Take screenshot for debugging
  await page.screenshot({
    path: `test-results/subscription-created-${subscriptionId}.png`,
  })

  // Check if pagination is affecting visibility - go to first page
  const firstPageButton = page.getByTestId('pagination-first-page')
  if (await firstPageButton.isVisible()) {
    await firstPageButton.click()
  }

  // Try searching for the subscription
  const searchInput = page.getByPlaceholder(/search/i)
  if (await searchInput.isVisible()) {
    await searchInput.fill(subscriptionName)
    await page.waitForTimeout(2000) // Wait for search to filter
  }

  console.log(
    `Looking for subscription: ${subscriptionName} with ID: ${subscriptionId}`
  )

  // Verify subscription appears in list
  await expect(page.getByText(subscriptionName)).toBeVisible({ timeout: 15000 })
  await expect(page.getByText('USD 19.99')).toBeVisible()
  await expect(
    page.getByTestId(`view-subscription-${subscriptionId}`)
  ).toBeVisible()
})

test('cancel button navigates back to subscriptions list', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions/new')

  await expect(
    page.getByRole('heading', { name: 'Create Subscription' })
  ).toBeVisible({
    timeout: 15000,
  })

  const cancelButton = page.getByTestId('subscription-cancel-button')
  await expect(cancelButton).toBeVisible()
  await cancelButton.click()

  await expect(page).toHaveURL(new RegExp('/en/subscriptions$'))
  await expect(
    page.getByRole('heading', { name: 'Subscription Plans' })
  ).toBeVisible({
    timeout: 15000,
  })
})
