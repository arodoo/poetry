/*
 * File: userDetailAdapter.ts
 * Purpose: Lazy adapter for the admin user detail page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, lazy, type LazyExoticComponent } from 'react'

interface UserDetailModule {
  default?: () => ReactElement
  UserDetailPage?: () => ReactElement
}

const lazyLoader: () => Promise<{ default: () => ReactElement }> = (): Promise<{
  default: () => ReactElement
}> =>
  import('../../../../features/users/pages/UserDetailPage').then(
    (module: unknown): { default: () => ReactElement } => {
      const typed: UserDetailModule = module as UserDetailModule
      return {
        default: typed.default ?? (typed.UserDetailPage as () => ReactElement),
      }
    }
  )

export const UserDetailPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(lazyLoader)
