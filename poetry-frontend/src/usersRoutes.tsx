/*
 * File: usersRoutes.tsx
 * Purpose: Users admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import {
  UsersListPageLazy,
  UsersCreatePageLazy,
  UserDetailPageLazy,
  UserEditPageLazy,
} from './shared/routing/lazyAdapters'

export function UsersRoutes(): ReactElement[] {
  return [
    <Route
      key="users-new"
      path=":locale/users/new"
      element={
        <AdminRoute>
          <UsersCreatePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="users-edit"
      path=":locale/users/:id/edit"
      element={
        <AdminRoute>
          <UserEditPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="users-detail"
      path=":locale/users/:id"
      element={
        <AdminRoute>
          <UserDetailPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="users-list"
      path=":locale/users"
      element={
        <AdminRoute>
          <UsersListPageLazy />
        </AdminRoute>
      }
    />,
  ]
}
