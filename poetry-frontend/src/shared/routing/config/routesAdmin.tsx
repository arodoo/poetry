/*
 * File: routesAdmin.tsx
 * Purpose: Admin route subtree for authenticated admin/manager pages with
 * authentication, role guards, and lazy-loaded components.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { AdminRoutesConfig } from '../adminRoutesConfig'

export function AdminRoutes(): ReactElement[] {
  return AdminRoutesConfig()
}
