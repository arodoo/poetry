/*
 File: tokens-api.spec.ts
 Purpose: Ensure tokens API returns expected structure when called directly.
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'

test('tokens API returns themes and colors', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  const response: import('@playwright/test').APIResponse =
    await page.request.get('http://localhost:5173/api/v1/tokens')
  expect(response.ok()).toBeTruthy()
  const data = (await response.json()) as {
    themes?: { colors?: { primary?: string } }[]
  }
  expect(data.themes).toBeDefined()
  const themes = data.themes as { colors?: { primary?: string } }[]
  expect(themes.length).toBeGreaterThan(0)
  const theme0: { colors?: { primary?: string } } = themes[0]!
  expect(theme0.colors).toBeDefined()
  expect(theme0.colors!.primary).toBeTruthy()
})
