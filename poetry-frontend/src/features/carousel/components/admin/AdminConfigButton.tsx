/*
 * File: AdminConfigButton.tsx
 * Purpose: Gear icon button that opens the admin config drawer.
 * Only rendered when the user has the ADMIN role.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface Props {
  onOpen: () => void
  label: string
}

export function AdminConfigButton({ onOpen, label }: Props): ReactElement {
  return (
    <button
      onClick={onOpen}
      aria-label={label}
      title={label}
      className={
        'inline-flex items-center gap-2 rounded-lg border ' +
        'border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 ' +
        'text-sm font-medium text-[var(--color-text)] ' +
        'hover:bg-[var(--color-surface-alt)] transition-colors'
      }
    >
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={
            'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 ' +
            '002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 ' +
            '001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 ' +
            '00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 ' +
            '0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 ' +
            '1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 ' +
            '1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 ' +
            '1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 ' +
            '2.296.07 2.572-1.065z'
          }
        />
        <circle cx="12" cy="12" r="3" />
      </svg>
      <span>{label}</span>
    </button>
  )
}
