/*
 * File: tokensRoutes.tsx
 * Purpose: Tokens route configurations with admin authentication guard.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/guards/RequireAuth'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { AppShell } from '../../../shared/layout'
import { AdminTokensPageLazy } from '../../../shared/routing/lazyAdapters'

export function TokensRoutes(): ReactElement[] {
  return [
    <Route
      key="admin-tokens"
      path=":locale/admin/tokens"
      element={
        <RequireAuth>
          <AdminRoute>
            <AppShell>
              <Suspense fallback={null}>
                <AdminTokensPageLazy />
              </Suspense>
            </AppShell>
          </AdminRoute>
        </RequireAuth>
      }
    />,
  ]
}
