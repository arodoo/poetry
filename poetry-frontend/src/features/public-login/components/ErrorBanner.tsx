/*
 * File: ErrorBanner.tsx
 * Purpose: Small presentational component to render error messages in forms.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

export function ErrorBanner({ message }: { message: string }): ReactElement {
  return (
    <div
      className={[
        'bg-[var(--color-error)]',
        'border',
        'border-[var(--color-error)]',
        'rounded',
        'p-3',
      ].join(' ')}
    >
      <p className="text-white text-sm">{message}</p>
    </div>
  )
}
