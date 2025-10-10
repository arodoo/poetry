/*
 File: tokensRoutes.ts
 Purpose: RouteObject export for tokens feature pages. Provides
 locale-prefixed admin routes for token configuration.
 All Rights Reserved. Arodi Emmanuel
*/
import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { AdminTokensPage } from '../pages/AdminTokensPage'

export const tokensRoutes: RouteObject[] = [
  {
    path: '/:locale/admin/tokens',
    element: React.createElement(AdminTokensPage),
  },
]
