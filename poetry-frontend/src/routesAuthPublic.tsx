/*
 * File: routesAuthPublic.tsx
 * Purpose: Public auth routes (login/register) with locale-prefixed paths.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import { LoginPageLazy } from './shared/routing/lazyAdapters/loginAdapter'
import { RegisterPageLazy } from './shared/routing/lazyAdapters/registerAdapter'
import { PublicForgotPasswordPageLazy } from './shared/routing/lazyAdapters/forgotPasswordAdapter'

export function PublicAuthRoutes(): ReactElement {
  return (
    <>
      <Route
        path=":locale/login"
        element={
          <Suspense fallback={null}>
            <LoginPageLazy />
          </Suspense>
        }
      />
      <Route
        path=":locale/register"
        element={
          <Suspense fallback={null}>
            <RegisterPageLazy />
          </Suspense>
        }
      />
      <Route
        path=":locale/forgot-password"
        element={
          <Suspense fallback={null}>
            <PublicForgotPasswordPageLazy />
          </Suspense>
        }
      />
    </>
  )
}

export default PublicAuthRoutes
