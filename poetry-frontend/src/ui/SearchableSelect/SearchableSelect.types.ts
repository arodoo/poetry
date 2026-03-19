/*
 * File: SearchableSelect.types.ts
 * Purpose: Type definitions for the SearchableSelect component.
 * Defines the option shape and component props used by the
 * searchable dropdown select across the entire application.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly sublabel?: string
}

export interface SearchableSelectProps {
  readonly options: readonly SelectOption[]
  readonly value: string
  readonly onChange: (value: string) => void
  readonly onInputChange?: (value: string) => void
  readonly placeholder?: string
  readonly disabled?: boolean
  readonly required?: boolean
  readonly loading?: boolean
  readonly emptyText?: string
  readonly searchable?: boolean
  readonly 'data-testid'?: string
}
