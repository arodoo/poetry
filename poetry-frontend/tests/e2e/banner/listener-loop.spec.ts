/*
 * File: listener-loop.spec.ts
 * Purpose: E2E stress test for the continuous fingerprint listener loop.
 * Simulates 10 consecutive hardware reads to detect issues in the loop,
 * without needing a real fingerprint sensor connected to the machine.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const MOCK_USER = {
    id: 42,
    firstName: 'Arodi',
    lastName: 'Haro',
    email: 'arodoo@gmail.com',
    username: 'arodi',
    status: 'active',
    roles: ['member'],
}

const MOCK_MEMBERSHIP = {
    content: [
        {
            id: 1,
            userId: 42,
            userName: 'Arodi Haro',
            subscriptionId: 3,
            subscriptionName: 'Plan Élite',
            sellerCode: 'SC-001',
            status: 'active',
            createdAt: '2024-01-01T00:00:00Z',
            version: 0,
        },
    ],
    totalElements: 1,
    totalPages: 1,
    currentPage: 0,
    pageSize: 1,
    hasNext: false,
    hasPrevious: false,
}

async function setupHardwareMocks(page: Page, targetReads: number): Promise<() => number> {
    let capturesTriggered = 0

    await page.route('**/api/v1/fingerprints/verify', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ matched: true, userId: 42 }),
        })
    })

    await page.route('**/api/v1/users/42', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(MOCK_USER),
        })
    })

    await page.route('**/api/v1/memberships/paged**', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(MOCK_MEMBERSHIP),
        })
    })

    await page.route('**/api/v1/fingerprints/capture', async (route) => {
        const method = route.request().method()
        if (method === 'DELETE') {
            await route.fulfill({ status: 200 })
            return
        }
        if (capturesTriggered < targetReads) {
            capturesTriggered++
            console.log(`[MOCK] Hardware Capture #${capturesTriggered}`)
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: true, fmd: `MOCK_FMD_${capturesTriggered}` }),
            })
        } else {
            // After 10 reads — return "no finger" so the loop idles
            await new Promise<void>((resolve) => setTimeout(resolve, 1000))
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ success: false, fmd: null }),
            })
        }
    })

    return () => capturesTriggered
}

test.describe('Banner – Fingerprint Listener Loop (Stress Test)', () => {
    test('caso 5 – el bucle detecta 10 lecturas de hardware consecutivas sin colapsar', async ({ page }) => {
        const TARGET_READS = 10
        await injectTokens(page)
        const getCaptureCount = await setupHardwareMocks(page, TARGET_READS)

        await page.goto('/en/devtools/simulator')

        // Wait until all 10 hardware reads have been processed (60s timeout for 10 reads)
        await expect(async () => {
            expect(getCaptureCount()).toBeGreaterThanOrEqual(TARGET_READS)
        }).toPass({ timeout: 60000 })
    })
})
