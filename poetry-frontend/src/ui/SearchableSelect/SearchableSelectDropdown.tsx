/*
 * File: SearchableSelectDropdown.tsx
 * Purpose: Dropdown list rendering for SearchableSelect. Shows
 * filtered options, loading state, and empty message. Extracted
 * to keep the main component under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { SelectOption } from './SearchableSelect.types'

interface Props {
  readonly filtered: readonly SelectOption[]
  readonly loading?: boolean
  readonly emptyText: string
  readonly onSelect: (value: string) => void
  readonly testId?: string
}

export function SearchableSelectDropdown(props: Props): ReactElement {
  const { filtered, loading, emptyText, onSelect, testId } = props
  const base =
    'absolute z-10 w-full mt-1 bg-surface border ' +
    'rounded shadow-lg max-h-60 overflow-auto'

  return (
    <div className={base} data-testid={testId ? `${testId}-dropdown` : undefined}>
      {loading && (
        <div className="p-2 text-sm text-textMuted">Loading…</div>
      )}
      {!loading && filtered.length === 0 && (
        <div className="p-2 text-sm text-textMuted">{emptyText}</div>
      )}
      {!loading &&
        filtered.map((o: SelectOption) => (
          <button
            key={o.value}
            type="button"
            data-testid={testId ? `${testId}-opt-${o.value}` : undefined}
            className="w-full text-left p-2 hover:bg-surfaceHover text-sm"
            onClick={(): void => {
              onSelect(o.value)
            }}
          >
            <div className="font-medium">{o.label}</div>
            {o.sublabel && (
              <div className="text-xs text-textMuted">{o.sublabel}</div>
            )}
          </button>
        ))}
    </div>
  )
}
