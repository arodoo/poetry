/*
 * File: DataTableSearch.tsx
 * Purpose: Search input component for filtering table data.
 * Provides debounced search with clear functionality.
 * All Rights Reserved. Arodi Emmanuel
 */
import { memo, useState, useRef, useEffect } from 'react'
import type { ReactElement, ChangeEvent, KeyboardEvent } from 'react'
import { useT } from '../../shared/i18n/useT'

export interface SearchProps {
  readonly value: string
  readonly onSearchChange: (value: string) => void
  readonly placeholder?: string
  readonly debounceMs?: number
}

function DataTableSearchInternal(props: SearchProps): ReactElement {
  const t = useT()
  const [internalValue, setInternalValue] = useState(props.value)
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onChangeRef = useRef(props.onSearchChange)
  
  useEffect(() => {
    onChangeRef.current = props.onSearchChange
  }, [props.onSearchChange])
  
  useEffect(() => {
    if (props.value === '') {
      setInternalValue('')
    }
  }, [props.value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value
    setInternalValue(newValue)
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      onChangeRef.current(newValue)
    }, props.debounceMs ?? 300)
  }

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') e.preventDefault()
  }

  const handleClear = (): void => {
    setInternalValue('')
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    onChangeRef.current('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  const inputCls =
    'w-full px-4 py-2 pr-10 rounded-lg text-sm ' +
    'border border-[var(--color-border,#d0d0d0)] ' +
    'bg-[var(--color-surface,#fff)] ' +
    'text-[var(--color-text,#1a1a1a)] ' +
    'placeholder:text-[var(--color-muted,#6b7280)] ' +
    'focus:outline-none focus:ring-2 ' +
    'focus:ring-[var(--color-primary,#6366f1)] ' +
    'focus:border-transparent transition-shadow'

  return (
    <div className="relative flex-1 max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={internalValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={
          props.placeholder ??
          t('ui.table.search.placeholder')
        }
        className={inputCls}
        data-testid="table-search-input"
      />
      {internalValue && (
        <button
          onClick={handleClear}
          className={
            'absolute right-3 top-1/2 ' +
            '-translate-y-1/2 w-4 h-4 ' +
            'flex items-center justify-center ' +
            'text-xs leading-none ' +
            'text-[var(--color-muted,#6b7280)] ' +
            'hover:text-[var(--color-text,#1a1a1a)] ' +
            'transition-colors'
          }
          aria-label={t('ui.table.search.clear')}
          data-testid="table-search-clear"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  )
}

export const DataTableSearch = memo(DataTableSearchInternal)
