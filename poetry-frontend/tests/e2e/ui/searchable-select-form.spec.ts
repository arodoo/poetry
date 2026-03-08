/*
 * File: searchable-select-form.spec.ts
 * Purpose: E2E test verifying SearchableSelect works in the
 * user creation form. Tests static status dropdown (no search)
 * confirms click-to-open plus option selection behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

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
    await selectOption(page, 'user-status-select', 'active')
    const trigger = page.getByTestId('user-status-select')
    await expect(trigger).toContainText(/active/i)
  })

  test('status select shows both options', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.getByTestId('user-status-select').click()
    const dropdown = page.getByTestId(
      'user-status-select-dropdown'
    )
    await expect(dropdown).toBeVisible({ timeout: 5000 })
    const buttons = dropdown.locator('button')
    await expect(buttons).toHaveCount(2)
  })
})
