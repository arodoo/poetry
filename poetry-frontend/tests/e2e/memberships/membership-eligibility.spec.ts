/*
 * File: membership-eligibility.spec.ts
 * Purpose: E2E tests for membership eligibility rules.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
test.describe('Membership Eligibility Checks', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
    await page.goto('/en/memberships/new')
    await page.waitForLoadState('networkidle')
  })
})
