/*
 * File: searchableSelectHelper.ts
 * Purpose: E2E helper to interact with SearchableSelect components
 * in Playwright tests. Provides a consistent way to select an
 * option by clicking the trigger and choosing from the dropdown.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type Page, expect } from '@playwright/test'

export async function selectOption(
  page: Page,
  testId: string,
  optionValue: string
): Promise<void> {
  await page.getByTestId(testId).click()
  const dd = page.getByTestId(`${testId}-dropdown`)
  await expect(dd).toBeVisible({ timeout: 5000 })
  await dd
    .locator(`[data-testid="${testId}-opt-${optionValue}"]`)
    .first()
    .click()
}

export async function selectFirstOption(
  page: Page,
  testId: string,
  searchText?: string
): Promise<void> {
  const input = page.getByTestId(testId)
  await input.click()
  if (searchText) {
    await input.fill(searchText)
    await page.waitForTimeout(350)
  }
  const dd = page.getByTestId(`${testId}-dropdown`)
  await expect(dd).toBeVisible({ timeout: 5000 })
  const btn = dd.locator('button').first()
  await expect(btn).toBeVisible({ timeout: 5000 })
  await btn.click()
}

export async function selectDifferentOption(
  page: Page,
  testId: string
): Promise<string> {
  const selLoc = page.getByTestId(`${testId}-selected`)
  const hasSelected = await selLoc.isVisible().catch(() => false)
  const selected = hasSelected ? ((await selLoc.textContent()) ?? '') : ''
  await page.getByTestId(testId).click()
  const dd = page.getByTestId(`${testId}-dropdown`)
  await expect(dd).toBeVisible({ timeout: 5000 })
  const btns = dd.locator('button')
  const count = await btns.count()
  for (let i = 0; i < count; i++) {
    const label = (await btns.nth(i).textContent()) ?? ''
    if (label.trim() !== selected.trim()) {
      await btns.nth(i).click()
      return label.trim()
    }
  }
  throw new Error(`No different option for ${testId}`)
}
