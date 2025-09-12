/*
 File: useModalEsc.ts
 Purpose: Hook to close modal on ESC key press.
 All Rights Reserved. Arodi Emmanuel
*/
import { useEffect } from 'react'

export function useModalEsc(open: boolean, onClose: () => void): void {
  useEffect((): (() => void) | undefined => {
    if (!open) return undefined
    const handler: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return (): void => {
      window.removeEventListener('keydown', handler)
    }
  }, [open, onClose])
}
