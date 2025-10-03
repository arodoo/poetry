/*
 File: tokens-cssvars.spec.ts
 Purpose: Visit a page and verify TokensProvider applied CSS variables.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'

test('page loads and CSS variables are set', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await page.goto('http://localhost:5173/en/users', {
    waitUntil: 'networkidle',
  })
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
