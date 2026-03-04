/*
 File: root-vars.spec.ts
 Purpose: Verify document root CSS variables used by Button are present.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

test('document root CSS vars established', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users')
  await page.waitForLoadState('networkidle')
  await expect(async () => {
    const primary: string = await page.evaluate(() =>
      getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
    )
    expect(primary.trim()).not.toBe('')
  }).toPass({ timeout: 10000 })
  const error: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-error')
  )
  const text: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement)
      .getPropertyValue('--color-text')
  )
  expect(error.trim()).not.toBe('')
  expect(text.trim()).not.toBe('')
})
