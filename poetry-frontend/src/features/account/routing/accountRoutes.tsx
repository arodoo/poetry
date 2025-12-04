/*
 * File: accountRoutes.tsx
 * Purpose: Account route configurations with authentication guard.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/guards/RequireAuth'
import { AppShell } from '../../../shared/layout'
import { AccountPageLazy } from '../../../shared/routing/lazyAdapters'

export function AccountRoutes(): ReactElement[] {
  return [
    <Route
      key="account"
      path=":locale/account"
      element={
        <RequireAuth>
          <AppShell>
            <Suspense fallback={null}>
              <AccountPageLazy />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
  ]
}
