/*
 * File: userMenuLogout.ts
 * Purpose: Provide a focused factory that builds the logout executor for
 * the user menu hook while respecting repository length constraints.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  LogoutMutation,
  NavigateFunction,
} from '../hooks/useUserMenuDependencies'

export interface LogoutExecutorConfig {
  readonly closeMenu: () => void
  readonly logoutMutation: LogoutMutation
  readonly navigate: NavigateFunction
  readonly locale: string
}

export function createLogoutExecutor(
  config: LogoutExecutorConfig
): () => Promise<void> {
  const { closeMenu, logoutMutation, navigate, locale } = config
  return async (): Promise<void> => {
    if (logoutMutation.isPending) {
      return
    }
    closeMenu()
    try {
      await logoutMutation.mutateAsync()
    } catch (error: unknown) {
      void error
    }
    void navigate(`/${locale}/login`, { replace: true })
  }
}
