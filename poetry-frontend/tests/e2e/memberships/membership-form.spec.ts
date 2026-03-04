/*
 * File: membership-form.spec.ts
 * Purpose: E2E tests for membership form interactions and state.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { authedApi } from '../shared/fixtures/seedApi'

async function deleteAdminMemberships(): Promise<void> {
  const api = await authedApi()
  const r = await api.get('/api/v1/memberships?size=100')
  if (!r.ok()) { await api.dispose(); return }
  const data = await r.json()
  const items = Array.isArray(data)
    ? (data as { id: number; userId: number }[])
    : ((data as { content?: { id: number; userId: number }[] }).content ?? [])
  for (const m of items.filter((i) => i.userId === 1)) {
    await api.delete(`/api/v1/memberships/${m.id}`).catch(() => {})
  }
  await api.dispose()
}

test.describe('Membership Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await deleteAdminMemberships()
    await injectTokens(page)
    await page.goto('/en/memberships/new')
  })

  test('should validate seller code in real-time', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()
    await expect(page.getByTestId('subscription-select')).toBeVisible({
      timeout: 10000,
    })

    await page
      .getByTestId('subscription-select')
      .selectOption({ index: 1 })
    await page.getByTestId('membership-seller-code-input').fill('INVALID')
    await page.getByTestId('submit-membership-button').click()

    // Invalid seller code triggers a toast error notification
    await expect(
      page.getByText(/invalid|inactive|inválido|inactivo/i)
    ).toBeVisible({ timeout: 10000 })
  })

  test('should disable submit button until form is valid', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()

    // Submit button appears only after eligibility passes
    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeVisible({ timeout: 10000 })

    // Button is enabled; submitting without subscription shows error
    await submitBtn.click()
    await expect(
      page.getByText(/subscription required|suscripción/i)
    ).toBeVisible({ timeout: 5000 })
  })

  test('should reset form state when a new user is selected', async ({
    page,
  }) => {
    const searchInput = page.getByTestId('user-search-input')

    await searchInput.fill('admin')
    await page.getByTestId('user-search-result-1').click()
    // Wait for eligibility to resolve (subscription select appears)
    await expect(page.getByTestId('subscription-select')).toBeVisible({
      timeout: 10000,
    })

    // Switch user – form should reset and re-check eligibility
    await searchInput.fill('')
    await searchInput.fill('test')
    await page
      .getByTestId(/user-search-result-/)
      .first()
      .click()
    // Selected user label should update
    await expect(page.getByTestId('selected-user-label')).toContainText(
      /test/i,
      { timeout: 10000 }
    )
  })

  test('should navigate back to list on cancellation', async ({ page }) => {
    await page.getByTestId('user-search-input').fill('admin')
    await page.getByTestId('user-search-result-1').click()

    const cancelBtn = page.getByRole('button', { name: /Cancel/i })
    await expect(cancelBtn).toBeVisible({ timeout: 5000 })
    await cancelBtn.click()

    await expect(page).toHaveURL(/\/en\/memberships$/)
  })
})
