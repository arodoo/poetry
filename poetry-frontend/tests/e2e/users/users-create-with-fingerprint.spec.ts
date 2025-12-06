/*
 * File: users-create-with-fingerprint.spec.ts
 * Purpose: E2E test for user creation with fingerprint enrollment.
 * Tests real hardware workflow with human-in-the-loop prompts.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('User Creation with Fingerprint (Real Hardware)', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
  })

  test('should create user with fingerprint', async ({ page }) => {
    await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })

    await expect(
      page.getByRole('heading', { name: 'Create user' })
    ).toBeVisible({ timeout: 15000 })

    await page.getByTestId('user-firstname-input').fill('Test')
    await page.getByTestId('user-lastname-input').fill('Fingerprint')
    const timestamp = Date.now()
    const username = `testfp${timestamp}`
    await page.getByTestId('user-username-input').fill(username)
    await page.getByTestId('user-email-input').fill(`${username}@test.com`)

    await page.getByRole('button', { name: /start/i }).first().click()

    // Wait for enrollment - finger placement required
    await expect(
      page.getByText(/place.*finger|enrolling/i)
    ).toBeVisible({ timeout: 30000 })

    // Allow time for physical finger placement
    await page.waitForTimeout(15000)

    await expect(
      page.getByText(/enrolled successfully|success/i)
    ).toBeVisible({ timeout: 30000 })

    await page.getByRole('button', { name: /create/i }).click()

    await expect(page).toHaveURL(/\/en\/users$/, { timeout: 15000 })
  })

  test('should skip fingerprint enrollment', async ({ page }) => {
    await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })

    await expect(
      page.getByRole('heading', { name: 'Create user' })
    ).toBeVisible({ timeout: 15000 })

    await page.getByTestId('user-firstname-input').fill('Skip')
    await page.getByTestId('user-lastname-input').fill('Fingerprint')
    const timestamp = Date.now()
    const username = `skipfp${timestamp}`
    await page.getByTestId('user-username-input').fill(username)
    await page.getByTestId('user-email-input').fill(`${username}@test.com`)

    await page.getByRole('button', { name: 'Skip' }).click()
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page).toHaveURL(/\/en\/users$/, { timeout: 15000 })
  })
})
