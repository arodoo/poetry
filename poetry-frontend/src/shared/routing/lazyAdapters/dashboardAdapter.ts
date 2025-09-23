/*
 * File: dashboardAdapter.ts
 * Purpose: Lazy default-export adapter for the Dashboard page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface DashboardModule {
  default?: () => ReactElement
  DashboardPage?: () => ReactElement
}

export const DashboardPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../features/dashboard/pages/DashboardPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: DashboardModule = m as DashboardModule
        const page: () => ReactElement =
          mod.default ?? (mod.DashboardPage as () => ReactElement)
        return { default: page }
      }
    )
)
