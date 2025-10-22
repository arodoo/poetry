/*
 File: tokens-ui-spacing-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when spacing token
 changes. Validates padding/margin CSS values update after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import { injectTokens, waitForCssChange } from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Spacing Visual Update', () => {
  test('should visually update spacing in UI after save', async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const spacingSelect = page.locator('select#spacing')
    await expect(spacingSelect).toBeVisible()

    const initialValue = await spacingSelect.inputValue()
    const allOptions = await spacingSelect.locator('option').allTextContents()
    const differentOption = allOptions.find((opt) => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative spacing option available')
    }

    const buttonBefore = await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]')
      if (!button) return '0px'
      const styles = getComputedStyle(button)
      return styles.padding
    })

    const optionValue = await spacingSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await spacingSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await waitForCssChange(page, 'button[type="submit"]', 'padding', buttonBefore)
    const buttonAfter = await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]')
      if (!button) return '0px'
      const styles = getComputedStyle(button)
      return styles.padding
    })

    expect(buttonAfter).not.toBe(buttonBefore)
  })
})
