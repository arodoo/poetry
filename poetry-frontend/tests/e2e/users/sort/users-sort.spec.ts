/*
 * File: users-sort.spec.ts
 * Purpose: E2E test for users list server-side sort.
 * Verifies sort param in API calls when clicking
 * sortable column headers (asc → desc → reset).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
    test,
    expect,
    type Page,
    type Response,
} from '@playwright/test'
import {
    injectTokens,
} from '../../shared/providers/tokenProvider'

async function waitForUsersApi(
    page: Page
): Promise<Response> {
    return page.waitForResponse(
        (res: Response): boolean =>
            res.url().includes('/api/v1/users/paged') &&
            res.request().method() === 'GET'
    )
}

test('click username header sends sort=username,asc',
    async ({ page }: { page: Page }): Promise<void> => {
        await injectTokens(page)
        await page.goto('/en/users')
        await page.waitForLoadState('networkidle')
        const th = page.locator('th', {
            hasText: /username/i,
        })
        const apiP = waitForUsersApi(page)
        await th.click()
        const res = await apiP
        expect(res.url()).toContain(
            'sort=username%2Casc'
        )
        expect(res.status()).toBe(200)
    }
)

test('second click sends sort=username,desc',
    async ({ page }: { page: Page }): Promise<void> => {
        await injectTokens(page)
        await page.goto('/en/users')
        await page.waitForLoadState('networkidle')
        const th = page.locator('th', {
            hasText: /username/i,
        })
        await th.click()
        await waitForUsersApi(page)
        const apiP = waitForUsersApi(page)
        await th.click()
        const res = await apiP
        expect(res.url()).toContain(
            'sort=username%2Cdesc'
        )
    }
)
