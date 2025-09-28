/*
 * File: routesAuthenticated.tsx
 * Purpose: Authenticated route subtree behind RequireAuth using AppShell.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from './shared/routing/RequireAuth'
import { AppShell } from './shared/layout/AppShell'
import {
  DashboardPageLazy,
  ProfilePageLazy,
} from './shared/routing/lazyAdapters'

export function AuthenticatedRoutes(): ReactElement {
  return (
    <>
      <Route
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
      />
      <Route
        path=":locale/profile"
        element={
          <RequireAuth>
            <AppShell>
              <Suspense fallback={null}>
                <ProfilePageLazy />
              </Suspense>
            </AppShell>
          </RequireAuth>
        }
      />
    </>
  )
}

export default AuthenticatedRoutes
