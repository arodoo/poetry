/*
 * File: hardwareRoutes.tsx
 * Purpose: Hardware route for status monitoring page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import { HardwareStatusPage } from '../pages/HardwareStatusPage'
import FingerprintDetailPage from '../pages/FingerprintDetailPage'

export function HardwareRoutes(): ReactElement[] {
  return [
    <Route
      key="hardware-status"
      path=":locale/hardware"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <HardwareStatusPage />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="fingerprint-detail"
      path=":locale/hardware/fingerprints/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <FingerprintDetailPage />
          </RequireRole>
        </AdminRoute>
      }
    />,
  ]
}
