/*
 * File: tokens-language-update.spec.ts
 * Purpose: E2E test for system language update on tokens admin page.
 * Verifies that changing the system language affects root redirection
 * and that the entire UI re-renders in the new language.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

test.describe('Tokens Admin - Language Update', (): void => {
  test('language change redirects root and translates UI', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    await selectOption(page, 'token-field-language', 'es')
    await page.click('button[type="submit"]')

    await expect(page.getByText(/updated|actualizados/i)).toBeVisible({
      timeout: 10000,
    })

    await page.goto('/')
    await expect(page).toHaveURL(/\/es\//, { timeout: 10000 })

    await page.goto('/es/users')
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/\/es\//, { timeout: 5000 })

    await page.goto('/es/admin/tokens')
    await page.waitForLoadState('networkidle')
    await selectOption(page, 'token-field-language', 'en')
    await page.click('button[type="submit"]')

    await expect(page.getByText(/updated|actualizados/i)).toBeVisible({
      timeout: 10000,
    })

    await page.waitForURL(/\/en\//, { timeout: 15000 })
  })
})
