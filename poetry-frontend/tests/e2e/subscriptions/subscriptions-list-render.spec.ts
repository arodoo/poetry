/*
 * File: subscriptions-list-render.spec.ts
 * Purpose: E2E test for subscriptions list page rendering with DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Response } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForSubscriptionsApiResponse } from './subscriptions-list-helpers'

test('subscriptions list page renders with 20 seeded plans', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  
  // Start waiting for API response before navigation
  const apiResponsePromise: Promise<Response> =
    waitForSubscriptionsApiResponse(page)
  
  // Navigate to subscriptions page
  const initialResponse: Response | null = await page.goto('/en/subscriptions')
  if (initialResponse == null)
    throw new Error('tests.subscriptions.initialResponse.missing')
  expect(initialResponse.status()).toBe(200)
  
  // Wait for URL and network to settle
  await page.waitForURL(/\/en\/subscriptions$/)
  await page.waitForLoadState('networkidle')
  
  // Check if we got redirected or have an error page
  const currentUrl: string = page.url()
  console.log('Current URL:', currentUrl)
  
  // Wait for the API response with better error handling
  try {
    const apiResponse: Response = await apiResponsePromise
    expect(apiResponse.status()).toBe(200)
  } catch (error) {
    console.error('API response error:', error)
    // Take screenshot for debugging
    await page.screenshot({ path: 'test-results/subscriptions-error.png' })
    throw error
  }
  
  // Check for page heading
  await expect(
    page.getByRole('heading', { name: 'Subscription Plans' })
  ).toBeVisible({
    timeout: 15000,
  })
  
  // Ensure we're not on a 404 page
  await expect(
    page.getByRole('heading', { name: 'Page not found' })
  ).toHaveCount(0)
  
  // Check for subscription data
  await expect(page.getByText('Basic Monthly')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByText('Pro Monthly')).toBeVisible({
    timeout: 15000,
  })
  await expect(page.getByText('USD 9.99').first()).toBeVisible({
    timeout: 15000,
  })
  
  // Check for view button
  await expect(page.getByTestId('view-subscription-1')).toBeVisible({
    timeout: 15000,
  })
})
