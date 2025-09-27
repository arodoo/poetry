/*
 * File: useDocumentClick.ts
 * Purpose: Small hook to register a global document click handler and call
 * a provided callback when a click happens outside the provided refs.
 * Extracted to reduce line counts in components using the behavior.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect } from 'react'

export function useDocumentClick(
  active: boolean,
  refs: React.RefObject<HTMLElement | null>[],
  onOutside: () => void
): void {
  useEffect((): (() => void) => {
    const handler: (event: MouseEvent) => void = (event: MouseEvent): void => {
      if (!active) return
      const target: Node | null = event.target as Node | null
      if (!target) return
      for (const r of refs) {
        if (r.current?.contains(target)) return
      }
      onOutside()
    }
    document.addEventListener('click', handler)
    return (): void => {
      document.removeEventListener('click', handler)
    }
  }, [active, refs, onOutside])
}

export default useDocumentClick
