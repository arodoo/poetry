/*
 * File: sellerCodeDeleteAdapter.ts
 * Purpose: Lazy adapter for the seller code delete confirmation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SellerCodeDeleteModule {
  default?: () => ReactElement
  SellerCodeDeletePage?: () => ReactElement
}

export const SellerCodeDeletePageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import('../../../../features/seller-codes/pages/SellerCodeDeletePage').then(
        (module: unknown): { default: () => ReactElement } => {
          const typed: SellerCodeDeleteModule = module as SellerCodeDeleteModule
          const page: () => ReactElement =
            typed.default ?? (typed.SellerCodeDeletePage as () => ReactElement)
          return { default: page }
        }
      )
  )
