/*
 * File: dbManagementRoutes.tsx
 * Purpose: Route definitions for database management page with
 * admin role guard protection and lazy-loaded content.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import { DbManagementPage } from '../pages/DbManagementPage'

function DbManagementRoute(): ReactElement {
  return (
    <Route
      key="db-management"
      path=":locale/db-management"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <DbManagementPage />
          </RequireRole>
        </AdminRoute>
      }
    />
  )
}

export function DbManagementRoutes(): ReactElement[] {
  return [DbManagementRoute()]
}
