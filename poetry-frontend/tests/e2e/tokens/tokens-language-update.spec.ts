/*
 * File: tokens-language-update.spec.ts
 * Purpose: E2E test for system language update on tokens admin page.
 * Verifies that changing the system language affects root redirection.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens Admin - Language Update', (): void => {
  test('should change system language and redirect correctly from root', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    // 1. Initial login (admin) and go to tokens page in English
    await injectTokens(page)
    await page.goto('/en/admin/tokens')

    const languageSelect = page.locator('select#language')
    await expect(languageSelect).toBeVisible()

    // 2. Change language to Spanish
    await languageSelect.selectOption('es')
    await page.click('button[type="submit"]')

    // 3. Verify success notification
    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 10000 })

    // 4. Navigate to root path (without prefix)
    // We navigate to / to check if it redirects based on NEW system default
    await page.goto('/')

    // 5. Verify redirection to /es/ (since system default is now 'es')
    // NOTE: This might fail initially if redirection logic is static
    await expect(page).toHaveURL(/\/es\//, { timeout: 10000 })
  })
})
