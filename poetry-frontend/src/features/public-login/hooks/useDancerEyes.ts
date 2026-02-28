/*
 * File: useDancerEyes.ts
 * Purpose: Custom hook that computes dancer pupil offsets based on
 * the mouse cursor position relative to an SVG element center.
 * Provides clamped, smooth eye tracking for the login mascot.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useEffect } from 'react'
import type { RefObject } from 'react'

const MAX_OFFSET = 3.5
const DAMPING = 25

export interface EyeOffset {
  x: number
  y: number
}

export function useDancerEyes(
  svgRef: RefObject<SVGSVGElement | null>
): EyeOffset {
  const [off, setOff] = useState<EyeOffset>({ x: 0, y: 0 })

  useEffect((): (() => void) => {
    function onMove(e: MouseEvent): void {
      const el = svgRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist === 0) return
      const ratio = Math.min(dist / DAMPING, 1)
      setOff({
        x: (dx / dist) * MAX_OFFSET * ratio,
        y: (dy / dist) * MAX_OFFSET * ratio,
      })
    }
    window.addEventListener('mousemove', onMove)
    return (): void => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [svgRef])

  return off
}
