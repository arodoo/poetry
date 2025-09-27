/*
 File: auth-ui-flow.part1.spec.ts
 Purpose: Login UI flow tests (validation + invalid creds).
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
const WRONG_P: string = 'wrongpassword'
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

test.describe('Login UI Flow Part1', (): void => {
  test('shows validation errors for empty fields', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/es/login')
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('text=Username is required')).toBeVisible()
    await expect(page.locator('text=Password is required')).toBeVisible()
  })

  test('shows error for invalid credentials', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/es/login')
    await page.locator('input[name="username"]').fill(U)
    await page.locator('input[name="password"]').fill(WRONG_P)
    await page.locator('button[type="submit"]').click()
    await expect(
      page.locator('text=Invalid username or password')
    ).toBeVisible()
    expect(page.url()).toContain('/login')
    const tokens: TokenResponseLike | null = await getTokens(page)
    expect(tokens).toBeNull()
  })
})
