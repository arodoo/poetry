/*
 * File: authRoutes.tsx
 * Purpose: Auth route configurations for unauthorized access page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { UnauthorizedLazy } from '../../../shared/routing/lazyAdapters'

export function AuthRoutes(): ReactElement[] {
  return [
    <Route
      key="unauthorized"
      path=":locale/unauthorized"
      element={
        <Suspense fallback={null}>
          <UnauthorizedLazy />
        </Suspense>
      }
    />,
  ]
}
