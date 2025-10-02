/*
 * File: routesAdmin.tsx
 * Purpose: Admin route subtree for authenticated admin/manager pages with
 * authentication, role guards, and lazy-loaded components.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import { RequireRole } from './shared/routing/RequireRole'
import {
  AdminTokensPageLazy,
  UsersListPageLazy,
  UsersCreatePageLazy,
  UserDetailPageLazy,
  UserEditPageLazy,
} from './shared/routing/lazyAdapters'

export function AdminRoutes(): ReactElement {
  return (
    <>
      <Route
        path=":locale/admin/tokens"
        element={
          <AdminRoute>
            <RequireRole role="admin">
              <AdminTokensPageLazy />
            </RequireRole>
          </AdminRoute>
        }
      />
      <Route
        path=":locale/users/new"
        element={
          <AdminRoute>
            <UsersCreatePageLazy />
          </AdminRoute>
        }
      />
      <Route
        path=":locale/users/:id/edit"
        element={
          <AdminRoute>
            <UserEditPageLazy />
          </AdminRoute>
        }
      />
      <Route
        path=":locale/users/:id"
        element={
          <AdminRoute>
            <UserDetailPageLazy />
          </AdminRoute>
        }
      />
      <Route
        path=":locale/users"
        element={
          <AdminRoute>
            <UsersListPageLazy />
          </AdminRoute>
        }
      />
    </>
  )
}
