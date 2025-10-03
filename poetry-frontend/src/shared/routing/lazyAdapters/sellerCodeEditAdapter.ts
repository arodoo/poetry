/*
 * File: sellerCodeEditAdapter.ts
 * Purpose: Lazy adapter for the seller code edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SellerCodeEditModule {
  default?: () => ReactElement
  SellerCodeEditPage?: () => ReactElement
}

export const SellerCodeEditPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import('../../../features/seller-codes/pages/SellerCodeEditPage').then(
        (module: unknown): { default: () => ReactElement } => {
          const typed: SellerCodeEditModule = module as SellerCodeEditModule
          const page: () => ReactElement =
            typed.default ?? (typed.SellerCodeEditPage as () => ReactElement)
          return { default: page }
        }
      )
  )
