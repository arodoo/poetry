/*
 * File: subscriptionsRoutes.tsx
 * Purpose: Subscriptions admin route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import {
  SubscriptionsListPageLazy,
  SubscriptionsCreatePageLazy,
  SubscriptionDetailPageLazy,
  SubscriptionEditPageLazy,
  SubscriptionDeletePageLazy,
} from '../../../shared/routing/lazyAdapters'

export function SubscriptionsRoutes(): ReactElement[] {
  return [
    <Route
      key="subscriptions-new"
      path=":locale/subscriptions/new"
      element={
        <AdminRoute>
          <SubscriptionsCreatePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-delete"
      path=":locale/subscriptions/:id/delete"
      element={
        <AdminRoute>
          <SubscriptionDeletePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-edit"
      path=":locale/subscriptions/:id/edit"
      element={
        <AdminRoute>
          <SubscriptionEditPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-detail"
      path=":locale/subscriptions/:id"
      element={
        <AdminRoute>
          <SubscriptionDetailPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-list"
      path=":locale/subscriptions"
      element={
        <AdminRoute>
          <SubscriptionsListPageLazy />
        </AdminRoute>
      }
    />,
  ]
}
