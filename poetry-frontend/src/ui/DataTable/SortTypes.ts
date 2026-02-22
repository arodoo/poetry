/*
 * File: SortTypes.ts
 * Purpose: Type definitions for DataTable client-side
 * sorting. Defines direction, state, and sortable column
 * extension used by DataTable and consumer pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactNode } from 'react'
import type { FilterOption } from './FilterTypes'

export type SortDirection = 'asc' | 'desc' | null

export interface SortState {
  readonly key: string
  readonly direction: SortDirection
}

export type ColumnWidth =
  | 'xs' // ~60px (ID)
  | 'sm' // ~100px (Status, Actions icon)
  | 'md' // ~150px (Dates)
  | 'lg' // ~200px (Names, Roles)
  | 'xl' // ~300px (Emails, Descriptions)
  | 'auto'

export interface SortableColumn<T> {
  readonly key: string
  readonly header: string
  readonly accessor: (row: T) => ReactNode
  readonly className?: string
  readonly sortValue?: (row: T) => string | number
  readonly filterOptions?: readonly FilterOption[]
  readonly filterLabel?: string
  readonly width?: ColumnWidth
}

export function cycleSortDirection(current: SortDirection): SortDirection {
  if (current === 'asc') return 'desc'
  if (current === 'desc') return null
  return 'asc'
}

export function toSortParam(sort?: SortState): string | undefined {
  if (!sort?.direction) return undefined
  return `${sort.key},${sort.direction}`
}
