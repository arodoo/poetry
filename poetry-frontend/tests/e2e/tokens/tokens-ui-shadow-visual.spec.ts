/*
 File: tokens-ui-shadow-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when shadow token
 changes. Validates box-shadow CSS values update after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import { injectTokens, waitForCssChange } from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Shadow Visual Update', () => {
  test('should visually update box shadow in UI after save', async ({
    page,
  }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const shadowSelect = page.locator('select#shadow')
    await expect(shadowSelect).toBeVisible()

    const initialValue = await shadowSelect.inputValue()
    const allOptions = await shadowSelect.locator('option').allTextContents()
    const differentOption = allOptions.find((opt) => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative shadow option available')
    }

    const cardBefore = await page.evaluate(() => {
      const card = document.querySelector('div[class*="card"]')
      if (!card) return 'none'
      const styles = getComputedStyle(card)
      return styles.boxShadow
    })

    const optionValue = await shadowSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await shadowSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await waitForCssChange(page, 'div[class*="card"]', 'boxShadow', cardBefore)
    const cardAfter = await page.evaluate(() => {
      const card = document.querySelector('div[class*="card"]')
      if (!card) return 'none'
      const styles = getComputedStyle(card)
      return styles.boxShadow
    })

    expect(cardAfter).not.toBe(cardBefore)
  })
})
