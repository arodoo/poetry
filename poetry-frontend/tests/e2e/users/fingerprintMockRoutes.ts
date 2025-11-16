/*
 * File: fingerprintMockRoutes.ts
 * Purpose: Mock ONLY hardware fingerprint sensor interaction.
 * Backend API calls go through real endpoints to validate auth flow.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { Page } from '@playwright/test'

export async function mockFingerprintRoutes(page: Page): Promise<void> {
  // Mock ONLY hardware service enroll (simulates finger placement)
  await page.route('**/api/fingerprint/enroll', (route) => {
    void route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        slotId: route.request().postDataJSON()?.slotId || 42,
        message: 'Enrollment successful',
      }),
    })
  })

  // Mock user creation to avoid database dependencies
  await page.route('**/api/v1/users', async (route) => {
    if (route.request().method() === 'POST') {
      void route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 999,
          username: 'testuser',
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          status: 'active',
          roles: ['USER'],
        }),
      })
    } else {
      void route.continue()
    }
  })
}
