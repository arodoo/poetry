/*
 * File: index.tsx
 * Purpose: Admin-only charts feature routing schema. Maps dashboard
 * metrics boundaries and nested detail page configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../shared/routing/guards/RequireAuth'
import { RequireRole } from '../../shared/routing/guards/RequireRole'
import { AppShell } from '../../shared/layout'
import { ChartsPage } from './pages/ChartsPage'
import { ChartDetailsPage } from './pages/ChartDetailsPage'

export function chartsRoutes(): ReactElement[] {
  return [
    <Route
      key="charts"
      path=":locale/charts"
      element={
        <RequireAuth>
          <RequireRole role="admin">
            <AppShell>
              <Suspense fallback={null}>
                <ChartsPage />
              </Suspense>
            </AppShell>
          </RequireRole>
        </RequireAuth>
      }
    />,
    <Route
      key="chart-details"
      path=":locale/charts/details/:chartId"
      element={
        <RequireAuth>
          <RequireRole role="admin">
            <AppShell>
              <Suspense fallback={null}>
                <ChartDetailsPage />
              </Suspense>
            </AppShell>
          </RequireRole>
        </RequireAuth>
      }
    />,
  ]
}
