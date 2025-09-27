/*
 * File: profileAdapter.ts
 * Purpose: Lazy adapter for Profile page default export.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface ProfileModule {
  default?: () => ReactElement
  ProfilePage?: () => ReactElement
}

export const ProfilePageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../features/profile/pages/ProfilePage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: ProfileModule = m as ProfileModule
        return {
          default: mod.default ?? (mod.ProfilePage as () => ReactElement),
        }
      }
    )
)
