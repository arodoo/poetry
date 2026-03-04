/*
 * File: table-transition.spec.ts
 * Purpose: E2E test to verify smooth transition in DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('should apply smooth opacity transition during fetching', async ({
  page,
}) => {
  await injectTokens(page)
  await page.goto('/en/users')

  const tableContainer = page.getByTestId('data-table-wrapper')
  await expect(tableContainer).toBeVisible()

  // Intercept and delay API response
  await page.route('**/api/v1/users/paged*', async (route) => {
    console.log('INTERCEPTED:', route.request().url())
    await new Promise((resolve) => setTimeout(resolve, 1500))
    await route.continue()
  })

  // Trigger search to cause re-fetch
  const searchInput = page.getByPlaceholder(/Buscar|Search/)
  const testSearch = 'admin_' + Date.now()
  await searchInput.fill(testSearch)

  // Verify transition is happening
  const wrapper = page.getByTestId('data-table-wrapper')

  // Wait for the fetching state to be active
  await expect(wrapper).toHaveAttribute('data-fetching', 'true', {
    timeout: 5000,
  })

  // Detect timing: transition starts. Measure between 100ms and 400ms.
  // We expect opacity to be decreasing but not finished.
  await page.waitForTimeout(100)
  const opacityMid = await wrapper.evaluate((el) =>
    parseFloat(window.getComputedStyle(el).opacity)
  )
  console.log('Opacity at 100ms:', opacityMid)
  expect(opacityMid).toBeLessThan(1)
  expect(opacityMid).toBeGreaterThan(0.4) // Target is 0.4

  // Eventually it should reach 0.4 OR be very close
  await expect(async () => {
    const opacity = await wrapper.evaluate((el) =>
      parseFloat(window.getComputedStyle(el).opacity)
    )
    console.log('Opacity while fetching:', opacity)
    expect(opacity).toBeLessThanOrEqual(0.6)
  }).toPass({ timeout: 2000 })

  // Verify it returns to not-fetching and opacity 1
  await expect(async () => {
    const attr = await wrapper.getAttribute('data-fetching')
    expect(attr === 'false' || attr === 'undefined').toBe(true)
  }).toPass({ timeout: 5000 })
  await expect(async () => {
    const opacity = await wrapper.evaluate((el) =>
      parseFloat(window.getComputedStyle(el).opacity)
    )
    expect(opacity).toBe(1)
  }).toPass({ timeout: 2000 })
})
