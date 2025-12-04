/*
 * File: routesAuthPublic.tsx
 * Purpose: Public auth routes combining feature routes.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  PublicLoginRoutes,
} from '../../../features/public-login/routing/public-loginRoutes'
import {
  PublicRegisterRoutes,
} from '../../../features/public-register/routing/public-registerRoutes'
import {
  PublicForgotPasswordRoutes,
} from '../../../features/public-forgot-password/routing/public-forgot-passwordRoutes'

export function PublicAuthRoutes(): ReactElement[] {
  return [
    ...PublicLoginRoutes(),
    ...PublicRegisterRoutes(),
    ...PublicForgotPasswordRoutes(),
  ]
}

export default PublicAuthRoutes
