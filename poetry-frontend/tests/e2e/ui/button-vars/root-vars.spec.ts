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
  const primary: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue(
      '--color-primary'
    )
  )
  const error: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-error')
  )
  const text: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue('--color-text')
  )
  expect(primary).toBeTruthy()
  expect(primary).not.toBe('')
  expect(error).toBeTruthy()
  expect(error).not.toBe('')
  expect(text).toBeTruthy()
  expect(text).not.toBe('')
})
