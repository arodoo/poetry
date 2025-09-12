/*
 File: useModalInitialFocus.ts
 Purpose: Hook to focus first focusable element inside a modal when opened.
 All Rights Reserved. Arodi Emmanuel
*/
import { useEffect, type RefObject } from 'react'
import { focusFirstIn } from './focusHelpers'

export function useModalInitialFocus(
  open: boolean,
  containerRef: RefObject<HTMLDivElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>
): void {
  useEffect((): (() => void) | undefined => {
    if (!open) return undefined
    const task: () => void = (): void => {
      focusFirstIn(containerRef.current, initialFocusRef?.current ?? null)
    }
    const raf: number = requestAnimationFrame(task)
    return (): void => {
      cancelAnimationFrame(raf)
    }
  }, [open, containerRef, initialFocusRef])
}
