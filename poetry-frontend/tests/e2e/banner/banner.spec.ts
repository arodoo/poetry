/*
 * File: banner.spec.ts
 * Purpose: E2E tests for registration banner feature.
 * Verifies banner appearance, stacking, and timing.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect } from '@playwright/test'

import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Registration Banner', () => {
    test.beforeEach(async ({ page }) => {
        // Inject auth token (real auth)
        await injectTokens(page)

        // Mock fingerprint enrollment
        await page.route('**/api/v1/fingerprints/enroll', async (route) => {
            await route.fulfill({
                json: { userId: 123, status: 'enrolled' },
            })
        })

        // Mock user details
        await page.route('**/api/v1/users/123', async (route) => {
            await route.fulfill({
                json: {
                    id: 123,
                    username: 'testuser',
                    email: 'test@example.com',
                    firstName: 'Test',
                    lastName: 'User',
                    status: 'active',
                    roles: ['admin'],
                },
            })
        })

        // Mock memberships
        await page.route('**/api/v1/memberships?**', async (route) => {
            await route.fulfill({
                json: {
                    content: [
                        {
                            id: 1,
                            userId: 123,
                            status: 'active',
                            subscriptionId: 1,
                        },
                    ],
                    totalElements: 1,
                },
            })
        })

        // Navigate to hardware debug page
        await page.goto('/en/devtools/hardware')
    })

    test('should display banner on successful enrollment', async ({ page }) => {
        // Fill slot ID
        await page.getByPlaceholder('Enter slot ID (0-1500)').fill('100')

        // Click enroll
        await page.getByRole('button', { name: 'Simulate Enrollment' }).click()

        // Verify banner appears
        await expect(page.getByText('New Registration')).toBeVisible()
        await expect(page.getByText('Test User')).toBeVisible()
        await expect(page.getByText('test@example.com')).toBeVisible()
        await expect(page.getByText('Active')).toBeVisible()
    })

    test('should stack banners', async ({ page }) => {
        // Trigger multiple enrollments
        for (let i = 0; i < 3; i++) {
            await page.getByPlaceholder('Enter slot ID (0-1500)').fill(String(100 + i))
            await page.getByRole('button', { name: 'Simulate Enrollment' }).click()
            // Small delay to ensure order
            await page.waitForTimeout(100)
        }

        // Verify multiple banners
        await expect(page.getByText('New Registration')).toHaveCount(3)
    })
})
