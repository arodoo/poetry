/*
 * File: publicLoginRoutes.tsx
 * Purpose: Login route configuration for unauthenticated users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { LoginPageLazy } from '../../../shared/routing/lazyAdapters'

export function PublicLoginRoutes(): ReactElement[] {
  return [
    <Route
      key="login"
      path=":locale/login"
      element={
        <Suspense fallback={null}>
          <LoginPageLazy />
        </Suspense>
      }
    />,
  ]
}
