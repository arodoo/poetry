/*
 * File: publicForgotRoutes.tsx
 * Purpose: Route registration for public forgot-password page.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { RouteObject } from 'react-router-dom'
import ForgotPage from '../pages/ForgotPage'

export const publicForgotRoutes: RouteObject = {
  path: '/:locale/forgot',
  element: <ForgotPage />,
}
