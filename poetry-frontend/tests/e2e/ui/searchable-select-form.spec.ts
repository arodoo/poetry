/*
 * File: searchable-select-form.spec.ts
 * Purpose: E2E test verifying SearchableSelect works in the
 * user creation form. Tests status dropdown with real search
 * and selection interactions against Java-served frontend.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('SearchableSelect on user form', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/users/new')
    await page.waitForLoadState('networkidle')
  })

  test('status select opens and picks active', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const input = page.locator(
      '[data-testid="user-status-select"]'
    )
    await input.click()
    const dropdown = page.locator(
      '[data-testid="user-status-select-dropdown"]'
    )
    await expect(dropdown).toBeVisible({ timeout: 5000 })
    await page.locator(
      '[data-testid="user-status-select-opt-active"]'
    ).click()
    const display = page.locator(
      '[data-testid="user-status-select-selected"]'
    )
    await expect(display).toBeVisible()
  })

  test('status select filters options by typing', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const input = page.locator(
      '[data-testid="user-status-select"]'
    )
    await input.click()
    await input.fill('inact')
    const dropdown = page.locator(
      '[data-testid="user-status-select-dropdown"]'
    )
    await expect(dropdown).toBeVisible()
    const options = dropdown.locator('button')
    await expect(options).toHaveCount(1)
  })
})
