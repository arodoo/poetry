/*
 * File: seller-codesRoutes.tsx
 * Purpose: Seller codes admin-only route configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import {
  SellerCodesListPageLazy,
  SellerCodeCreatePageLazy,
  SellerCodeDetailPageLazy,
  SellerCodeEditPageLazy,
  SellerCodeDeletePageLazy,
} from '../../../shared/routing/lazyAdapters'

export function SellerCodesRoutes(): ReactElement[] {
  return [
    <Route
      key="seller-codes-new"
      path=":locale/seller-codes/new"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SellerCodeCreatePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-edit"
      path=":locale/seller-codes/edit/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SellerCodeEditPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-detail"
      path=":locale/seller-codes/:id"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SellerCodeDetailPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-delete"
      path=":locale/seller-codes/:id/delete"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SellerCodeDeletePageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-list"
      path=":locale/seller-codes"
      element={
        <AdminRoute>
          <RequireRole role="admin">
            <SellerCodesListPageLazy />
          </RequireRole>
        </AdminRoute>
      }
    />,
  ]
}
