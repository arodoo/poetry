/*
 * File: loginAdapter.ts
 * Purpose: Lazy default-export adapter for the Login page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface LoginModule {
  default?: () => ReactElement
  LoginPage?: () => ReactElement
}

export const LoginPageLazy: LazyExoticComponent<() => ReactElement> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import('../../../../features/public-login/pages/LoginPage').then(
      (m: unknown): { default: () => ReactElement } => {
        const mod: LoginModule = m as LoginModule
        return { default: mod.default ?? (mod.LoginPage as () => ReactElement) }
      }
    )
)
