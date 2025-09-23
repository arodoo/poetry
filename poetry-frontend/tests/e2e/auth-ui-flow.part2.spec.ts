/*
 File: auth-ui-flow.part2.spec.ts
 Purpose: Login UI flow tests (success + loading).
 All Rights Reserved. Arodi Emmanuel
*/
import { test, expect, type Page } from '@playwright/test'

interface TokenResponseLike {
  username?: string
  accessToken?: string
  refreshToken?: string
  expiresIn?: number
}

const U: string = 'admin'
const P: string = 'ChangeMe123!'
const LS_KEY: string = 'poetry.auth.tokens'

function getTokens(page: Page): Promise<TokenResponseLike | null> {
  return page.evaluate((k: string): TokenResponseLike | null => {
    try {
      return JSON.parse(
        localStorage.getItem(k) ?? 'null'
      ) as TokenResponseLike | null
    } catch {
      return null
    }
  }, LS_KEY)
}

test.describe('Login UI Flow Part2', (): void => {
  test('successful login flow with token storage and redirect', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/es/login')
    await page.locator('input[name="username"]').fill(U)
    await page.locator('input[name="password"]').fill(P)
    await Promise.all([
      page.waitForURL('**/dashboard'),
      page.locator('button[type="submit"]').click(),
    ])
    expect(page.url()).toContain('/dashboard')
    await expect(page.locator('text=Welcome to Dashboard')).toBeVisible()
    const tokens: TokenResponseLike | null = await getTokens(page)
    expect(tokens).not.toBeNull()
    if (tokens) {
      expect(tokens.accessToken).toBeTruthy()
      expect(tokens.refreshToken).toBeTruthy()
    }
  })

  test('shows loading state during login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/es/login')
    await page.locator('input[name="username"]').fill(U)
    await page.locator('input[name="password"]').fill(P)
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('button[type="submit"]')).toHaveText(
      /Loading|Cargando/
    )
    await page.waitForURL('**/dashboard', { timeout: 5000 })
  })
})
