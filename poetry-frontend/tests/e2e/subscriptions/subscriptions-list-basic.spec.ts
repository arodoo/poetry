/*
 * File: subscriptions-list-basic.spec.ts
 * Purpose: Basic E2E test for subscriptions list page navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('subscriptions list page loads successfully', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  // Inject authentication tokens
  await injectTokens(page)
  
  // Navigate to subscriptions page
  await page.goto('/en/subscriptions')
  
  // Wait for page to load
  await page.waitForLoadState('networkidle')
  
  // Log current URL for debugging
  console.log('Current URL:', page.url())
  
  // Check if we're on the right page (not redirected)
  expect(page.url()).toContain('/en/subscriptions')
  
  // Take a screenshot for debugging BEFORE checking heading
  await page.screenshot({ 
    path: 'test-results/subscriptions-page-state.png', 
    fullPage: true 
  })
  
  // Get all text content to see what's on the page
  const bodyText = await page.textContent('body')
  console.log('Page body text (first 500 chars):', bodyText?.substring(0, 500))
  
  // Check for any heading
  const allHeadings = await page.locator('h1, h2, h3, h4, h5, h6').all()
  console.log('Number of headings found:', allHeadings.length)
  for (const heading of allHeadings) {
    const text = await heading.textContent()
    console.log('Heading text:', text)
  }
  
  // Check for page heading (this will tell us if the page rendered)
  const heading = page.getByRole('heading', { name: /subscription/i })
  await expect(heading).toBeVisible({ timeout: 10000 })
})
