/*
 * File: users-edit-fingerprint.spec.ts
 * Purpose: E2E test for fingerprint re-enrollment on the Edit User page.
 * Mocks the capture and replace endpoints, verifies the flow end-to-end.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
    test,
    expect,
    request,
    type Page,
    type Locator,
    type Route,
} from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const FAKE_FMD = 'FAKE_FMD_TEMPLATE_BASE64=='
const API_BASE = 'http://localhost:8080'
const ADMIN_USER = 'admin'
const ADMIN_PASS = 'ChangeMe123!'

async function loginAndFetchFirstUserId(): Promise<number> {
    const ctx = await request.newContext({ baseURL: API_BASE })
    const loginResp = await ctx.post('/api/v1/auth/login', {
        data: { username: ADMIN_USER, password: ADMIN_PASS },
        headers: { 'Content-Type': 'application/json' },
    })
    if (!loginResp.ok()) {
        throw new Error(`Login failed: ${loginResp.status()}`)
    }
    const { accessToken } = (await loginResp.json()) as { accessToken: string }
    const usersResp = await ctx.get('/api/v1/users', {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!usersResp.ok()) {
        throw new Error(`Users API error: ${usersResp.status()}`)
    }
    const users = (await usersResp.json()) as { id: number }[]
    await ctx.dispose()
    const first = users[0]
    if (!first) throw new Error('No users found in backend')
    return first.id
}

async function goToEditPage(page: Page, userId: number): Promise<void> {
    await page.goto(`/en/users/${userId}/edit`)
    await page.waitForLoadState('load')
    await expect(page.getByRole('heading', { name: 'Edit user' })).toBeVisible({
        timeout: 15000,
    })
}

test.describe('Edit User — Fingerprint Re-enrollment', () => {
    test('shows enrollment section and replaces fingerprint on success', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await injectTokens(page)
        const userId: number = await loginAndFetchFirstUserId()

        await page.route('**/api/v1/fingerprints/capture', async (r: Route) => {
            await r.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    fmd: FAKE_FMD,
                    errorCode: null,
                }),
            })
        })

        let replaceCalled = false
        let receivedFmd: string | null = null
        await page.route(
            '**/api/v1/users/*/fingerprints/replace',
            async (r: Route) => {
                const body = JSON.parse(
                    (r.request().postData() as string) || '{}'
                ) as { fmd?: string }
                replaceCalled = true
                receivedFmd = body.fmd ?? null
                await r.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ fingerprintId: 99, status: 'REPLACED' }),
                })
            }
        )

        await goToEditPage(page, userId)

        const fpSection: Locator = page.getByTestId('fingerprint-enrollment-section')
        await expect(fpSection).toBeVisible({ timeout: 10000 })

        const startBtn: Locator = page.getByTestId('fingerprint-start-btn')
        await expect(startBtn).toBeVisible()
        await startBtn.click()

        const successMsg: Locator = page.getByTestId('fingerprint-success-msg')
        await expect(successMsg).toBeVisible({ timeout: 15000 })

        expect(replaceCalled).toBe(true)
        expect(receivedFmd).toBe(FAKE_FMD)
    })

    test('skip button is visible on the edit fingerprint section', async ({
        page,
    }: {
        page: Page
    }): Promise<void> => {
        await injectTokens(page)
        const userId: number = await loginAndFetchFirstUserId()

        await goToEditPage(page, userId)

        const skipBtn: Locator = page.getByTestId('fingerprint-skip-btn')
        await expect(skipBtn).toBeVisible({ timeout: 10000 })
        await skipBtn.click()

        await expect(
            page.getByTestId('fingerprint-enrollment-section')
        ).toBeVisible()
    })
})
