/*
 * File: DataTableSearch.tsx
 * Purpose: Search input component for filtering table data.
 * Provides debounced search with clear functionality.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { useState, useEffect } from 'react'
import { useT } from '../../shared/i18n/useT'

export interface SearchProps {
  readonly value: string
  readonly onSearchChange: (value: string) => void
  readonly placeholder?: string
  readonly debounceMs?: number
}

export function DataTableSearch(props: SearchProps): ReactElement {
  const t = useT()
  const [localValue, setLocalValue] = useState<string>(props.value)
  const debounceMs: number = props.debounceMs ?? 300

  useEffect((): void => {
    setLocalValue(props.value)
  }, [props.value])

  useEffect((): (() => void) => {
    const timer = setTimeout((): void => {
      if (localValue !== props.value) {
        props.onSearchChange(localValue)
      }
    }, debounceMs)
    return (): void => clearTimeout(timer)
  }, [localValue, debounceMs, props])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setLocalValue(e.target.value)
  }

  const handleClear = (): void => {
    setLocalValue('')
    props.onSearchChange('')
  }
  return (
    <div className="mb-4 flex items-center gap-2">
      <div className="relative flex-1 max-w-md">
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder={props.placeholder ?? t('ui.table.search.placeholder')}
          className="w-full px-4 py-2 border rounded-md pr-10"
          data-testid="table-search-input"
        />
        {localValue && (
          <button
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
            aria-label={t('ui.table.search.clear')}
            data-testid="table-search-clear"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
