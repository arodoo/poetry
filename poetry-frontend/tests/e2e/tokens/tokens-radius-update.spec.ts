/*
 * File: tokens-radius-update.spec.ts
 * Purpose: E2E test for radius selection update on tokens admin page.
 * Verifies dropdown has minimum 3 options from backend and saves
 * individual field change. All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens Admin - Radius Update', (): void => {
  test('should load radius options from backend and save change', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const radiusSelect = page.locator('select#radius')
    await expect(radiusSelect).toBeVisible()

    const optionCount = await radiusSelect.locator('option').count()
    expect(optionCount).toBeGreaterThanOrEqual(3)

    const initialValue = await radiusSelect.inputValue()
    const allOptions = await radiusSelect.locator('option').allTextContents()
    const otherOption = allOptions.find((opt): boolean => opt !== initialValue)
    expect(otherOption).toBeDefined()

    const optionToSelect = await radiusSelect
      .locator('option')
      .filter({ hasText: otherOption! })
      .getAttribute('value')

    await radiusSelect.selectOption(optionToSelect!)
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await page.reload()
    await page.waitForLoadState('networkidle')

    const savedValue = await page.locator('select#radius').inputValue()
    expect(savedValue).toBe(optionToSelect)
  })
})
