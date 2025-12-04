/*
 * File: users-create-with-fingerprint.spec.ts
 * Purpose: E2E test for user creation with fingerprint enrollment.
 * Mocks hardware service responses, validates complete workflow.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { mockFingerprintRoutes } from './fingerprintMockRoutes'

test.describe('User Creation with Fingerprint', () => {
  test.beforeEach(async ({ page }) => {
    await injectTokens(page)
    await mockFingerprintRoutes(page)
  })

  test('should create user with fingerprint', async ({ page }) => {
    await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })

    await expect(
      page.getByRole('heading', { name: 'Create user' })
    ).toBeVisible({ timeout: 15000 })

    await page.getByTestId('user-firstname-input').fill('John')
    await page.getByTestId('user-lastname-input').fill('Doe')
    await page.getByTestId('user-username-input').fill('johndoe')
    await page.getByTestId('user-email-input').fill('john.doe@example.com')

    await page.getByRole('button', { name: /start/i }).first().click()

    await page.screenshot({ path: 'test-results/after-click.png' })

    await page.waitForTimeout(2000)

    await page.screenshot({ path: 'test-results/after-wait.png' })

    await expect(
      page.getByText(/enrolled successfully|enrolling fingerprint/i)
    ).toBeVisible({ timeout: 15000 })

    await expect(page.getByText(/enrolled successfully/i)).toBeVisible({
      timeout: 10000,
    })

    await page.getByRole('button', { name: /create/i }).click()

    await expect(page).toHaveURL(/\/en\/users$/)
  })

  test('should skip fingerprint enrollment', async ({ page }) => {
    await page.goto('/en/users/new', { waitUntil: 'domcontentloaded' })

    await expect(
      page.getByRole('heading', { name: 'Create user' })
    ).toBeVisible({ timeout: 15000 })

    await page.getByTestId('user-firstname-input').fill('Jane')
    await page.getByTestId('user-lastname-input').fill('Smith')
    await page.getByTestId('user-username-input').fill('janesmith')
    await page.getByTestId('user-email-input').fill('jane.smith@example.com')

    await page.getByRole('button', { name: 'Skip' }).click()

    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page).toHaveURL(/\/en\/users$/)
  })
})
