/*
 * File: subscriptionsRoutes.tsx
 * Purpose: Subscriptions admin-only route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
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
          <RequireRole role="admin">
            <SubscriptionsCreatePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-delete"
      path=":locale/subscriptions/:id/delete"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SubscriptionDeletePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-edit"
      path=":locale/subscriptions/:id/edit"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SubscriptionEditPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-detail"
      path=":locale/subscriptions/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SubscriptionDetailPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="subscriptions-list"
      path=":locale/subscriptions"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SubscriptionsListPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
  ]
}
