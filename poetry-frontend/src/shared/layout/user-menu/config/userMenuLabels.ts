/*
 * File: userMenuLabels.ts
 * Purpose: Generate derived labels for the user menu so core logic is
 * dedicated to orchestration within required limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { UserMenuDependencies } from '../hooks/useUserMenuDependencies'

export interface UserMenuLabels {
  readonly profilePath: string
  readonly logoutLabel: string
}

export function buildUserMenuLabels(
  dependencies: Pick<UserMenuDependencies, 'translate' | 'locale'>
): UserMenuLabels {
  const profileSlug: string = dependencies.translate('ui.route.profile.slug')
  const profilePath = `/${dependencies.locale}/${profileSlug}`
  const logoutLabel: string = dependencies.translate('ui.nav.logout')
  return {
    profilePath,
    logoutLabel,
  }
}
