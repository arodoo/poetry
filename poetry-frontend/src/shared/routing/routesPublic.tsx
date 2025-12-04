/*
 * File: routesPublic.tsx
 * Purpose: Public routes combining feature routes with fallback pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import {
  PublicRoutes as PublicFeatureRoutes,
} from '../../features/public/routing/publicRoutes'
import { NotFoundPageLazy, UnauthorizedLazy } from './lazyAdapters'

export function PublicRoutes(): ReactElement[] {
  return [
    ...PublicFeatureRoutes(),
    <Route
      key="unauthorized"
      path=":locale/unauthorized"
      element={
        <Suspense fallback={null}>
          <UnauthorizedLazy />
        </Suspense>
      }
    />,
    <Route
      key="not-found"
      path="*"
      element={
        <Suspense fallback={null}>
          <NotFoundPageLazy />
        </Suspense>
      }
    />,
  ]
}
