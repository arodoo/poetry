/*
 * File: DataTableControls.tsx
 * Purpose: Reusable search and filter controls for DataTable
 * that maintain focus by being rendered independently.
 * All Rights Reserved. Arodi Emmanuel
 */
import { memo } from 'react'
import type { ReactElement } from 'react'
import { DataTableSearch } from './DataTableSearch'
import type { SearchProps } from './DataTableSearch'
import { DataTableFilters } from './DataTableFilters'
import type { ActiveFilters, FilterDef } from './FilterTypes'
import type { DataTableColumn } from './DataTable'
import { DataTableSort } from './DataTableSort'
import type { SortState } from './SortTypes'

interface Props<T> {
  readonly search?: SearchProps
  readonly columns?: readonly DataTableColumn<T>[]
  readonly activeFilters?: ActiveFilters
  readonly onFilterChange?: (k: string, v: string) => void
  readonly sort?: SortState
  readonly onSortChange?: (s: SortState) => void
}

function DataTableControlsInternal<T>(
  props: Props<T>
): ReactElement | null {
  const filterDefs: readonly FilterDef[] =
    (props.columns ?? [])
      .filter((col) => col.filterOptions)
      .map((col) => ({
        key: col.key,
        label: col.filterLabel ?? col.header,
        options: col.filterOptions!,
      }))

  if (!props.search && filterDefs.length === 0) return null

  return (
    <>
      {props.search && (
        <DataTableSearch {...props.search} />
      )}
      {filterDefs.length > 0 && props.activeFilters && (
        <DataTableFilters
          filters={filterDefs}
          active={props.activeFilters}
          onChange={props.onFilterChange!}
        />
      )}
      {props.columns && props.sort && props.onSortChange && (
        <DataTableSort
          columns={props.columns}
          sort={props.sort}
          onChange={props.onSortChange}
        />
      )}
    </>
  )
}

export const DataTableControls = memo(
  DataTableControlsInternal
) as <T>(props: Props<T>) => ReactElement | null
