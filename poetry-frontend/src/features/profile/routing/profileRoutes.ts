/*
 * File: profileRoutes.ts
 * Purpose: Locale-aware route definitions for profile pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import ProfilePage from '../pages/ProfilePage'

export const profileRoutes: RouteObject[] = [
  {
    path: '/:locale/profile',
    element: React.createElement(ProfilePage),
  },
]
