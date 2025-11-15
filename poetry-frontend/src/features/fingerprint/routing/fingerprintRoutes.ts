/*
 * File: fingerprintRoutes.ts
 * Purpose: Route definitions for fingerprint feature.
 * Defines paths for list, enrollment, and verification pages.
 * Exports route configuration for admin section integration.
 * All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import type { RouteObject } from 'react-router-dom'
import FingerprintsListPage from '../pages/FingerprintsListPage'
import EnrollFingerprintPage from '../pages/EnrollFingerprintPage'
import VerifyFingerprintPage from '../pages/VerifyFingerprintPage'

export const fingerprintRoutes: RouteObject[] = [
  {
    path: '/:locale/fingerprints',
    element: React.createElement(FingerprintsListPage),
  },
  {
    path: '/:locale/fingerprints/enroll',
    element: React.createElement(EnrollFingerprintPage),
  },
  {
    path: '/:locale/fingerprints/verify',
    element: React.createElement(VerifyFingerprintPage),
  },
]
