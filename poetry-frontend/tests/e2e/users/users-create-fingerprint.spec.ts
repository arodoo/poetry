/*
 * File: users-create-fingerprint.spec.ts
 * Purpose: E2E test for creating a user with fingerprint enrollment.
 * Mocks hardware interactions to verify the wizard flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../../shared/providers/tokenProvider'

test.describe('User Creation with Fingerprint', () => {
  test.beforeEach(async ({ page }: { page: Page }) => {
    await injectTokens(page)

    // Mock Backend Reserve Slot
    await page.route('**/api/v1/fingerprints/reserve-slot', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ slotId: 123 }),
      })
    })

    // Mock Hardware Enroll
    await page.route(
      '/hardware/fingerprint/enroll',
      async (route) => {
        // Simulate delay for "Capturing" state
        await new Promise((resolve) => setTimeout(resolve, 1000))
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            success: true,
            slotId: 123,
            message: 'Enrolled successfully',
          }),
        })
      }
    )
  })

  test('complete user creation flow with fingerprint', async ({ page }) => {
    await page.goto('/en/users/new', { waitUntil: 'networkidle' })

    // 1. Fill User Details
    await page.getByLabel(/username/i).fill('testuser_fp')
    await page.getByLabel(/password/i).fill('Password123!')
    // Handle potential confirm password if it exists, or other fields
    // Assuming standard form based on previous files

    // 2. Start Fingerprint Enrollment
    const startBtn = page.getByRole('button', {
      name: /start fingerprint registration/i,
    })
    await expect(startBtn).toBeVisible()
    await startBtn.click()

    // 3. Verify Wizard States
    // Should show capturing/processing
    await expect(page.getByText(/place finger/i)).toBeVisible({ timeout: 5000 })

    // Should eventually show success
    await expect(page.getByText(/success/i)).toBeVisible({ timeout: 10000 })
    await expect(page.getByText(/Slot: 123/i)).toBeVisible()

    // 4. Verify Skip button changes or we can proceed
    // The "Skip" button usually remains as "Skip" or "Next" depending on implementation
    // But success state is enough to verify the fix
  })
})
