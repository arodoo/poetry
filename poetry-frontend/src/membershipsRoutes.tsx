/*
 * File: membershipsRoutes.tsx
 * Purpose: Memberships admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import MembershipsListPage from './features/memberships/pages/MembershipsListPage'
import MembershipsCreatePage from './features/memberships/pages/MembershipsCreatePage'
import MembershipDetailPage from './features/memberships/pages/MembershipDetailPage'
import MembershipEditPage from './features/memberships/pages/MembershipEditPage'

export function MembershipsRoutes(): ReactElement[] {
  return [
    <Route
      key="memberships-list"
      path=":locale/memberships"
      element={
        <AdminRoute>
          <MembershipsListPage />
        </AdminRoute>
      }
    />,
    <Route
      key="memberships-new"
      path=":locale/memberships/new"
      element={
        <AdminRoute>
          <MembershipsCreatePage />
        </AdminRoute>
      }
    />,
    <Route
      key="memberships-detail"
      path=":locale/memberships/:id"
      element={
        <AdminRoute>
          <MembershipDetailPage />
        </AdminRoute>
      }
    />,
    <Route
      key="memberships-edit"
      path=":locale/memberships/:id/edit"
      element={
        <AdminRoute>
          <MembershipEditPage />
        </AdminRoute>
      }
    />,
  ]
}
