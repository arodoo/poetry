/*
 File: tokens-ui-fontSize-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when fontSize token
 changes. Validates font-size CSS values update after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import {
  injectTokens,
  waitForCssChange,
} from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Font Size Visual Update', () => {
  test('should visually update font sizes in UI after save', async ({
    page,
  }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const fontSizeSelect = page.locator('select#fontSize')
    await expect(fontSizeSelect).toBeVisible()

    const initialValue = await fontSizeSelect.inputValue()
    const allOptions = await fontSizeSelect.locator('option').allTextContents()
    const differentOption = allOptions.find((opt) => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative fontSize option available')
    }

    const h1Before = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return '0px'
      const styles = getComputedStyle(h1)
      return styles.fontSize
    })

    const optionValue = await fontSizeSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await fontSizeSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await waitForCssChange(page, 'h1', 'fontSize', h1Before)
    const h1After = await page.evaluate(() => {
      const h1 = document.querySelector('h1')
      if (!h1) return '0px'
      const styles = getComputedStyle(h1)
      return styles.fontSize
    })

    expect(h1After).not.toBe(h1Before)
  })
})
