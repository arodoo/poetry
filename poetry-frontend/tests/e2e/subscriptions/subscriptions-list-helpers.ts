/*
 * File: subscriptions-list-helpers.ts
 * Purpose: Helper functions for subscriptions list E2E tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { Page, Response } from '@playwright/test'

export async function waitForSubscriptionsApiResponse(
  page: Page
): Promise<Response> {
  return page.waitForResponse(
    (response: Response): boolean =>
      (response.url().includes('/api/v1/subscriptions/paged') ||
        response.url().includes('/api/v1/subscriptions')) &&
      response.request().method() === 'GET'
  )
}

export async function getSubscriptionIdFromButton(
  buttonLocator: { getAttribute: (attr: string) => Promise<string | null> },
  prefix: string
): Promise<string> {
  const dataTestId: string | null =
    await buttonLocator.getAttribute('data-testid')
  return dataTestId?.replace(prefix, '') ?? ''
}
