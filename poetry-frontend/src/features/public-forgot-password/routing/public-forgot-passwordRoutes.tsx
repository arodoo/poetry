/*
 * File: public-forgot-passwordRoutes.tsx
 * Purpose: Forgot password route config for password recovery feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Suspense } from 'react'
import { Route } from 'react-router-dom'
import {
  PublicForgotPasswordPageLazy as ForgotPwdLazy,
} from '../../../shared/routing/lazyAdapters'

export function PublicForgotPasswordRoutes(): ReactElement[] {
  return [
    <Route
      key="forgot-password"
      path=":locale/forgot-password"
      element={
        <Suspense fallback={null}>
          <ForgotPwdLazy />
        </Suspense>
      }
    />,
  ]
}
