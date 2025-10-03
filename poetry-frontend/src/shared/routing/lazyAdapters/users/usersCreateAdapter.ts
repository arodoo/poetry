/*
 * File: usersCreateAdapter.ts
 * Purpose: Lazy adapter for the admin users create page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, lazy, type LazyExoticComponent } from 'react'

interface UsersCreateModule {
  default?: () => ReactElement
  UsersCreatePage?: () => ReactElement
}

const lazyLoader: () => Promise<{ default: () => ReactElement }> = (): Promise<{
  default: () => ReactElement
}> =>
  import('../../../../features/users/pages/UsersCreatePage').then(
    (module: unknown): { default: () => ReactElement } => {
      const typed: UsersCreateModule = module as UsersCreateModule
      return {
        default: typed.default ?? (typed.UsersCreatePage as () => ReactElement),
      }
    }
  )

export const UsersCreatePageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(lazyLoader)
