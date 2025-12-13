/*
 * File: UserMenuCoreImpl.tsx
 * Purpose: Behavioural core for the user menu dropdown. This module contains
 * the interactive logic, event handling and state management for the user
 * menu while keeping presentation separated in a dedicated presentational
 * module. See `UserMenuItems.tsx` for markup and small UI details.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Avatar } from '../../../../ui/Avatar/Avatar'
import { UserMenuItems } from './UserMenuItems'
import BlockingOverlaySmall from '../../components/BlockingOverlaySmall'
import { useUserMenuCore } from '../logic/UserMenuCoreLogic'

export function UserMenuCoreImpl(): ReactElement {
  const {
    isOpen,
    buttonReference,
    menuReference,
    toggleMenu,
    closeMenu,
    executeLogout,
    logoutMutation,
    username,
    profilePath,
    logoutLabel,
    translate,
  } = useUserMenuCore()

  return (
    <div className="relative" data-testid="user-menu-wrapper">
      <BlockingOverlaySmall
        visible={logoutMutation.isPending}
        label={translate('ui.nav.logout') + '…'}
      />
      <button
        ref={buttonReference}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label={translate('ui.nav.userMenu')}
        data-testid="user-menu"
        className="flex items-center gap-2"
        onClick={toggleMenu}
        type="button"
      >
        <Avatar name={username} size="sm" />
        <span className="text-sm text-[var(--color-text)]">{username}</span>
      </button>
      {isOpen && (
        <div
          ref={menuReference}
          role="menu"
          className="absolute right-0 mt-2 w-40 rounded border bg-[var(--color-surface)] shadow"
        >
          <UserMenuItems
            profilePath={profilePath}
            profileLabel={translate('ui.route.profile.title')}
            logoutLabel={logoutLabel}
            executeLogout={(): void => void executeLogout()}
            logoutPending={logoutMutation.isPending}
            closeMenu={closeMenu}
          />
        </div>
      )}
    </div>
  )
}

export default UserMenuCoreImpl
