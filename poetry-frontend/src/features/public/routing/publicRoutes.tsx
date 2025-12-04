/*
 * File: publicRoutes.tsx
 * Purpose: Public route configurations for home and error pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import {
  HomePageLazy,
  NotFoundPageLazy,
} from '../../../shared/routing/lazyAdapters'

export function PublicRoutes(): ReactElement[] {
  return [
    <Route
      key="home"
      path=":locale/"
      element={
        <Suspense fallback={null}>
          <HomePageLazy />
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
