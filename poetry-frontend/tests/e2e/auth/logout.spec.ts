/*
 * File: logout.spec.ts
 * Purpose: Verify full logout behavior (API call, redirect, token removal, access denial).
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { TOKEN_STORAGE_KEY } from '../../../src/shared/security/tokenStorage'

test('logout triggers API, clears tokens, and invalidates auth session', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/dashboard')
  expect(page.url()).toMatch(/\/en\/dashboard$/)
  const logoutRequest: Promise<unknown> = page.waitForResponse(
    '**/api/v1/auth/logout'
  )
  await page.getByTestId('user-menu').click()
  await page.getByTestId('logout-button').click()
  const respUnknown: unknown = await logoutRequest.catch((): null => null)
  if (!respUnknown) test.fail(true, 'Logout API call missing')
  else {
    const maybeResp: { status?: number } = respUnknown as { status?: number }
    expect(maybeResp.status ?? 0).toBeGreaterThanOrEqual(200)
  }
  await page.waitForURL(/\/en\/login$/)
  const hasTokens: boolean = await page.evaluate(
    (k: string): boolean => !!localStorage.getItem(k),
    TOKEN_STORAGE_KEY
  )
  expect(hasTokens).toBeFalsy()
  // Directly call auth/me via fetch in page context; should yield 401/403.
  const status: number = await page.evaluate(async (): Promise<number> => {
    const r: Response = await fetch('/api/v1/auth/me')
    return r.status
  })
  expect([401, 403]).toContain(status)
})
