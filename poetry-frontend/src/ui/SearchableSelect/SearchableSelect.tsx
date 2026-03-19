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
import { StaticTrigger } from './StaticTrigger'
import { SelectedLabel } from './SelectedLabel'
import type {
  SearchableSelectProps,
  SelectOption,
} from './SearchableSelect.types'

export type { SearchableSelectProps, SelectOption }

export function SearchableSelect(props: SearchableSelectProps): ReactElement {
  const {
    options,
    value,
    onChange,
    onInputChange,
    placeholder,
    disabled,
    loading,
    emptyText,
    searchable = true,
    'data-testid': testId,
  } = props

  const state = useSearchableSelect(options, value, onChange)
  const selected = options.find((o: SelectOption) => o.value === value)
  const displayText = selected?.label ?? ''

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    state.onInputChange(e.target.value)
    if (onInputChange) {
      onInputChange(e.target.value)
    }
  }

  return (
    <div className="relative" ref={state.containerRef}>
      {searchable ? (
        <Input
          data-testid={testId}
          placeholder={placeholder ?? 'Search\u2026'}
          defaultValue=""
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={state.onFocus}
          autoComplete="off"
        />
      ) : (
        <StaticTrigger
          testId={testId}
          displayText={displayText}
          placeholder={placeholder}
          disabled={disabled}
          onClick={state.toggleOpen}
        />
      )}
      {searchable && displayText && !state.isOpen && (
        <SelectedLabel testId={testId} text={displayText} />
      )}
      {state.isOpen && (
        <SearchableSelectDropdown
          filtered={searchable ? state.filtered : options}
          loading={loading}
          emptyText={emptyText ?? 'No results'}
          onSelect={state.select}
          testId={testId}
        />
      )}
    </div>
  )
}
