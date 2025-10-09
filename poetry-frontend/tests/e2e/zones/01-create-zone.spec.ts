/*
 * 01-create-zone.spec.ts
 * E2E test for zone creation flow verifying form submission
 * manager selection and successful redirection to list view.
 * © 2025 Poetry Platform. All rights reserved.
 */

import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const TEST_ZONE_NAME = `TEST-ZONE-${Date.now()}`

test.describe('Zone Creation', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  test('should create new zone with manager', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/zones/new')
    await page.waitForLoadState('networkidle')

    await expect(
      page.getByRole('heading', { name: /Create zone/i })
    ).toBeVisible({ timeout: 15000 })

    await page.getByTestId('zone-name-input').fill(TEST_ZONE_NAME)
    await page
      .getByTestId('zone-description-input')
      .fill('Test zone description')

    const managerSelect: Locator = page.locator('select').first()
    await expect(managerSelect).toBeVisible()
    await page.waitForTimeout(2000)

    const options: Locator = managerSelect.locator('option')
    const optionsCount = await options.count()

    if (optionsCount <= 1) {
      test.skip(true, 'No users available for manager')
    }

    expect(optionsCount).toBeGreaterThan(1)
    await managerSelect.selectOption({ index: 1 })

    const submitButton: Locator = page.getByRole('button', {
      name: /Create zone/i,
    })
    await submitButton.click()

    await page.waitForURL(/\/en\/zones$/, { timeout: 10000 })

    await expect(
      page.getByText(/Zone created successfully/i)
    ).toBeVisible({ timeout: 5000 })

    await page.waitForTimeout(2000)
    
    // Check if there's content or error state
    const pageContent = await page.textContent('body')
    console.log('Page has table?', pageContent?.includes('table'))
    console.log('Page has DataTable?', pageContent?.includes('DataTable'))
    console.log('Page has error?', pageContent?.toLowerCase().includes('error'))
    
    await page.screenshot({ path: 'test-results/zones-list-after-create.png' })

    // Look for zone name in table using role-based selector
    const table = page.getByRole('table')
    await expect(table).toBeVisible({ timeout: 15000 })
    
    const nameCell = table.locator(`text="${TEST_ZONE_NAME}"`).first()
    await expect(nameCell).toBeVisible({ timeout: 10000 })
  })
})
