
/*
 * File: zonesRoutes.ts
 * Purpose: Locale-scoped route definitions for zones feature pages, including list, create, and edit views with React elements. Follows the seller codes routing pattern for consistency. Supports modular navigation and future route expansion.
 * All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import type { RouteObject } from 'react-router-dom'
import ZonesListPage from '../pages/ZonesListPage'
import ZoneCreatePage from '../pages/ZoneCreatePage'
import ZoneEditPage from '../pages/ZoneEditPage'

export const zonesRoutes: RouteObject[] = [
  {
    path: '/:locale/zones',
    element: React.createElement(ZonesListPage),
  },
  {
    path: '/:locale/zones/new',
    element: React.createElement(ZoneCreatePage),
  },
  {
    path: '/:locale/zones/edit/:id',
    element: React.createElement(ZoneEditPage),
  },
]
