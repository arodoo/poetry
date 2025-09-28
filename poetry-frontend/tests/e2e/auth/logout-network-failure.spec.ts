/*
 * File: logout-network-failure.spec.ts
 * Purpose: Assert logout still clears tokens + redirects when API fails.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { TOKEN_STORAGE_KEY } from '../../../src/shared/security/tokenStorage'

// Simulate network failure by intercepting the POST call.

test('logout proceeds on network failure', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.route(
    '**/api/v1/auth/logout',
    (route: import('@playwright/test').Route): void => {
      void route.abort('failed')
    }
  )
  await page.goto('/en/dashboard')
  await page.getByTestId('user-menu').click()
  await page.getByTestId('logout-button').click()
  await page.waitForURL(/\/en\/login$/)
  const hasTokens: boolean = await page.evaluate(
    (k: string): boolean => !!localStorage.getItem(k),
    TOKEN_STORAGE_KEY
  )
  expect(hasTokens).toBeFalsy()
})
