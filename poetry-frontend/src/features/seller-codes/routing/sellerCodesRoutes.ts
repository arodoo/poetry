/*
 * File: sellerCodesRoutes.ts
 * Purpose: Locale-scoped route definitions for seller codes pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import SellerCodesListPage from '../pages/SellerCodesListPage'
import SellerCodeCreatePage from '../pages/SellerCodeCreatePage'
import SellerCodeDetailPage from '../pages/SellerCodeDetailPage'
import SellerCodeEditPage from '../pages/SellerCodeEditPage'

export const sellerCodesRoutes: RouteObject[] = [
  {
    path: '/:locale/seller-codes',
    element: React.createElement(SellerCodesListPage),
  },
  {
    path: '/:locale/seller-codes/new',
    element: React.createElement(SellerCodeCreatePage),
  },
  {
    path: '/:locale/seller-codes/edit/:id',
    element: React.createElement(SellerCodeEditPage),
  },
  {
    path: '/:locale/seller-codes/:id',
    element: React.createElement(SellerCodeDetailPage),
  },
]
