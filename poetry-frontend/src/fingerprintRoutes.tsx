/*
 * File: fingerprintRoutes.tsx
 * Purpose: Fingerprint admin route configurations.
 * Wraps all fingerprint pages with AdminRoute protection.
 * Includes list, enrollment, verification, and simulator routes.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from './shared/routing/AdminRoute'
import ListPage from './features/fingerprint/pages/FingerprintsListPage'
import EnrollPage from './features/fingerprint/pages/EnrollFingerprintPage'
import VerifyPage from './features/fingerprint/pages/VerifyFingerprintPage'
import SimPage from './features/fingerprint/pages/FingerprintSimulatorPage'

export function FingerprintRoutes(): ReactElement[] {
  return [
    <Route
      key="fingerprints-list"
      path=":locale/fingerprints"
      element={
        <AdminRoute>
          <ListPage />
        </AdminRoute>
      }
    />,
    <Route
      key="fingerprints-enroll"
      path=":locale/fingerprints/enroll"
      element={
        <AdminRoute>
          <EnrollPage />
        </AdminRoute>
      }
    />,
    <Route
      key="fingerprints-verify"
      path=":locale/fingerprints/verify"
      element={
        <AdminRoute>
          <VerifyPage />
        </AdminRoute>
      }
    />,
    <Route
      key="fingerprints-simulator"
      path=":locale/fingerprints/simulator"
      element={
        <AdminRoute>
          <SimPage />
        </AdminRoute>
      }
    />,
  ]
}
