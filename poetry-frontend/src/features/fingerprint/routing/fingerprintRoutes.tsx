/*
 * File: fingerprintRoutes.tsx
 * Purpose: Fingerprint admin route configurations.
 * Wraps all fingerprint pages with AdminRoute protection.
 * Includes list, enrollment, verification, and simulator routes.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import ListPage from '../pages/FingerprintsListPage'
// import EnrollPage from '../pages/EnrollFingerprintPage'
import VerifyPage from '../pages/VerifyFingerprintPage'
import SimPage from '../pages/FingerprintSimulatorPage'
import AdminPage from '../pages/FingerprintAdminPage'

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
    /*
    <Route
      key="fingerprints-enroll"
      path=":locale/fingerprints/enroll"
      element={
        <AdminRoute>
          <EnrollPage />
        </AdminRoute>
      }
    />,
    */
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
    <Route
      key="fingerprints-admin"
      path=":locale/fingerprints/admin"
      element={
        <AdminRoute>
          <AdminPage />
        </AdminRoute>
      }
    />,
  ]
}
