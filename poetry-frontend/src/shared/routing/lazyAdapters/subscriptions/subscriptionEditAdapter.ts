/*
 * File: subscriptionEditAdapter.ts
 * Purpose: Lazy adapter for subscription edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface SubscriptionEditModule {
  default?: () => ReactElement
  SubscriptionEditPage?: () => ReactElement
}

export const SubscriptionEditPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import(
        '../../../../features/subscriptions/pages/SubscriptionEditPage'
      ).then((module: unknown): { default: () => ReactElement } => {
        const typed: SubscriptionEditModule = module as SubscriptionEditModule
        const page: () => ReactElement =
          typed.default ?? (typed.SubscriptionEditPage as () => ReactElement)
        return { default: page }
      })
  )
