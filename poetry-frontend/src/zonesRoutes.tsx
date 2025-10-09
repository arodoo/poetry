/*
 * zonesRoutes.tsx
 * Zones admin route configurations with AdminRoute protection
 * for list create and edit pages. Follows seller-codes pattern
 * with lazy loading and role-based access control.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import { lazy } from 'react'

const ZonesListPageLazy = lazy(() => 
  import('./features/zones/pages/ZonesListPage')
)
const ZoneCreatePageLazy = lazy(() => 
  import('./features/zones/pages/ZoneCreatePage')
)
const ZoneEditPageLazy = lazy(() => 
  import('./features/zones/pages/ZoneEditPage')
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
  ]
}
