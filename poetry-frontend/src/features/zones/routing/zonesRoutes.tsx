/*
 * File: zonesRoutes.tsx
 * Purpose: Admin route configurations for zones feature.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
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
