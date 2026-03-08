/*
 * File: zonesRoutes.tsx
 * Purpose: Admin-only route configurations for zones feature.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import { lazy } from 'react'

const ZonesListPageLazy = lazy(() => import('../pages/ZonesListPage'))
const ZoneDetailPageLazy = lazy(() => import('../pages/ZoneDetailPage'))
const ZoneCreatePageLazy = lazy(() => import('../pages/ZoneCreatePage'))
const ZoneEditPageLazy = lazy(() => import('../pages/ZoneEditPage'))
const ZoneDeletePageLazy = lazy(() => import('../pages/ZoneDeletePage'))

export function ZonesRoutes(): ReactElement[] {
  return [
    <Route
      key="zones-list"
      path=":locale/zones"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <ZonesListPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="zones-detail"
      path=":locale/zones/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <ZoneDetailPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="zones-new"
      path=":locale/zones/new"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <ZoneCreatePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="zones-edit"
      path=":locale/zones/edit/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <ZoneEditPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="zones-delete"
      path=":locale/zones/:id/delete"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <ZoneDeletePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
  ]
}
