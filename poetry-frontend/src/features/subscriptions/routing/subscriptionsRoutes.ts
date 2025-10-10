/*
 * File: subscriptionsRoutes.ts
 * Purpose: Locale-scoped route definitions for subscription plan pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import SubscriptionsListPage from '../pages/SubscriptionsListPage'
import SubscriptionsCreatePage from '../pages/SubscriptionsCreatePage'
import SubscriptionDetailPage from '../pages/SubscriptionDetailPage'
import SubscriptionEditPage from '../pages/SubscriptionEditPage'
import SubscriptionDeletePage from '../pages/SubscriptionDeletePage'

export const subscriptionsRoutes: RouteObject[] = [
  {
    path: '/:locale/subscriptions',
    element: React.createElement(SubscriptionsListPage),
  },
  {
    path: '/:locale/subscriptions/new',
    element: React.createElement(SubscriptionsCreatePage),
  },
  {
    path: '/:locale/subscriptions/:id/edit',
    element: React.createElement(SubscriptionEditPage),
  },
  {
    path: '/:locale/subscriptions/:id/delete',
    element: React.createElement(SubscriptionDeletePage),
  },
  {
    path: '/:locale/subscriptions/:id',
    element: React.createElement(SubscriptionDetailPage),
  },
]
