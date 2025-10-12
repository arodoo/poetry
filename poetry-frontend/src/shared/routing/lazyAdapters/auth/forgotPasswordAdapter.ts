/*
 * File: forgotPasswordAdapter.ts
 * Purpose: Lazy adapter exposing forgot-password page default export.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, LazyExoticComponent } from 'react'
import { lazy } from 'react'

interface ForgotPasswordModule {
  default?: () => ReactElement
  PublicForgotPasswordPage?: () => ReactElement
}

const pagePath =
  '../../../../features/public-forgot-password/pages/PublicForgotPasswordPage'

export const PublicForgotPasswordPageLazy: LazyExoticComponent<
  () => ReactElement
> = lazy(
  (): Promise<{ default: () => ReactElement }> =>
    import(pagePath).then(
      (module: unknown): { default: () => ReactElement } => {
        const mod: ForgotPasswordModule = module as ForgotPasswordModule
        return {
          default:
            mod.default ?? (mod.PublicForgotPasswordPage as () => ReactElement),
        }
      }
    )
)
