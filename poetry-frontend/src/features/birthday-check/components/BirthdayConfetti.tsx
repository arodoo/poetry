/*
 * File: BirthdayConfetti.tsx
 * Purpose: Renders 24 staggered confetti particles across the viewport.
 * Color tokens are applied via CSS custom properties to satisfy the
 * hardcoded-colors check. Each particle uses bd-fall animation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, CSSProperties } from 'react'
import './confetti.css'
import { CONFETTI_PARTICLES } from './confettiData'

export function BirthdayConfetti(): ReactElement {
  return (
    <>
      {CONFETTI_PARTICLES.map(([left, size, dur, delay, cssVar, circle], i) => (
        <span
          key={i}
          className={`bd-particle${circle ? ' bd-circle' : ''}`}
          style={
            {
              left: `${String(left)}%`,
              width: `${String(size)}px`,
              height: `${String(size)}px`,
              animationDuration: `${String(dur)}s`,
              animationDelay: `${String(delay)}s`,
              '--bd-color': `var(${cssVar})`,
            } as CSSProperties
          }
        />
      ))}
    </>
  )
}
