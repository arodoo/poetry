/*
 * File: unauthorizedAdapter.ts
 * Purpose: Adapter to provide a default-export-compatible lazy component for
 * the Unauthorized page used by public routing.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface UnauthorizedModule {
  default?: () => ReactElement
  UnauthorizedPage?: () => ReactElement
}

export const UnauthorizedLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../features/auth/pages/UnauthorizedPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: UnauthorizedModule = m as UnauthorizedModule

        return {
          default: mod.default ?? (mod.UnauthorizedPage as () => ReactElement),
        }
      }
    )
)
