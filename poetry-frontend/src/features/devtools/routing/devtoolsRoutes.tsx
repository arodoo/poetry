/*
 * File: devtoolsRoutes.tsx
 * Purpose: DevTools route for the standalone simulator.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import SimulatorPage from '../pages/SimulatorPage'

export function DevtoolsRoutes(): ReactElement[] {
  return [
    <Route
      key="devtools-simulator"
      path=":locale/devtools/simulator"
      element={
        <AdminRoute>
          <SimulatorPage />
        </AdminRoute>
      }
    />,
  ]
}
