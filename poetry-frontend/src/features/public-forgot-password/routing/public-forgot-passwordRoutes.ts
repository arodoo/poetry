/*
 * File: public-forgot-passwordRoutes.ts
 * Purpose: Locale-aware routes for forgot-password pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import PublicForgotPasswordPage from '../pages/PublicForgotPasswordPage'

export const publicForgotPasswordRoutes: RouteObject[] = [
  {
    path: '/:locale/forgot-password',
    element: React.createElement(PublicForgotPasswordPage),
  },
]
