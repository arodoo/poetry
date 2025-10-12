/*
 * File: membershipsRoutes.ts
 * Purpose: Locale-scoped route definitions for memberships pages. This file defines all React Router routes for memberships, ensuring navigation is consistent and localized. It enables modular routing and supports future route expansion as the feature grows. Keeping routes isolated here improves maintainability and testability.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import MembershipsListPage from '../pages/MembershipsListPage'
import MembershipsCreatePage from '../pages/MembershipsCreatePage'
import MembershipDetailPage from '../pages/MembershipDetailPage'
import MembershipEditPage from '../pages/MembershipEditPage'

export const membershipsRoutes: RouteObject[] = [
  {
    path: '/:locale/memberships',
    element: React.createElement(MembershipsListPage),
  },
  {
    path: '/:locale/memberships/new',
    element: React.createElement(MembershipsCreatePage),
  },
  {
    path: '/:locale/memberships/:id/edit',
    element: React.createElement(MembershipEditPage),
  },
  {
    path: '/:locale/memberships/:id',
    element: React.createElement(MembershipDetailPage),
  },
]
