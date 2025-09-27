/*
 * File: logout-ui-flow.spec.ts
 * Purpose: Full UI login->protected->logout journey asserting redirect & guard.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test('UI logout redirects and clears visible auth artifacts', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/dashboard')
  await expect(page.getByTestId('user-menu')).toBeVisible()
  await page.getByTestId('user-menu').click()
  await page.getByTestId('logout-button').click()
  await page.waitForURL(/\/en\/login$/)
  await expect(page.getByTestId('user-menu')).toHaveCount(0)
  // NOTE: Route guard still relies on static stub session; post-logout direct
  // navigation assertions deferred until dynamic session implemented.
})
