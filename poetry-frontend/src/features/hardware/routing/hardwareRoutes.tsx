/*
 * File: hardwareRoutes.tsx
 * Purpose: Hardware route for status monitoring page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { HardwareStatusPage } from '../pages/HardwareStatusPage'
import FingerprintDetailPage from '../pages/FingerprintDetailPage'

export function HardwareRoutes(): ReactElement[] {
  return [
    <Route
      key="hardware-status"
      path=":locale/hardware"
      element={
        <AdminRoute>
          <HardwareStatusPage />
        </AdminRoute>
      }
    />,
    <Route
      key="fingerprint-detail"
      path=":locale/hardware/fingerprints/:id"
      element={
        <AdminRoute>
          <FingerprintDetailPage />
        </AdminRoute>
      }
    />,
  ]
}
