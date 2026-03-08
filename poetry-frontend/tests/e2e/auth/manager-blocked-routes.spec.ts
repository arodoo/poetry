/*
 * File: manager-blocked-routes.spec.ts
 * Purpose: E2E tests verifying manager role CANNOT access
 * admin-only routes. Manager is redirected to dashboard when
 * attempting zones, subscriptions, seller-codes, or charts.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectRoleTokens } from '../shared/providers/roleTokenProvider'

const ADMIN_ONLY_ROUTES: string[] = [
  '/en/zones',
  '/en/subscriptions',
  '/en/seller-codes',
  '/en/charts',
]

test.describe('Manager blocked from admin routes', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectRoleTokens(page, 'manager')
  })

  for (const route of ADMIN_ONLY_ROUTES) {
    test(`redirected from ${route}`, async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(route)
      await page.waitForURL(/\/en\/dashboard/, { timeout: 10000 })
      expect(page.url()).toContain('/dashboard')
    })
  }
})
