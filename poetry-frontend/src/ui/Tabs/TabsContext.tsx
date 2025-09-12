/*
 File: TabsContext.tsx
 Purpose: React context for Tabs component state and registration logic.
 All Rights Reserved. Arodi Emmanuel
*/
import { createContext, useContext, type Context } from 'react'

export interface TabsContextValue {
  activeIndex: number
  setActiveIndex: (index: number) => void
  registerTab: (id: string) => number
  registerPanel: (id: string) => number
  getTabId: (index: number) => string
  getPanelId: (index: number) => string
}

export const TabsContext: Context<TabsContextValue | null> =
  createContext<TabsContextValue | null>(null)

export function useTabsContext(): TabsContextValue {
  const ctx: TabsContextValue | null = useContext(TabsContext)
  if (!ctx) {
    throw new Error('Tabs components must be used within <Tabs> root')
  }
  return ctx
}
