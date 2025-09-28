/*
 * File: dashboardRoutes.ts
 * Purpose: Locale-aware route definitions for dashboard pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/:locale/dashboard',
    element: React.createElement(DashboardPage),
  },
]
