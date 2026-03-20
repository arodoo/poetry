/*
 * File: role-blocked-login.spec.ts
 * Purpose: E2E test verifying that a user with only the 'user'
 * role is blocked from accessing the application after login.
 * Tests real API interaction with a seeded user-only account.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import {
  seedUserOnlyAccount,
  deleteUser,
  USER_ONLY_PASS,
  type SeedUser,
} from '../shared/fixtures/seedUserRole'

let seeded: SeedUser | null = null

test.beforeAll(async (): Promise<void> => {
  seeded = await seedUserOnlyAccount()
})

test.afterAll(async (): Promise<void> => {
  if (seeded) await deleteUser(seeded.id)
})

test.describe('User role login blocked', (): void => {
  test('shows role-blocked error for user-only role', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    if (!seeded) throw new Error('Seed user not created')
    await page.goto('/en/login')
    await page.locator('input[name="username"]').fill(seeded.username)
    await page.locator('input[name="password"]').fill(USER_ONLY_PASS)
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('[data-testid="login-error"]')).toBeVisible({
      timeout: 10000,
    })
    await expect(page.locator('[data-testid="login-error"]')).toContainText(
      /Access denied|Acceso denegado/i
    )
    expect(page.url()).toContain('/login')
  })
})
