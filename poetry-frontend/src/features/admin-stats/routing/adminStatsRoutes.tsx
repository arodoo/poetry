/*
 * File: adminStatsRoutes.tsx
 * Purpose: Route definitions for admin statistics dashboard pages.
 * Provides lazy-loaded routes with admin role guard protection.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import { AdminDashboardPage } from '../pages/AdminDashboardPage'

function AdminStatsRoute(): ReactElement {
  return (
    <Route
      key="admin-stats"
      path=":locale/admin/stats"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <AdminDashboardPage />
          </RequireRole>
        </AdminRoute>
      }
    />
  )
}

export function AdminStatsRoutes(): ReactElement[] {
  return [AdminStatsRoute()]
}
