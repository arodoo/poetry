/*
 * File: publicAdapters.ts
 * Purpose: Small adapter file that provides default-export-compatible lazy
 * components to avoid inline long handlers in route files.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface HomeModule {
  default?: () => ReactElement
  HomePage?: () => ReactElement
}

export const HomePageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/public/pages/HomePage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: HomeModule = m as HomeModule
        return {
          default: mod.default ?? (mod.HomePage as () => ReactElement),
        }
      }
    )
)

interface NotFoundModule {
  default?: () => ReactElement
  NotFoundPage?: () => ReactElement
}

export const NotFoundPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/public/pages/NotFoundPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: NotFoundModule = m as NotFoundModule
        return {
          default: mod.default ?? (mod.NotFoundPage as () => ReactElement),
        }
      }
    )
)
