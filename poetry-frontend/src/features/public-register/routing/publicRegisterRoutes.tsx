/*
 * File: publicRegisterRoutes.tsx
 * Purpose: Route registration for public register page.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { RouteObject } from 'react-router-dom'
import RegisterPage from '../pages/RegisterPage'

export const publicRegisterRoutes: RouteObject = {
  path: '/:locale/register',
  element: <RegisterPage />,
}
