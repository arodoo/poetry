/*
 * File: admin-full-access.spec.ts
 * Purpose: E2E tests verifying admin role CAN access ALL
 * protected routes including admin-only ones. Uses real admin
 * token injection against Java-served frontend.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, type Page } from '@playwright/test'
import { injectTokens } from '../shared/providers/tokenProvider'

const ALL_ROUTES: Array<{ path: string; heading: RegExp }> = [
  { path: '/en/users', heading: /users|Usuarios/i },
  { path: '/en/memberships', heading: /memberships|Membresías/i },
  { path: '/en/zones', heading: /zones|Zonas/i },
  {
    path: '/en/subscriptions',
    heading: /subscription plans|Suscripciones|Planes de Suscripción/i,
  },
  { path: '/en/seller-codes', heading: /seller codes|Códigos de Vendedor/i },
  { path: '/en/charts', heading: /charts|statistics|Gráficos/i },
  { path: '/en/dashboard', heading: /display|Pantalla|Panel/i },
]

test.describe('Admin full access', (): void => {
  test.beforeEach(async ({ page }: { page: Page }): Promise<void> => {
    await injectTokens(page)
  })

  for (const { path, heading } of ALL_ROUTES) {
    test(`can access ${path}`, async ({
      page,
    }: {
      page: Page
    }): Promise<void> => {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: heading })).toBeVisible({
        timeout: 15000,
      })
    })
  }
})
