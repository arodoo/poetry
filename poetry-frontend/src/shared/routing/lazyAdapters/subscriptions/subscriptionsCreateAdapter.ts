/*
 * File: subscriptionsCreateAdapter.ts
 * Purpose: Lazy adapter for the subscriptions create page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SubscriptionsCreateModule {
  default?: () => ReactElement
  SubscriptionsCreatePage?: () => ReactElement
}

export const SubscriptionsCreatePageLazy:
  LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import(
      '../../../../features/subscriptions/pages/SubscriptionsCreatePage'
    ).then(
      (module: unknown): { default: () => ReactElement } => {
        const typed: SubscriptionsCreateModule =
          module as SubscriptionsCreateModule
        const page: () => ReactElement =
          typed.default ??
          (typed.SubscriptionsCreatePage as () => ReactElement)
        return { default: page }
      }
    )
)
