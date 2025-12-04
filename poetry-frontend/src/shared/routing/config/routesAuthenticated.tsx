/*
 * File: routesAuthenticated.tsx
 * Purpose: Authenticated route subtree combining feature routes.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  DashboardRoutes,
} from '../../../features/dashboard/routing/dashboardRoutes'
import { ProfileRoutes } from '../../../features/profile/routing/profileRoutes'

export function AuthenticatedRoutes(): ReactElement[] {
  return [...DashboardRoutes(), ...ProfileRoutes()]
}

export default AuthenticatedRoutes
