/*
 File: tokens-ui-radius-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when radius token
 changes. Validates border-radius CSS values update after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Radius Visual Update', () => {
  test('should visually update border radius in UI after save', async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const radiusSelect = page.locator('select#radius')
    await expect(radiusSelect).toBeVisible()

    const initialValue = await radiusSelect.inputValue()
    const allOptions = await radiusSelect.locator('option').allTextContents()
    const differentOption = allOptions.find(opt => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative radius option available')
    }

    const buttonBefore = await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]')
      if (!button) return '0px'
      const styles = getComputedStyle(button)
      return styles.borderRadius
    })

    const optionValue = await radiusSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await radiusSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await page.waitForTimeout(500)

    const buttonAfter = await page.evaluate(() => {
      const button = document.querySelector('button[type="submit"]')
      if (!button) return '0px'
      const styles = getComputedStyle(button)
      return styles.borderRadius
    })

    expect(buttonAfter).not.toBe(buttonBefore)
  })
})
