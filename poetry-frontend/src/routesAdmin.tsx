/*
 * File: routesAdmin.tsx
 * Purpose: Admin route subtree extracted to keep the central router small.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from './shared/routing/RequireAuth'
import { RequireRoles } from './shared/routing/RequireRoles'
import { RequireRole } from './shared/routing/RequireRole'
import { AppShell } from './shared/layout/AppShell'
import {
  AdminTokensPageLazy,
  UsersListPageLazy,
} from './shared/routing/lazyAdapters'

export function AdminRoutes(): ReactElement {
  return (
    <>
      <Route
        path=":locale/admin/tokens"
        element={
          <RequireAuth>
            <RequireRoles roles={['admin', 'manager']}>
              <AppShell>
                <Suspense fallback={null}>
                  <RequireRole role="admin">
                    <AdminTokensPageLazy />
                  </RequireRole>
                </Suspense>
              </AppShell>
            </RequireRoles>
          </RequireAuth>
        }
      />
      <Route
        path=":locale/users"
        element={
          <RequireAuth>
            <RequireRoles roles={['admin', 'manager']}>
              <AppShell>
                <Suspense fallback={null}>
                  <UsersListPageLazy />
                </Suspense>
              </AppShell>
            </RequireRoles>
          </RequireAuth>
        }
      />
    </>
  )
}
