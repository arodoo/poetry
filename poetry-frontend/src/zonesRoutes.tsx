/*
 * File: zonesRoutes.tsx
 * Purpose: Admin route configurations for zones, with AdminRoute protection for list, create, and edit pages. Follows the seller-codes pattern with lazy loading and role-based access control. Designed for maintainability and secure navigation.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import { lazy } from 'react'

const ZonesListPageLazy = lazy(
  () => import('./features/zones/pages/ZonesListPage')
)
const ZoneDetailPageLazy = lazy(
  () => import('./features/zones/pages/ZoneDetailPage')
)
const ZoneCreatePageLazy = lazy(
  () => import('./features/zones/pages/ZoneCreatePage')
)
const ZoneEditPageLazy = lazy(
  () => import('./features/zones/pages/ZoneEditPage')
)
const ZoneDeletePageLazy = lazy(
  () => import('./features/zones/pages/ZoneDeletePage')
)

export function ZonesRoutes(): ReactElement[] {
  return [
    <Route
      key="zones-list"
      path=":locale/zones"
      element={
        <AdminRoute>
          <ZonesListPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="zones-detail"
      path=":locale/zones/:id"
      element={
        <AdminRoute>
          <ZoneDetailPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="zones-new"
      path=":locale/zones/new"
      element={
        <AdminRoute>
          <ZoneCreatePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="zones-edit"
      path=":locale/zones/edit/:id"
      element={
        <AdminRoute>
          <ZoneEditPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="zones-delete"
      path=":locale/zones/:id/delete"
      element={
        <AdminRoute>
          <ZoneDeletePageLazy />
        </AdminRoute>
      }
    />,
  ]
}
