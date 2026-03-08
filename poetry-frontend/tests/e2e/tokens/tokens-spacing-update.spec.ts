/*
 * File: tokens-spacing-update.spec.ts
 * Purpose: E2E test for spacing update via SearchableSelect
 * on the tokens admin page. Verifies save persists after reload.
 * Catches regressions in token selection persistence.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectDifferentOption } from
  '../shared/helpers/searchableSelectHelper'

const TID = 'token-field-spacing'
const TOAST = /updated|actualizados/i

test.describe('Tokens - Spacing Update', (): void => {
  test('saves spacing change', async ({
    page,
  }: { page: Page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const row = page.getByTestId(TID)
    await expect(row).toBeVisible({ timeout: 10000 })

    const picked = await selectDifferentOption(page, TID)
    await page.click('button[type="submit"]')
    await expect(page.getByText(TOAST))
      .toBeVisible({ timeout: 5000 })

    await page.reload()
    await page.waitForLoadState('networkidle')
    await expect(page.getByTestId(`${TID}-selected`))
      .toContainText(picked, { timeout: 10000 })
  })
})
