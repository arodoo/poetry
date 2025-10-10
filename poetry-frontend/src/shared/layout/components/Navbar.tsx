/*
 * File: Navbar.tsx
 * Purpose: Top navigation bar with profile menu on the right.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UserMenu } from '../user-menu'

export function Navbar(): ReactElement {
  return (
    <header className="border-b border-[var(--color-border)] bg-white h-14">
      <div className="h-full flex items-center justify-end px-4">
        <UserMenu />
      </div>
    </header>
  )
}
