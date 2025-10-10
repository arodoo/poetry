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
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="h-full min-h-screen bg-[var(--color-surface)] border-l-[5vw] border-r-[5vw] border-[var(--color-border)]">
        <Navbar />
        <div className="flex">
          <Sidebar isOpen={open} onToggle={onToggleSidebar} />
          <main className="flex-1 min-w-0 w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
