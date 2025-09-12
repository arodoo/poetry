/*
 File: useTabsKeyHandler.ts
 Purpose: Extracted keyboard handler hook for TabsRoot to keep file short.
 All Rights Reserved. Arodi Emmanuel
*/
import { useCallback, type KeyboardEvent } from 'react'

export function useTabsKeyHandler(
  count: number,
  activeIndex: number,
  select: (i: number) => void,
  getTabId: (i: number) => string
): (e: KeyboardEvent<HTMLDivElement>) => void {
  return useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      const max: number = count
      if (!max) return
      let next: number = activeIndex
      if (e.key === 'ArrowRight') next = (activeIndex + 1) % max
      else if (e.key === 'ArrowLeft') next = (activeIndex - 1 + max) % max
      else if (e.key === 'Home') next = 0
      else if (e.key === 'End') next = max - 1
      if (next !== activeIndex) {
        select(next)
        const btn: HTMLElement | null = document.getElementById(getTabId(next))
        if (btn) (btn as HTMLButtonElement).focus()
        e.preventDefault()
      }
    },
    [count, activeIndex, select, getTabId]
  )
}
