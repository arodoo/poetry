/*
 * File: accountAdapter.ts
 * Purpose: Lazy default-export adapter for the Account page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface AccountModule {
  default?: () => ReactElement
  AccountPage?: () => ReactElement
}

export const AccountPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/account/pages/AccountPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: AccountModule = m as AccountModule
        const page: () => ReactElement =
          mod.default ?? (mod.AccountPage as () => ReactElement)
        return { default: page }
      }
    )
)
