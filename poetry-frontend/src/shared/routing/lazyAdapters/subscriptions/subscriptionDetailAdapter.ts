/*
 * File: subscriptionDetailAdapter.ts
 * Purpose: Lazy adapter for subscription detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SubscriptionDetailModule {
  default?: () => ReactElement
  SubscriptionDetailPage?: () => ReactElement
}

export const SubscriptionDetailPageLazy:
  LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import(
      '../../../../features/subscriptions/pages/SubscriptionDetailPage'
    ).then(
      (module: unknown): { default: () => ReactElement } => {
        const typed: SubscriptionDetailModule =
          module as SubscriptionDetailModule
        const page: () => ReactElement =
          typed.default ?? (typed.SubscriptionDetailPage as () => ReactElement)
        return { default: page }
      }
    )
)
