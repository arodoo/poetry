/*
 File: useTabListKeydown.ts
 Purpose: Hook providing onKeyDown handler for horizontal tab lists.
 All Rights Reserved. Arodi Emmanuel
*/
import { useCallback, type RefObject, type KeyboardEvent } from 'react'
import { queryTabs } from './tabUtils'

export function useTabListKeydown(
  listRef: RefObject<HTMLDivElement | null>,
  activeIndex: number,
  setActiveIndex: (i: number) => void
): (e: KeyboardEvent<HTMLDivElement>) => void {
  const move: (dir: 1 | -1) => void = useCallback(
    (dir: 1 | -1): void => {
      const node: HTMLDivElement | null = listRef.current
      const tabs: HTMLButtonElement[] = queryTabs(node)
      if (!tabs.length) return
      const next: number = (activeIndex + dir + tabs.length) % tabs.length
      setActiveIndex(next)
      const target: HTMLButtonElement | undefined = tabs[next]
      if (target) target.focus()
    },
    [activeIndex, setActiveIndex, listRef]
  )
  return useCallback(
    (e: KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'ArrowRight') {
        move(1)
        e.preventDefault()
      } else if (e.key === 'ArrowLeft') {
        move(-1)
        e.preventDefault()
      } else if (e.key === 'Home') {
        const node: HTMLDivElement | null = listRef.current
        const tabs: HTMLButtonElement[] = queryTabs(node)
        if (!tabs.length) return
        setActiveIndex(0)
        tabs[0]?.focus()
        e.preventDefault()
      } else if (e.key === 'End') {
        const node: HTMLDivElement | null = listRef.current
        const tabs: HTMLButtonElement[] = queryTabs(node)
        if (!tabs.length) return
        setActiveIndex(tabs.length - 1)
        tabs[tabs.length - 1]?.focus()
        e.preventDefault()
      }
    },
    [move, setActiveIndex, listRef]
  )
}
