/*
 * File: membership-success.spec.ts
 * Purpose: E2E test for the successful membership creation flow.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { authedApi } from '../shared/fixtures/seedApi'

async function deleteAdminMemberships(): Promise<void> {
  const api = await authedApi()
  const r = await api.get('/api/v1/memberships?size=100')
  if (!r.ok()) {
    await api.dispose()
    return
  }
  const data = await r.json()
  const items = Array.isArray(data)
    ? (data as { id: number; userId: number }[])
    : ((data as { content?: { id: number; userId: number }[] }).content ?? [])
  for (const m of items.filter((i) => i.userId === 1)) {
    await api.delete(`/api/v1/memberships/${m.id}`).catch(() => {})
  }
  await api.dispose()
}

test.describe('Membership Success Flow', () => {
  test.beforeEach(async ({ page }) => {
    await deleteAdminMemberships()
    page.on('console', (msg) => console.log('PAGE LOG:', msg.text()))
    page.on('request', (req) => console.log('REQ:', req.method(), req.url()))
    page.on('response', (res) => console.log('RES:', res.status(), res.url()))

    await injectTokens(page)
    await page.goto('/en/memberships/new')
  })

  test('should create a membership successfully', async ({ page }) => {
    const searchInput = page.getByTestId('user-search-input')
    await searchInput.fill('admin')

    const result = page.getByTestId('user-search-result-1')
    await expect(result).toBeVisible({ timeout: 5000 })
    await result.click()

    // Wait for eligibility to resolve
    const subSelect = page.getByTestId('subscription-select')
    await expect(subSelect).toBeVisible({ timeout: 10000 })

    await expect(page.getByTestId('selected-user-label')).toContainText(
      /admin/i
    )

    // Form interaction
    const subOptions = subSelect.locator('option')
    await expect(subOptions).not.toHaveCount(0, { timeout: 5000 })
    await subSelect.selectOption({ index: 1 })

    await page.getByTestId('membership-seller-code-input').fill('codigo001')

    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeEnabled({ timeout: 2000 })
    await submitBtn.click()

    // Redirect check
    await expect(page).toHaveURL(/\/en\/memberships$/, { timeout: 10000 })
  })
})
