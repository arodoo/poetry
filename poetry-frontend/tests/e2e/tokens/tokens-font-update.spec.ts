/*
 * File: tokens-font-update.spec.ts
 * Purpose: E2E test for font family selection update on tokens admin page.
 * Verifies dropdown has minimum 3 options from backend and saves
 * individual field change. All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens Admin - Font Update', (): void => {
  test('should load font options from backend and save change', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const fontSelect = page.locator('select#font')
    await expect(fontSelect).toBeVisible()

    const optionCount = await fontSelect.locator('option').count()
    expect(optionCount).toBeGreaterThanOrEqual(3)

    const initialValue = await fontSelect.inputValue()
    const allOptions = await fontSelect.locator('option').allTextContents()
    const otherOption = allOptions.find(
      (opt): boolean => opt !== initialValue
    )
    expect(otherOption).toBeDefined()

    const optionToSelect = await fontSelect
      .locator('option')
      .filter({ hasText: otherOption! })
      .getAttribute('value')

    await fontSelect.selectOption(optionToSelect!)
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await page.reload()
    await page.waitForLoadState('networkidle')

    const savedValue = await page.locator('select#font').inputValue()
    expect(savedValue).toBe(optionToSelect)
  })
})
