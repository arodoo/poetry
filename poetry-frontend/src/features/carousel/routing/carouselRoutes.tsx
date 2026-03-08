/*
 * File: carouselRoutes.tsx
 * Purpose: Dashboard/carousel route accessible to admin and manager.
 * Requires authentication and role guard for defense-in-depth.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/guards/RequireAuth'
import { RequireRoles } from '../../../shared/routing/guards/RequireRoles'
import { AppShell } from '../../../shared/layout'
import { CarouselPageLazy } from '../../../shared/routing/lazyAdapters'

export function CarouselRoutes(): ReactElement[] {
  return [
    <Route
      key="carousel"
      path=":locale/dashboard"
      element={
        <RequireAuth>
          <RequireRoles roles={['admin', 'manager']}>
            <AppShell>
              <Suspense fallback={null}>
                <CarouselPageLazy />
              </Suspense>
            </AppShell>
          </RequireRoles>
        </RequireAuth>
      }
    />,
  ]
}
