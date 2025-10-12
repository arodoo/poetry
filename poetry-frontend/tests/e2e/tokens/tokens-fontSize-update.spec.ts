/*
 * File: tokens-fontSize-update.spec.ts
 * Purpose: E2E test for font size selection update on tokens admin page.
 * Verifies dropdown has minimum 3 options from backend and saves
 * individual field change. All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens Admin - Font Size Update', (): void => {
  test('should load fontSize options from backend and save change', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const fontSizeSelect = page.locator('select#fontSize')
    await expect(fontSizeSelect).toBeVisible()

    const optionCount = await fontSizeSelect.locator('option').count()
    expect(optionCount).toBeGreaterThanOrEqual(3)

    const initialValue = await fontSizeSelect.inputValue()
    const allOptions = await fontSizeSelect.locator('option').allTextContents()
    const otherOption = allOptions.find((opt): boolean => opt !== initialValue)
    expect(otherOption).toBeDefined()

    const optionToSelect = await fontSizeSelect
      .locator('option')
      .filter({ hasText: otherOption! })
      .getAttribute('value')

    await fontSizeSelect.selectOption(optionToSelect!)
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await page.reload()
    await page.waitForLoadState('networkidle')

    const savedValue = await page.locator('select#fontSize').inputValue()
    expect(savedValue).toBe(optionToSelect)
  })
})
