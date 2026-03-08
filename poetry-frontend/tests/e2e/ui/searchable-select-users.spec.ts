/*
 * File: searchable-select-users.spec.ts
 * Purpose: E2E test verifying SearchableSelect dropdown works
 * on the users page. Tests open/filter/select interactions
 * using real page controls and form fields.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('SearchableSelect on users page', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/users')
    await expect(
      page.getByRole('heading', { name: 'Users' })
    ).toBeVisible({ timeout: 15000 })
  })

  test('page-size dropdown opens and selects a value', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const input = page.locator('[data-testid="page-size-select"]')
    await input.click()
    const dropdown = page.locator(
      '[data-testid="page-size-select-dropdown"]'
    )
    await expect(dropdown).toBeVisible({ timeout: 5000 })
    const opt25 = page.locator(
      '[data-testid="page-size-select-opt-25"]'
    )
    await opt25.click()
    const display = page.locator(
      '[data-testid="page-size-select-selected"]'
    )
    await expect(display).toContainText('25')
  })

  test('page-size dropdown filters options by typing', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const input = page.locator('[data-testid="page-size-select"]')
    await input.click()
    await input.fill('50')
    const dropdown = page.locator(
      '[data-testid="page-size-select-dropdown"]'
    )
    await expect(dropdown).toBeVisible()
    const options = dropdown.locator('button')
    await expect(options).toHaveCount(1)
    await expect(options.first()).toContainText('50')
  })
})
