/*
 * File: subscriptions-edit-submit.spec.ts
 * Purpose: E2E test verifying the subscription edit form submits changes.
 * Catches Bug #2 where the handler was a no-op.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  test,
  expect,
  type Page,
  type Locator,
  type Response,
} from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'
import { waitForSubscriptionsApiResponse } from './subscriptions-list-helpers'

test.setTimeout(90000)

test('subscription edit form submits and shows toast', async ({
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
  const testId = (await viewBtn.getAttribute('data-testid')) ?? ''
  const id = testId.replace('view-subscription-', '')
  await viewBtn.click()

  const editBtn: Locator = page.getByTestId('edit-subscription-button')
  await expect(editBtn).toBeVisible({ timeout: 15000 })
  await editBtn.click()
  await expect(page).toHaveURL(new RegExp(`/en/subscriptions/${id}/edit$`))

  const putPromise: Promise<Response> = page.waitForResponse(
    (r: Response): boolean =>
      r.url().includes(`/api/v1/subscriptions/${id}`) &&
      r.request().method() === 'PUT',
    { timeout: 60000 }
  )
  await page.getByTestId('subscription-submit-button').click()

  const putResp: Response = await putPromise
  expect(putResp.status()).toBe(200)

  await expect(
    page.getByText(/updated successfully|actualizados/i)
  ).toBeVisible({ timeout: 10000 })
})
