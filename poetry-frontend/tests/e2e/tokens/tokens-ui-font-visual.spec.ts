/*
 * File: tokens-ui-font-visual.spec.ts
 * Purpose: E2E test verifying the UI visually updates
 * when the font token changes. Validates font-family
 * CSS property changes on document.body after save.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import {
  injectTokens,
  waitForCssChange,
} from '../shared/providers/tokenProvider'
import { selectDifferentOption } from '../shared/helpers/searchableSelectHelper'

const TID = 'token-field-font'
test.setTimeout(120000)

test.describe('Tokens UI - Font Visual', (): void => {
  test('updates font-family after save', async ({ page }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const row = page.getByTestId(TID)
    await expect(row).toBeVisible({ timeout: 10000 })

    const before = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily
    )

    await selectDifferentOption(page, TID)
    await page.click('button[type="submit"]')

    const toast = /updated|actualizados/i
    await expect(page.getByText(toast)).toBeVisible({ timeout: 5000 })

    await waitForCssChange(page, 'document', 'fontFamily', before)
    const after = await page.evaluate(
      () => getComputedStyle(document.body).fontFamily
    )
    expect(after).not.toBe(before)
  })
})
