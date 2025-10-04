/*
 * File: UserMenuItems.tsx
 * Purpose: Presentational list of menu items used by the user menu dropdown.
 * This module keeps markup and small presentation details for profile and
 * logout actions isolated from the behavioural core. It exists to reduce the
 * line-count and improve testability of the interactive module.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { MenuItem } from '../../../../ui/MenuItem/MenuItem'

interface Props {
  profilePath: string
  profileLabel: string
  logoutLabel: string
  executeLogout: () => void
  logoutPending: boolean
  closeMenu: () => void
}

export function UserMenuItems({
  profilePath,
  profileLabel,
  logoutLabel,
  executeLogout,
  logoutPending,
  closeMenu,
}: Props): ReactElement {
  return (
    <>
      <MenuItem
        to={profilePath}
        onClick={closeMenu}
        data-testid="profile-link"
        className="hover:underline"
      >
        {profileLabel}
      </MenuItem>
      <MenuItem
        onClick={(): void => {
          executeLogout()
        }}
        disabled={logoutPending}
        data-testid="logout-button"
        className="hover:underline"
      >
        {logoutPending ? logoutLabel + '…' : logoutLabel}
      </MenuItem>
    </>
  )
}
