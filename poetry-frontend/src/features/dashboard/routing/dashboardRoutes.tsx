/*
 * File: dashboardRoutes.tsx
 * Purpose: Dashboard route configurations with authentication guard.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/RequireAuth'
import { AppShell } from '../../../shared/layout'
import { DashboardPageLazy } from '../../../shared/routing/lazyAdapters'

export function DashboardRoutes(): ReactElement[] {
  return [
    <Route
      key="dashboard"
      path=":locale/dashboard"
      element={
        <RequireAuth>
          <AppShell>
            <Suspense fallback={null}>
              <DashboardPageLazy />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
  ]
}
