/*
 * File: sellerCodeCreateAdapter.ts
 * Purpose: Lazy adapter for the seller code create page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, lazy, type LazyExoticComponent } from 'react'

interface SellerCodeCreateModule {
  default?: () => ReactElement
  SellerCodeCreatePage?: () => ReactElement
}

const lazyLoader: () => Promise<{ default: () => ReactElement }> = (): Promise<{
  default: () => ReactElement
}> =>
  import('../../../../features/seller-codes/pages/SellerCodeCreatePage').then(
    (module: unknown): { default: () => ReactElement } => {
      const typed: SellerCodeCreateModule = module as SellerCodeCreateModule
      return {
        default:
          typed.default ?? (typed.SellerCodeCreatePage as () => ReactElement),
      }
    }
  )

export const SellerCodeCreatePageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(lazyLoader)
