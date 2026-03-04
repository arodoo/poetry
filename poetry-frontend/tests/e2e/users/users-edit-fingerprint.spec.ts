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
            if (r.request().method() === 'OPTIONS') {
                await r.fulfill({ status: 204, headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': '*',
                }})
                return
            }
            await new Promise((resolve) => setTimeout(resolve, 500))
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

        // Check if user is already enrolled by looking for the explicit 'Replace fingerprint' button
        // Need to wait for the query to finish loading. We wait for either the start button or replace button.
        await page.waitForSelector(
            '[data-testid="fingerprint-start-btn"], button:has-text("Replace fingerprint")',
            { timeout: 10000 }
        )

        const replaceBtn = page.getByRole('button', { name: /Replace fingerprint/i })
        if (await replaceBtn.isVisible()) {
            await replaceBtn.click()
        }

        const fpSection: Locator = page.getByTestId('fingerprint-enrollment-section')
        await expect(fpSection).toBeVisible({ timeout: 5000 })

        const startButton = page.getByTestId('fingerprint-start-btn')
        await expect(startButton).toBeVisible()
        await startButton.click()

        // Give React a moment to transition states
        await page.waitForTimeout(100)

        // It should now be capturing
        const capturingText = page.getByText(/Enrolling fingerprint/i)
        await expect(capturingText).toBeVisible()

        // The mock auto-resolves after 500ms. onSuccess fires
        // setIsReplacing(false) which re-renders to enrolled card.
        // Wait for enrolled state to reappear (wizard closed).
        await expect(
            page.getByText(/Fingerprint Enrolled/i)
        ).toBeVisible({ timeout: 10000 })

        // 3. capturedFmd should be set in parent state.
        // Verify replace API has NOT been called yet (deferred).
        expect(replaceCalled).toBe(false)

        // 4. Click 'Save changes' on the main form payload to trigger the deferred API call
        const saveButton = page.getByRole('button', { name: /Save changes/i })
        await saveButton.click()

        // 5. Verify the deferred replace API call was successfully made and payload is correct
        // We need to expose replaceCalled to the page context for waitForFunction to work,
        // or check it directly after a short wait if the mock is synchronous.
        // For now, let's assume the mock sets a global or we check directly.
        // Given the current setup, `replaceCalled` is a variable in the test scope,
        // so we can't use `page.waitForFunction(() => (window as any).replaceCalled === true)`.
        // Instead, we'll wait for the toast and then check the variable.
        const toast = page.getByText(/Fingerprint updated successfully/i)
        await expect(toast).toBeVisible()

        expect(replaceCalled).toBe(true)
        expect(receivedFmd).toBe(FAKE_FMD)
    })
})
