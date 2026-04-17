/*
 * File: useSearchableSelect.ts
 * Purpose: Hook encapsulating search, open/close, and keyboard
 * navigation logic for the SearchableSelect component. Keeps the
 * presentational component lean and under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useRef, useMemo, useCallback } from 'react'
import { useDebouncedCallback } from '../../shared/hooks/useDebouncedCallback'
import { useDocumentClick } from '../../shared/hooks/useDocumentClick'
import type { SelectOption } from './SearchableSelect.types'

export interface SearchableSelectState {
  query: string
  isOpen: boolean
  filtered: readonly SelectOption[]
  containerRef: React.RefObject<HTMLDivElement | null>
  onInputChange: (value: string) => void
  onFocus: () => void
  toggleOpen: () => void
  close: () => void
  select: (value: string) => void
}

export function useSearchableSelect(
  options: readonly SelectOption[],
  value: string,
  onChange: (v: string) => void
): SearchableSelectState {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const debouncedSet = useDebouncedCallback((v: string) => {
    setQuery(v)
    setIsOpen(true)
  }, 200)

  useDocumentClick(isOpen, [containerRef], () => {
    setIsOpen(false)
  })

  const filtered = useMemo((): readonly SelectOption[] => {
    if (!query) return options
    const lower = query.toLowerCase()
    return options.filter((o: SelectOption): boolean => {
      const inLabel = o.label.toLowerCase().includes(lower)
      const inSub = o.sublabel?.toLowerCase().includes(lower)
      return inLabel || Boolean(inSub)
    })
  }, [options, query])

  const select = useCallback(
    (v: string): void => {
      onChange(v)
      setIsOpen(false)
      setQuery('')
    },
    [onChange]
  )

  const onFocus = useCallback((): void => {
    setIsOpen(true)
  }, [])

  const toggleOpen = useCallback((): void => {
    setIsOpen((prev: boolean) => !prev)
  }, [])

  return {
    query,
    isOpen,
    filtered,
    containerRef,
    onInputChange: debouncedSet,
    onFocus,
    toggleOpen,
    close: () => setIsOpen(false),
    select,
  }
}
