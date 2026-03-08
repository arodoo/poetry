/*
 * File: manager-allowed-routes.spec.ts
 * Purpose: E2E tests verifying manager role CAN access users,
 * memberships, and carousel routes. Uses real manager token
 * injection against Java-served frontend.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectRoleTokens } from '../shared/providers/roleTokenProvider'

test.describe('Manager allowed routes', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectRoleTokens(page, 'manager')
  })

  test('can access users page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/users')
    await expect(
      page.getByRole('heading', { name: 'Users' })
    ).toBeVisible({ timeout: 15000 })
  })

  test('can access memberships page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/memberships')
    await expect(
      page.getByRole('heading', { name: 'Memberships' })
    ).toBeVisible({ timeout: 15000 })
  })

  test('can access carousel page', async ({
    page,
  }: {
    page: Page
  }): Promise<void> => {
    await page.goto('/en/dashboard')
    await expect(
      page.getByRole('heading', { name: /display/i })
    ).toBeVisible({ timeout: 15000 })
  })
})
