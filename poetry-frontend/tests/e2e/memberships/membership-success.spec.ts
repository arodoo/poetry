/*
 * File: membership-success.spec.ts
 * Purpose: E2E test verifying the complete membership creation flow.
 * Picks a user, selects subscription, fills seller code, submits,
 * and confirms redirect back to the memberships list page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { selectFirstOption } from '../shared/helpers/searchableSelectHelper'
import {
  deleteAdminMemberships,
  pickUserAndWaitEligibility,
} from './membership-form-helpers'

test.describe('Membership Success Flow', () => {
  test.beforeEach(async ({ page }) => {
    await deleteAdminMemberships()
    await injectTokens(page)
    await page.goto('/en/memberships/new')
  })

  test('should create a membership successfully', async ({ page }) => {
    await pickUserAndWaitEligibility(page, 'admin')

    await expect(page.getByTestId('selected-user-label')).toContainText(
      /admin/i
    )

    await selectFirstOption(page, 'subscription-select')
    const seller = page.getByTestId('membership-seller-code-input')
    await seller.fill('codigo001')

    const submitBtn = page.getByTestId('submit-membership-button')
    await expect(submitBtn).toBeEnabled({ timeout: 2000 })
    await submitBtn.click()

    await expect(page).toHaveURL(/\/en\/memberships$/, { timeout: 10000 })
  })
})
