/*
 * File: routesPublic.tsx
 * Purpose: Public and basic locale routes extracted from the central
 * route tree to keep files short. Lazily loads public pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import {
  HomePageLazy,
  NotFoundPageLazy,
  UnauthorizedLazy,
} from './shared/routing/lazyAdapters'

export function PublicRoutes(): ReactElement {
  return (
    <>
      {/* default locale redirect handled at root */}
      <Route
        path=":locale/"
        element={
          <Suspense fallback={null}>
            <HomePageLazy />
            {/* Lazy loading HomePage */}
          </Suspense>
        }
      />
      <Route
        path=":locale/unauthorized"
        element={
          <Suspense fallback={null}>
            <UnauthorizedLazy />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={null}>
            <NotFoundPageLazy />
            {/* Lazy loading NotFoundPage */}
          </Suspense>
        }
      />
    </>
  )
}
