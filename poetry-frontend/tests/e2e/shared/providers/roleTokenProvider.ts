/*
 * File: roleTokenProvider.ts
 * Purpose: Injects role-specific tokens into page localStorage
 * for E2E tests that need manager or admin auth context.
 * Mirrors injectTokens pattern from tokenProvider.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { Page } from '@playwright/test'
import { loginAs, type RoleTokens } from './roleTokenService'

const LS_KEY = 'poetry.auth.tokens'

export async function injectRoleTokens(
  page: Page,
  role: 'admin' | 'manager'
): Promise<void> {
  const t: RoleTokens = await loginAs(role)
  await page.addInitScript(
    ([k, v]: [string, string]): void => {
      localStorage.setItem(k, v)
    },
    [
      LS_KEY,
      JSON.stringify({
        accessToken: t.accessToken,
        refreshToken: t.refreshToken,
      }),
    ] as [string, string]
  )
  await page.addInitScript(() => {
    ;(globalThis as unknown as { __E2E__?: boolean }).__E2E__ = true
  })
}
