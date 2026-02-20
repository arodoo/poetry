/*
 * File: routesAuthenticated.tsx
 * Purpose: Authenticated route subtree combining feature routes.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { AccountRoutes } from '../../../features/account/routing/accountRoutes'
import { CarouselRoutes } from '../../../features/carousel/routing/carouselRoutes'
import { ProfileRoutes } from '../../../features/profile/routing/profileRoutes'

export function AuthenticatedRoutes(): ReactElement[] {
  return [...AccountRoutes(), ...CarouselRoutes(), ...ProfileRoutes()]
}

export default AuthenticatedRoutes
