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

interface Props {
  readonly search?: SearchProps
  readonly columns?: readonly DataTableColumn<any>[]
  readonly activeFilters?: ActiveFilters
  readonly onFilterChange?: (k: string, v: string) => void
}

function DataTableControlsInternal(
  props: Props
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
    </>
  )
}

export const DataTableControls = memo(
  DataTableControlsInternal
)
