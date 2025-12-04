/*
 * File: seller-codesRoutes.tsx
 * Purpose: Seller codes admin route configurations for CRUD operations.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Route } from 'react-router-dom'
import { AdminRoute } from '../../../shared/routing/guards/AdminRoute'
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
          <SellerCodeCreatePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-edit"
      path=":locale/seller-codes/edit/:id"
      element={
        <AdminRoute>
          <SellerCodeEditPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-detail"
      path=":locale/seller-codes/:id"
      element={
        <AdminRoute>
          <SellerCodeDetailPageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-delete"
      path=":locale/seller-codes/:id/delete"
      element={
        <AdminRoute>
          <SellerCodeDeletePageLazy />
        </AdminRoute>
      }
    />,
    <Route
      key="seller-codes-list"
      path=":locale/seller-codes"
      element={
        <AdminRoute>
          <SellerCodesListPageLazy />
        </AdminRoute>
      }
    />,
  ]
}
