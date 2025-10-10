/*
 * File: adminRoutesConfig.tsx
 * Purpose: Admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import { RequireRole } from './shared/routing/RequireRole'
import { AdminTokensPageLazy } from './shared/routing/lazyAdapters'
import { UsersRoutes } from './usersRoutes'
import { SellerCodesRoutes } from './sellerCodesRoutes'
import { SubscriptionsRoutes } from './subscriptionsRoutes'
import { ZonesRoutes } from './zonesRoutes'
import { MembershipsRoutes } from './membershipsRoutes'

function AdminTokensRoute(): ReactElement {
  return (
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
  )
}

export function AdminRoutesConfig(): ReactElement[] {
  return [
    AdminTokensRoute(),
    ...UsersRoutes(),
    ...SellerCodesRoutes(),
    ...SubscriptionsRoutes(),
    ...ZonesRoutes(),
    ...MembershipsRoutes(),
  ]
}
