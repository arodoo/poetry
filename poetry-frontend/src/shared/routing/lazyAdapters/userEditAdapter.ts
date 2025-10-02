/*
 * File: userEditAdapter.ts
 * Purpose: Lazy adapter for the admin user edit page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, lazy, type LazyExoticComponent } from 'react'

interface UserEditModule {
  default?: () => ReactElement
  UserEditPage?: () => ReactElement
}

const lazyLoader: () => Promise<{ default: () => ReactElement }> = (): Promise<{
  default: () => ReactElement
}> =>
  import('../../../features/users/pages/UserEditPage').then(
    (module: unknown): { default: () => ReactElement } => {
      const typed: UserEditModule = module as UserEditModule
      return {
        default: typed.default ?? (typed.UserEditPage as () => ReactElement),
      }
    }
  )

export const UserEditPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(lazyLoader)
