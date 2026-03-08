/*
 * File: StaticTrigger.tsx
 * Purpose: Button trigger for non-searchable SearchableSelect.
 * Renders the selected label or placeholder and opens the
 * dropdown on click without showing a text input field.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface StaticTriggerProps {
  readonly testId?: string
  readonly displayText: string
  readonly placeholder?: string
  readonly disabled?: boolean
  readonly onClick: () => void
}

const BASE_CLASS =
  'w-full text-left px-3 py-2 border rounded bg-surface ' +
  'text-sm disabled:opacity-50 cursor-pointer'

export function StaticTrigger(props: StaticTriggerProps): ReactElement {
  const { testId, displayText, placeholder, disabled, onClick } = props

  return (
    <button
      type="button"
      data-testid={testId}
      className={BASE_CLASS}
      disabled={disabled}
      onClick={onClick}
    >
      {displayText || (
        <span className="text-textMuted">
          {placeholder ?? 'Select\u2026'}
        </span>
      )}
    </button>
  )
}
