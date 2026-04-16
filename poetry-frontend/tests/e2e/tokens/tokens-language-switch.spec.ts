/*
 * File: tokens-language-switch.spec.ts
 * Purpose: E2E test verifying the full language-switching round-trip on
 * the admin tokens page. Ensures that saving a new language actually
 * re-renders the entire UI in the selected locale (i18n context switch),
 * updates the URL prefix via React Router, and that sidebar links also
 * reflect the new locale. Requires Vite dev server (5173) + backend (8080).
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectOption } from '../shared/helpers/searchableSelectHelper'

async function goToTokensPage(page: Page, locale: 'en' | 'es'): Promise<void> {
  await page.goto(`/${locale}/admin/tokens`)
  await page.waitForLoadState('networkidle')
}

async function waitForFormReady(page: Page): Promise<void> {
  await expect(page.getByTestId('token-field-language')).toBeVisible({
    timeout: 15000,
  })
}

async function saveLanguage(page: Page, lang: 'en' | 'es'): Promise<void> {
  await selectOption(page, 'token-field-language', lang)
  await page.click('button[type="submit"]')
}

test.describe('Tokens Admin — Language Switch', (): void => {
  test('switching language updates URL, UI and sidebar links', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await goToTokensPage(page, 'en')
    await waitForFormReady(page)

    // Determine starting locale (useApplyTokenLanguage may auto-redirect)
    const startUrl = page.url()
    const startLocale: 'en' | 'es' = startUrl.includes('/es/') ? 'es' : 'en'
    const targetLocale: 'en' | 'es' = startLocale === 'en' ? 'es' : 'en'
    const targetTitle =
      targetLocale === 'es'
        ? 'Configuración de Tokens UI'
        : 'UI Token Configuration'
    const targetUrlPattern = targetLocale === 'es' ? /\/es\// : /\/en\//

    // Switch to the other language
    await saveLanguage(page, targetLocale)

    // URL must change to new locale
    await page.waitForURL(targetUrlPattern, { timeout: 15000 })

    // UI title must render in new locale (i18n context switched)
    await expect(page.getByText(targetTitle)).toBeVisible({ timeout: 10000 })

    // Sidebar links must also use the new locale prefix (Router params updated)
    const sidebarLink = page.locator('nav a').first()
    await expect(sidebarLink).toHaveAttribute(
      'href',
      new RegExp(`^/${targetLocale}/`)
    )

    // Restore original language for test isolation
    await saveLanguage(page, startLocale)
    await page.waitForURL(startLocale === 'es' ? /\/es\// : /\/en\//, {
      timeout: 15000,
    })
  })
})
