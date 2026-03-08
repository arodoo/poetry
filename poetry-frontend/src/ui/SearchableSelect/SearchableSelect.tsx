/*
 * File: SearchableSelect.tsx
 * Purpose: Reusable searchable dropdown select component. Replaces
 * native HTML selects with a filterable dropdown that supports
 * debounced search, click-outside-close, and accessible keyboard
 * interactions. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Input } from '../Input/Input'
import { useSearchableSelect } from './useSearchableSelect'
import { SearchableSelectDropdown } from './SearchableSelectDropdown'
import type { SearchableSelectProps, SelectOption } from './SearchableSelect.types'

export type { SearchableSelectProps, SelectOption }

export function SearchableSelect(props: SearchableSelectProps): ReactElement {
  const {
    options, value, onChange, placeholder, disabled,
    loading, emptyText, 'data-testid': testId,
  } = props

  const state = useSearchableSelect(options, value, onChange)
  const selected = options.find((o: SelectOption) => o.value === value)
  const displayText = selected?.label ?? ''

  return (
    <div className="relative" ref={state.containerRef}>
      <Input
        data-testid={testId}
        placeholder={placeholder ?? 'Search…'}
        defaultValue=""
        disabled={disabled}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          state.onInputChange(e.target.value)
        }}
        onFocus={state.onFocus}
        autoComplete="off"
      />
      {displayText && !state.isOpen && (
        <div
          className="mt-1 text-xs text-textMuted truncate"
          data-testid={testId ? `${testId}-selected` : undefined}
        >
          {displayText}
        </div>
      )}
      {state.isOpen && (
        <SearchableSelectDropdown
          filtered={state.filtered}
          loading={loading}
          emptyText={emptyText ?? 'No results'}
          onSelect={state.select}
          testId={testId}
        />
      )}
    </div>
  )
}
