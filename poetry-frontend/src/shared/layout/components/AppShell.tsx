/*
 * File: AppShell.tsx
 * Purpose: App shell with top Navbar and left Sidebar.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { useState } from 'react'
import { Navbar } from './Navbar.tsx'
import { Sidebar } from '../sidebar'

export function AppShell({ children }: { children: ReactNode }): ReactElement {
  const [open, setOpen] = useState<boolean>(true)
  const onToggleSidebar: () => void = (): void => {
    setOpen((value: boolean): boolean => !value)
  }
  return (
    <div className="min-h-screen bg-white">
      <Navbar onToggleSidebar={onToggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={open} />
        <main className="flex-1 min-w-0 max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </div>
    </div>
  )
}
