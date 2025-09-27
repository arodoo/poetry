/*
 * File: accountRoutes.ts
 * Purpose: Route definitions for account security flows. Provides locale
 * prefixed paths aligned with the blueprint.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import AccountPage from '../pages/AccountPage'

export const accountRoutes: RouteObject[] = [
  {
    path: '/:locale/account/security',
    element: React.createElement(AccountPage),
  },
]
