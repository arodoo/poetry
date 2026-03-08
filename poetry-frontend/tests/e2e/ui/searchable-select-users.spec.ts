/*
 * File: searchable-select-users.spec.ts
 * Purpose: E2E test verifying SearchableSelect dropdown works
 * on the users page. Tests static page-size select (no search)
 * and confirms click-to-open plus option selection behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

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
    await selectOption(page, 'page-size-select', '25')
    const trigger = page.getByTestId('page-size-select')
    await expect(trigger).toContainText('25')
  })

  test('page-size dropdown shows all size options', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.getByTestId('page-size-select').click()
    const dropdown = page.getByTestId('page-size-select-dropdown')
    await expect(dropdown).toBeVisible({ timeout: 5000 })
    const buttons = dropdown.locator('button')
    await expect(buttons).toHaveCount(4)
  })
})
