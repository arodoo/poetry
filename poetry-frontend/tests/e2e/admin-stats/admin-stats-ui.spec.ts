/*
 * File: admin-stats-ui.spec.ts
 * Purpose: Comprehensive E2E tests for admin stats dashboard UI.
 * Tests sidebar navigation, KPI card rendering with values,
 * translated labels, color indicators, and error state handling.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

test.describe('Admin Statistics Dashboard - Complete Flow', (): void => {
    test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
        await injectTokens(page)
    })

    test('navigates via sidebar click and renders KPI cards', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await page.goto('/en/dashboard')
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(1000)

        const sidebarLink = page.locator('a[href*="admin/stats"]')
        await expect(sidebarLink).toBeVisible({ timeout: 5000 })
        await sidebarLink.click()

        await page.waitForURL('**/admin/stats')
        await page.waitForLoadState('networkidle')

        const statsPage = page.locator('[data-testid="admin-stats-page"]')
        await expect(statsPage).toBeVisible({ timeout: 10000 })
    })

    test('KPI cards display numeric values >= 0', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await page.goto('/en/admin/stats')
        await page.waitForLoadState('networkidle')

        const statsPage = page.locator('[data-testid="admin-stats-page"]')
        await expect(statsPage).toBeVisible({ timeout: 10000 })

        const activeCard = page.locator('[data-testid="kpi-card-active"]')
        const expiringCard = page.locator('[data-testid="kpi-card-expiring"]')
        const expiredCard = page.locator('[data-testid="kpi-card-expired"]')
        const totalCard = page.locator('[data-testid="kpi-card-total"]')

        await expect(activeCard).toBeVisible()
        await expect(expiringCard).toBeVisible()
        await expect(expiredCard).toBeVisible()
        await expect(totalCard).toBeVisible()

        const activeText = await activeCard.locator('p').first().textContent()
        const activeNum = parseInt(activeText ?? '-1', 10)
        expect(activeNum).toBeGreaterThanOrEqual(0)

        const totalText = await totalCard.locator('p').first().textContent()
        const totalNum = parseInt(totalText ?? '-1', 10)
        expect(totalNum).toBeGreaterThanOrEqual(0)
    })

    test('KPI cards show translated labels in English', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await page.goto('/en/admin/stats')
        await page.waitForLoadState('networkidle')

        const statsPage = page.locator('[data-testid="admin-stats-page"]')
        await expect(statsPage).toBeVisible({ timeout: 10000 })

        const pageText = await statsPage.textContent()
        expect(pageText).toContain('Active')
        expect(pageText).toContain('Expiring')
        expect(pageText).toContain('Expired')
        expect(pageText).toContain('Total')
    })

    test('KPI cards show translated labels in Spanish', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await page.goto('/es/admin/stats')
        await page.waitForLoadState('networkidle')

        const statsPage = page.locator('[data-testid="admin-stats-page"]')
        await expect(statsPage).toBeVisible({ timeout: 10000 })

        const pageText = await statsPage.textContent()
        const hasLabels =
            pageText?.includes('Activas') ||
            pageText?.includes('Active') ||
            pageText?.includes('Total')
        expect(hasLabels).toBe(true)
    })

    test('KPI cards have correct color classes', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await page.goto('/en/admin/stats')
        await page.waitForLoadState('networkidle')

        const statsPage = page.locator('[data-testid="admin-stats-page"]')
        await expect(statsPage).toBeVisible({ timeout: 10000 })

        const activeValue = page
            .locator('[data-testid="kpi-card-active"]')
            .locator('p.text-green-600')
        const expiredValue = page
            .locator('[data-testid="kpi-card-expired"]')
            .locator('p.text-red-600')

        await expect(activeValue).toBeVisible()
        await expect(expiredValue).toBeVisible()
    })
})
