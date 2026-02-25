/*
 * File: index.ts
 * Purpose: Public surface for the charts feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../shared/routing/guards/RequireAuth'
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
          <AppShell>
            <Suspense fallback={null}>
              <ChartsPage />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
    <Route
      key="chart-details"
      path=":locale/charts/details/:chartId"
      element={
        <RequireAuth>
          <AppShell>
            <Suspense fallback={null}>
              <ChartDetailsPage />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
  ]
}
