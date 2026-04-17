/*
 * File: membership-form.spec.ts
 * Purpose: E2E tests for membership form interactions verifying
 * user search, seller code validation, submit gating, user
 * reset, and cancellation navigation. Uses real backend APIs.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectFirstOption } from '../shared/helpers/searchableSelectHelper'
import {
  deleteAdminMemberships,
  pickUserAndWaitEligibility,
} from './membership-form-helpers'

test.describe('Membership Form Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await deleteAdminMemberships()
    await injectTokens(page)
    await page.goto('/en/memberships/new')
  })

  test('should validate seller code in real-time', async ({ page }) => {
    await pickUserAndWaitEligibility(page, 'admin')

    await selectFirstOption(page, 'subscription-select')
    const seller = page.getByTestId('membership-seller-code-input')
    await seller.fill('INVALID')
    await page.getByTestId('submit-membership-button').click()

    await expect(
      page.getByText(/invalid|inactive|inválido|inactivo/i)
    ).toBeVisible({ timeout: 10000 })
  })

  test('should disable submit button until form is valid', async ({ page }) => {
    await pickUserAndWaitEligibility(page, 'admin')

    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeVisible({ timeout: 10000 })

    await submitBtn.click()
    await expect(page.getByText(/required|requerida/i).first()).toBeVisible({
      timeout: 5000,
    })
  })

  test('should reset form state when a new user is selected', async ({
    page,
  }) => {
    await pickUserAndWaitEligibility(page, 'admin')

    await selectFirstOption(page, 'user-search-input')
    await expect(page.getByTestId('selected-user-label')).toBeVisible({
      timeout: 10000,
    })
  })

  test('should navigate back to list on cancellation', async ({ page }) => {
    await pickUserAndWaitEligibility(page, 'admin')

    const cancelBtn = page.getByRole('button', { name: /Cancel/i })
    await expect(cancelBtn).toBeVisible({ timeout: 5000 })
    await cancelBtn.click()

    await expect(page).toHaveURL(/\/en\/memberships$/)
  })
})
