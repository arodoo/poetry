/*
 * File: sellerCodesListAdapter.ts
 * Purpose: Lazy adapter for the seller codes list page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SellerCodesListModule {
  default?: () => ReactElement
  SellerCodesListPage?: () => ReactElement
}

export const SellerCodesListPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import(
        '../../../../features/seller-codes/pages/SellerCodesListPage'
      ).then((module: unknown): { default: () => ReactElement } => {
        const typed: SellerCodesListModule = module as SellerCodesListModule
        const page: () => ReactElement =
          typed.default ?? (typed.SellerCodesListPage as () => ReactElement)
        return { default: page }
      })
  )
