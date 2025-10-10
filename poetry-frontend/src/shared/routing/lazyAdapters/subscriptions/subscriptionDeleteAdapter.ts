/*
 * File: subscriptionDeleteAdapter.ts
 * Purpose: Lazy adapter for subscription delete page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SubscriptionDeleteModule {
  default?: () => ReactElement
  SubscriptionDeletePage?: () => ReactElement
}

export const SubscriptionDeletePageLazy:
  LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import(
      '../../../../features/subscriptions/pages/SubscriptionDeletePage'
    ).then(
      (module: unknown): { default: () => ReactElement } => {
        const typed: SubscriptionDeleteModule =
          module as SubscriptionDeleteModule
        const page: () => ReactElement =
          typed.default ?? (typed.SubscriptionDeletePage as () => ReactElement)
        return { default: page }
      }
    )
)
