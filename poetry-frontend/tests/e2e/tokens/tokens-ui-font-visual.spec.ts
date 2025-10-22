/*
 File: tokens-ui-font-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when font token
 changes. Validates font-family CSS property changes after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import { injectTokens, waitForCssChange } from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Font Visual Update', () => {
  test('should visually update font family in UI after save', async ({
    page,
  }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const fontSelect = page.locator('select#font')
    await expect(fontSelect).toBeVisible()

    const initialValue = await fontSelect.inputValue()
    const allOptions = await fontSelect.locator('option').allTextContents()
    const differentOption = allOptions.find((opt) => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative font option available')
    }

    const bodyBefore = await page.evaluate(() => {
      const styles = getComputedStyle(document.body)
      return styles.fontFamily
    })

    const optionValue = await fontSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await fontSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    // Wait for the body font-family computed style to change
    await waitForCssChange(page, 'document', 'fontFamily', bodyBefore)

    const bodyAfter = await page.evaluate(() => {
      const styles = getComputedStyle(document.body)
      return styles.fontFamily
    })

    expect(bodyAfter).not.toBe(bodyBefore)
  })
})
