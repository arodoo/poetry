/*
 * File: Navbar.tsx
 * Purpose: Top navigation bar with profile menu on the right.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UserMenu } from '../user-menu'
import { BirthdayCheckButton } from '../../../features/birthday-check'

export function Navbar(): ReactElement {
  return (
    <header
      className={
        'border-b border-[var(--color-border)] ' +
        'bg-[var(--color-surface)] h-14'
      }
    >
      <div className="h-full flex items-center justify-end gap-2 px-4">
        <BirthdayCheckButton />
        <UserMenu />
      </div>
    </header>
  )
}
