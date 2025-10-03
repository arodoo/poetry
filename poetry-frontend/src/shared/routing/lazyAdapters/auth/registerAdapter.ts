/*
 * File: registerAdapter.ts
 * Purpose: Lazy default-export adapter for the Register page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface RegisterModule {
  default?: () => ReactElement
  RegisterPage?: () => ReactElement
}

export const RegisterPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/public-register/pages/RegisterPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: RegisterModule = m as RegisterModule
        return {
          default: mod.default ?? (mod.RegisterPage as () => ReactElement),
        }
      }
    )
)
