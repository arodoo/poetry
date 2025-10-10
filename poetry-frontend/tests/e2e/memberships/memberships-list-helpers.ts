/*
 * File: memberships-list-helpers.ts
 * Purpose: Helper functions for memberships list E2E tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { Page, Response } from '@playwright/test'

export async function waitForMembershipsApiResponse(
  page: Page
): Promise<Response> {
  return page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/memberships') &&
      response.request().method() === 'GET'
  )
}

export async function getMembershipIdFromButton(
  buttonLocator: { getAttribute: (attr: string) => Promise<string | null> },
  prefix: string
): Promise<string> {
  const dataTestId: string | null =
    await buttonLocator.getAttribute('data-testid')
  return dataTestId?.replace(prefix, '') ?? ''
}
