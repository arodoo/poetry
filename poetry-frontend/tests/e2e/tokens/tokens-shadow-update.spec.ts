/*
 * File: tokens-shadow-update.spec.ts
 * Purpose: E2E test for shadow selection update on tokens admin page.
 * Verifies dropdown has minimum 3 options from backend and saves
 * individual field change. All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Tokens Admin - Shadow Update', (): void => {
  test('should load shadow options from backend and save change', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await injectTokens(page)
    await page.goto('/en/admin/tokens')
    await page.waitForLoadState('networkidle')

    const shadowSelect = page.locator('select#shadow')
    await expect(shadowSelect).toBeVisible()

    const optionCount = await shadowSelect.locator('option').count()
    expect(optionCount).toBeGreaterThanOrEqual(3)

    const initialValue = await shadowSelect.inputValue()
    const allOptions = await shadowSelect.locator('option').allTextContents()
    const otherOption = allOptions.find(
      (opt): boolean => opt !== initialValue
    )
    expect(otherOption).toBeDefined()

    const optionToSelect = await shadowSelect
      .locator('option')
      .filter({ hasText: otherOption! })
      .getAttribute('value')

    await shadowSelect.selectOption(optionToSelect!)
    await page.click('button[type="submit"]')

    await expect(
      page.getByText(/updated successfully|actualizados exitosamente/i)
    ).toBeVisible({ timeout: 5000 })

    await page.reload()
    await page.waitForLoadState('networkidle')

    const savedValue = await page.locator('select#shadow').inputValue()
    expect(savedValue).toBe(optionToSelect)
  })
})
