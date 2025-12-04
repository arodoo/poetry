/*
 * File: public-registerRoutes.tsx
 * Purpose: Public register route with lazy loading.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { RegisterPageLazy } from '../../../shared/routing/lazyAdapters'

export function PublicRegisterRoutes(): ReactElement[] {
  return [
    <Route
      key="register"
      path=":locale/register"
      element={
        <Suspense fallback={null}>
          <RegisterPageLazy />
        </Suspense>
      }
    />,
  ]
}
