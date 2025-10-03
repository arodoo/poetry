/*
 * File: sellerCodeDetailAdapter.ts
 * Purpose: Lazy adapter for the seller code detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SellerCodeDetailModule {
  default?: () => ReactElement
  SellerCodeDetailPage?: () => ReactElement
}

export const SellerCodeDetailPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import('../../../features/seller-codes/pages/SellerCodeDetailPage').then(
        (module: unknown): { default: () => ReactElement } => {
          const typed: SellerCodeDetailModule = module as SellerCodeDetailModule
          const page: () => ReactElement =
            typed.default ?? (typed.SellerCodeDetailPage as () => ReactElement)
          return { default: page }
        }
      )
  )
