/*
 * File: membershipsRoutes.tsx
 * Purpose: Memberships admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import MembershipsListPage from '../pages/MembershipsListPage'
import MembershipsCreatePage from '../pages/MembershipsCreatePage'
import MembershipDetailPage from '../pages/MembershipDetailPage'
import MembershipEditPage from '../pages/MembershipEditPage'
import MembershipDeletePage from '../pages/MembershipDeletePage'

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
    <Route
      key="memberships-delete"
      path=":locale/memberships/:id/delete"
      element={
        <AdminRoute>
          <MembershipDeletePage />
        </AdminRoute>
      }
    />,
  ]
}
