/*
 * File: users-list-helpers.ts
 * Purpose: Helper functions for users list E2E tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { Page, Response } from '@playwright/test'

export async function waitForUsersApiResponse(page: Page): Promise<Response> {
  return page.waitForResponse(
    (response: Response): boolean =>
      response.url().includes('/api/v1/users') &&
      response.request().method() === 'GET'
  )
}

export async function getUserIdFromButton(
  buttonLocator: { getAttribute: (attr: string) => Promise<string | null> },
  prefix: string
): Promise<string> {
  const dataTestId: string | null =
    await buttonLocator.getAttribute('data-testid')
  return dataTestId?.replace(prefix, '') ?? ''
}
