/*
 * File: subscriptionsListAdapter.ts
 * Purpose: Lazy adapter for the subscriptions list page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SubscriptionsListModule {
  default?: () => ReactElement
  SubscriptionsListPage?: () => ReactElement
}

export const SubscriptionsListPageLazy:
  LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import(
      '../../../../features/subscriptions/pages/SubscriptionsListPage'
    ).then(
      (module: unknown): { default: () => ReactElement } => {
        const typed: SubscriptionsListModule =
          module as SubscriptionsListModule
        const page: () => ReactElement =
          typed.default ?? (typed.SubscriptionsListPage as () => ReactElement)
        return { default: page }
      }
    )
)
