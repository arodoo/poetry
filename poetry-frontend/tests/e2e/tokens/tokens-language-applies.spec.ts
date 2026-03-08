/*
 * File: tokens-language-applies.spec.ts
 * Purpose: E2E test verifying that changing the token language
 * selection actually applies the language to the UI. Catches Bug #4
 * where language was saved but never applied to the i18n system.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

test.describe('Tokens - Language applies to UI', (): void => {
  test('saving Spanish applies es locale to URL', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    await selectOption(page, 'token-field-language', 'es')
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/actualizados exitosamente|updated/i)
    ).toBeVisible({ timeout: 10000 })

    await page.waitForURL(/\/es\//, { timeout: 15000 })

    await selectOption(page, 'token-field-language', 'en')
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/updated successfully|actualizados/i)
    ).toBeVisible({ timeout: 10000 })

    await page.waitForURL(/\/en\//, { timeout: 15000 })
  })
})
