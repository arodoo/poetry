/*
 * File: useFullscreen.ts
 * Purpose: Provides native browser fullscreen toggle for any ref element.
 * Listens to the fullscreenchange event to keep state in sync.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback, useEffect, useRef, useState } from 'react'

interface FullscreenState {
  ref: React.RefObject<HTMLDivElement | null>
  isFullscreen: boolean
  toggle: () => void
}

export function useFullscreen(): FullscreenState {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)

  useEffect((): (() => void) => {
    function onFsChange(): void {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return (): void => {
      document.removeEventListener('fullscreenchange', onFsChange)
    }
  }, [])

  const toggle = useCallback((): void => {
    if (!document.fullscreenElement && ref.current) {
      void ref.current.requestFullscreen()
    } else if (document.fullscreenElement) {
      void document.exitFullscreen()
    }
  }, [])

  return { ref, isFullscreen, toggle }
}
