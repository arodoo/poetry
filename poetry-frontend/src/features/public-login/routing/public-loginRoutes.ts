/*
 * File: public-loginRoutes.ts
 * Purpose: Locale-aware route configuration for login page.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export const publicLoginRoutes: RouteObject[] = [
  {
    path: '/:locale/login',
    element: React.createElement(LoginPage),
  },
]
