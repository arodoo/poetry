/*
 * File: usersListAdapter.ts
 * Purpose: Lazy adapter for the admin users list page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface UsersListModule {
  default?: () => ReactElement
  UsersListPage?: () => ReactElement
}

export const UsersListPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/users/pages/UsersListPage').then(
      (module: unknown): { default: () => ReactElement } => {
        const typed: UsersListModule = module as UsersListModule
        const page: () => ReactElement =
          typed.default ?? (typed.UsersListPage as () => ReactElement)
        return { default: page }
      }
    )
)
