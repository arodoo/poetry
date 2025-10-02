/*
 * File: adminTokensAdapter.ts
 * Purpose: Lazy adapter for the admin tokens page default export.
 * All Rights Reserved. Arodi Emmanuel
 */
import { lazy } from 'react'
import type { LazyExoticComponent, ReactElement } from 'react'

interface AdminTokensModule {
  default?: () => ReactElement
  AdminTokensPage?: () => ReactElement
}

export const AdminTokensPageLazy: LazyExoticComponent<() => ReactElement> =
  lazy(
    (): Promise<{ default: () => ReactElement }> =>
      import('../../../features/tokens/pages/AdminTokensPage').then(
        (module: unknown): { default: () => ReactElement } => {
          const typed: AdminTokensModule = module as AdminTokensModule
          const page: () => ReactElement =
            typed.default ?? (typed.AdminTokensPage as () => ReactElement)
          return { default: page }
        }
      )
  )
