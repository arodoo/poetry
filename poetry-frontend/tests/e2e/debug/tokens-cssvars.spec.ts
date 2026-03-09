/*
 File: tokens-cssvars.spec.ts
 Purpose: Visit a page and verify TokensProvider applied CSS variables.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('page loads and CSS variables are set', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/users', {})
  // Give tokens provider time to apply
  await page.waitForTimeout(3000)
  const primaryColor: string = await page.evaluate(() =>
    getComputedStyle(document.documentElement).getPropertyValue(
      '--color-primary'
    )
  )
  expect(primaryColor).toBeTruthy()
  expect(primaryColor).not.toBe('')
})
