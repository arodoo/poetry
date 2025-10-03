/*
 * File: auth-redirect-guards.spec.ts
 * Purpose: E2E test verifying that authentication and authorization guards
 * redirect correctly based on token state and user permissions. Tests
 * no-token scenarios redirecting to login and preserving locale in redirect
 * paths. Note: Expired token tests require dynamic session implementation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'

test.describe('Authentication and Authorization Redirects', (): void => {
  test('no token on protected route redirects to /en/login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const responsePromise: Promise<unknown> = page.waitForURL(/\/en\/login$/, {
      timeout: 2000,
    })
    await page.goto('/en/dashboard', { waitUntil: 'domcontentloaded' })
    await responsePromise
    expect(page.url()).toMatch(/\/en\/login$/)
  })
  test('no token on profile route redirects to /en/login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const responsePromise: Promise<unknown> = page.waitForURL(/\/en\/login$/, {
      timeout: 2000,
    })
    await page.goto('/en/profile', { waitUntil: 'domcontentloaded' })
    await responsePromise
    expect(page.url()).toMatch(/\/en\/login$/)
  })

  test('no token with Spanish locale redirects to /es/login', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    const responsePromise: Promise<unknown> = page.waitForURL(/\/es\/login$/, {
      timeout: 2000,
    })
    await page.goto('/es/dashboard', { waitUntil: 'domcontentloaded' })
    await responsePromise
    expect(page.url()).toMatch(/\/es\/login$/)
  })
})
