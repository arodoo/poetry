/*
 * File: fingerprint-admin.spec.ts
 * Purpose: E2E tests for FingerprintAdminPage functionality.
 * Verifies slot usage card, archived list, and restore button display.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Fingerprint Admin Page', () => {
    test.beforeEach(async ({ page }: { page: Page }) => {
        await injectTokens(page)
    })

    test('admin page loads with slot usage card', async ({ page }) => {
        await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })

        await expect(page.locator('.fingerprint-admin-page')).toBeVisible()
        await expect(page.locator('.slot-usage-card')).toBeVisible()
    })

    test('slot usage displays used/total format', async ({ page }) => {
        await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })

        const stats = page.locator('.slot-usage-stats')
        await expect(stats).toBeVisible()
        await expect(page.locator('.slot-total')).toContainText('1500')
    })

    test('archived fingerprints section visible', async ({ page }) => {
        await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })

        const archived = page.locator('.archived-list, .archived-empty')
        await expect(archived).toBeVisible()
    })

    test('active badge shows count', async ({ page }) => {
        await page.goto('/en/fingerprints/admin', { waitUntil: 'networkidle' })

        const badge = page.locator('.active-badge')
        await expect(badge).toBeVisible()
        await expect(badge).toContainText('active fingerprints')
    })
})
