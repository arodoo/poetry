/*
 * File: devtoolsRoutes.tsx
 * Purpose: DevTools admin route configurations.
 * Wraps all devtools pages with AdminRoute protection.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import HardwareDebugPage from '../pages/HardwareDebugPage'

export function DevtoolsRoutes(): ReactElement[] {
  return [
    <Route
      key="devtools-hardware"
      path=":locale/devtools/hardware"
      element={
        <AdminRoute>
          <HardwareDebugPage />
        </AdminRoute>
      }
    />,
  ]
}
