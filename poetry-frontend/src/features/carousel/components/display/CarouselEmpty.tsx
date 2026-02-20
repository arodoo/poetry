/*
 * File: CarouselEmpty.tsx
 * Purpose: Placeholder displayed when the carousel has no slides yet.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface Props {
  message: string
}

export function CarouselEmpty({ message }: Props): ReactElement {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-[var(--color-surface)]">
      <svg
        className="h-20 w-20 text-[var(--color-muted)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
      <p className="text-lg text-[var(--color-muted)]">{message}</p>
    </div>
  )
}
