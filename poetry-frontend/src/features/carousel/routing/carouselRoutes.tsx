/*
 * File: carouselRoutes.tsx
 * Purpose: Dashboard/carousel route. Requires authentication so the
 * session hook resolves the admin role correctly. No AppShell — the
 * carousel is full-screen with its own controls.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/guards/RequireAuth'
import { AppShell } from '../../../shared/layout'
import { CarouselPageLazy } from '../../../shared/routing/lazyAdapters'

export function CarouselRoutes(): ReactElement[] {
  return [
    <Route
      key="carousel"
      path=":locale/dashboard"
      element={
        <RequireAuth>
          <AppShell>
            <Suspense fallback={null}>
              <CarouselPageLazy />
            </Suspense>
          </AppShell>
        </RequireAuth>
      }
    />,
  ]
}
