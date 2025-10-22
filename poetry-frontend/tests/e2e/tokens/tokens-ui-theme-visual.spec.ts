/*
 File: tokens-ui-theme-visual.spec.ts
 Purpose: E2E test verifying UI visually updates when theme token
 changes. Validates CSS variables are applied immediately after save.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect } from '@playwright/test'
import { injectTokens, waitForCssChange } from '../shared/providers/tokenProvider'

test.describe('Tokens UI - Theme Visual Update', () => {
  test('should visually update theme colors in UI after save', async ({
    page,
  }) => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const themeSelect = page.locator('select#theme')
    await expect(themeSelect).toBeVisible()

    const initialValue = await themeSelect.inputValue()
    const allOptions = await themeSelect.locator('option').allTextContents()
    const differentOption = allOptions.find((opt) => opt !== initialValue)

    if (!differentOption) {
      throw new Error('No alternative theme option available')
    }

    const bodyBefore = await page.evaluate(() => {
      const styles = getComputedStyle(document.body)
      return {
        bg: styles.getPropertyValue('--color-background').trim(),
        fg: styles.getPropertyValue('--color-foreground').trim(),
      }
    })

    const optionValue = await themeSelect
      .locator('option')
      .filter({ hasText: differentOption })
      .getAttribute('value')

    await themeSelect.selectOption(optionValue!)
    await page.locator('button[type="submit"]').click()

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })


    await waitForCssChange(page, 'document', 'cssVar:--color-background', bodyBefore.bg)
    const bodyAfter = await page.evaluate(() => {
      const styles = getComputedStyle(document.body)
      return {
        bg: styles.getPropertyValue('--color-background').trim(),
        fg: styles.getPropertyValue('--color-foreground').trim(),
      }
    })

    expect(bodyAfter.bg).not.toBe(bodyBefore.bg)
  })
})
