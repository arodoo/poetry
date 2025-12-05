/*
 * File: userDeleteAdapter.ts
 * Purpose: Lazy adapter for the admin user delete confirmation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, lazy, type LazyExoticComponent } from 'react'

interface UserDeleteModule {
  default?: () => ReactElement
  UserDeletePage?: () => ReactElement
}

const lazyLoader: () => Promise<{ default: () => ReactElement }> = (): Promise<{
  default: () => ReactElement
}> =>
  import('../../../../features/users/pages/crud/UserDeletePage').then(
    (module: unknown): { default: () => ReactElement } => {
      const typed: UserDeleteModule = module as UserDeleteModule
      return {
        default: typed.default ?? (typed.UserDeletePage as () => ReactElement),
      }
    }
  )

export const UserDeletePageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(lazyLoader)
