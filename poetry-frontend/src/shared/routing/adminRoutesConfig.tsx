/*
 * File: adminRoutesConfig.tsx
 * Purpose: Admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './guards/AdminRoute'
import { RequireRole } from './guards/RequireRole'
import { AdminTokensPageLazy } from './lazyAdapters'
import { UsersRoutes } from '../../features/users/routing/usersRoutes'
import { SellerCodesRoutes } from '../../features/seller-codes/routing/seller-codesRoutes'
import { SubscriptionsRoutes } from '../../features/subscriptions/routing/subscriptionsRoutes'
import { ZonesRoutes } from '../../features/zones/routing/zonesRoutes'
import { MembershipsRoutes } from '../../features/memberships/routing/membershipsRoutes'
import { FingerprintRoutes } from '../../features/fingerprint/routing/fingerprintRoutes'
import { DevtoolsRoutes } from '../../features/devtools/routing/devtoolsRoutes'

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
    ...FingerprintRoutes(),
    ...DevtoolsRoutes(),
  ]
}
