/*
 * File: FullscreenButton.tsx
 * Purpose: Toggle button for native browser fullscreen mode.
 * Switches icon between expand and compress based on current state.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface Props {
  isFullscreen: boolean
  onToggle: () => void
  label: string
}

export function FullscreenButton({ isFullscreen, onToggle, label }: Props): ReactElement {
  return (
    <button
      onClick={onToggle}
      aria-label={label}
      title={label}
      className={
        'absolute top-4 left-4 z-30 rounded-full bg-black/40 p-2.5 ' +
        'text-white backdrop-blur-sm hover:bg-black/70 transition-colors'
      }
    >
      {isFullscreen ? (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M9 9H4m0 0V4m0 5l5-5M15 9h5m0 0V4m0 5l-5-5M9 15H4m0 0v5m0-5l5 5M15 15h5m0 0v5m0-5l-5 5" />
        </svg>
      ) : (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" d="M4 9V4m0 0h5M4 4l5 5M20 9V4m0 0h-5m5 0l-5 5M4 15v5m0 0h5m-5 0l5-5M20 15v5m0 0h-5m5 0l-5-5" />
        </svg>
      )}
    </button>
  )
}
