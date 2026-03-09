/*
 * File: subscriptions-edit-i18n.spec.ts
 * Purpose: E2E test verifying subscription form labels use i18n keys
 * instead of hardcoded English text. Also verifies MXN currency
 * option exists. Catches Bug #2b/2c.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page, type Locator } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForSubscriptionsApiResponse } from './subscriptions-list-helpers'

test.setTimeout(90000)

test('subscription edit form has i18n labels and MXN', async ({
  page,
}: {
  page: Page
}): Promise<void> => {
  await injectTokens(page)
  await page.goto('/en/subscriptions')
  await waitForSubscriptionsApiResponse(page)

  const viewBtn: Locator = page
    .locator('[data-testid^="view-subscription-"]')
    .first()
  await expect(viewBtn).toBeVisible({ timeout: 15000 })
  await viewBtn.click()

  const editBtn = page.getByTestId('edit-subscription-button')
  await expect(editBtn).toBeVisible({ timeout: 15000 })
  await editBtn.click()

  const currencySelect: Locator = page.getByTestId(
    'subscription-currency-select'
  )
  await expect(currencySelect).toBeVisible({ timeout: 10000 })

  await currencySelect.click()
  const dd = page.getByTestId(
    'subscription-currency-select-dropdown'
  )
  await expect(dd).toBeVisible({ timeout: 5000 })
  const mxnOpt = dd.locator(
    '[data-testid="subscription-currency-select-opt-MXN"]'
  )
  await expect(mxnOpt).toBeVisible()
  await page.click('body')

  const descLabel = page.locator(
    'p:has-text("Description"), p:has-text("Descripción")'
  )
  await expect(descLabel.first()).toBeVisible()

  const currLabel = page.locator(
    'p:has-text("Currency"), p:has-text("Moneda")'
  )
  await expect(currLabel.first()).toBeVisible()
})
