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

export interface SortableColumn<T> {
    readonly key: string
    readonly header: string
    readonly accessor: (row: T) => ReactNode
    readonly className?: string
    readonly sortValue?: (row: T) => string | number
    readonly filterOptions?: readonly FilterOption[]
    readonly filterLabel?: string
}

export function cycleSortDirection(
    current: SortDirection
): SortDirection {
    if (current === 'asc') return 'desc'
    if (current === 'desc') return null
    return 'asc'
}

export function toSortParam(
    sort?: SortState
): string | undefined {
    if (!sort?.direction) return undefined
    return `${sort.key},${sort.direction}`
}
