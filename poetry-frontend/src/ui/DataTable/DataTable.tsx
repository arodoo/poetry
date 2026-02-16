/*
 * File: DataTable.tsx
 * Purpose: Modern, reusable data table with responsive
 * design, server-side sorting, and filter dropdowns.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import { s, widths } from './DataTableStyles'
import { DataTablePagination } from './DataTablePagination'
import type { PaginationProps } from './DataTablePagination'
import { DataTableBody } from './DataTableBody'
import { SortIndicator } from './SortIndicator'
import type { SortableColumn, SortState } from './SortTypes'
import { cycleSortDirection } from './SortTypes'

export type DataTableColumn<T> = SortableColumn<T>

export interface DataTableProps<T> {
  readonly columns: readonly DataTableColumn<T>[]
  readonly data: readonly T[]
  readonly keyExtractor: (row: T) => string
  readonly emptyMessage?: string
  readonly className?: string
  readonly pagination?: PaginationProps
  readonly sort?: SortState
  readonly onSortChange?: (s: SortState) => void
  readonly fetching?: boolean
  readonly isLoading?: boolean
}

export function DataTable<T>(
  props: DataTableProps<T>
): ReactElement {
  const lastData = useRef<readonly T[]>(props.data)
  const [displayData, setDisplayData] = useState<readonly T[]>(props.data)

  useEffect(() => {
    const isFetching = props.fetching || props.isLoading
    if (!isFetching && props.data) {
      setDisplayData(props.data)
      if (props.data.length > 0) {
        lastData.current = props.data
      }
    }
  }, [props.data, props.fetching, props.isLoading])

  const isActuallyFetching = props.fetching || props.isLoading
  const showInitialLoading = props.isLoading && (!props.data || props.data.length === 0)
  const renderData = isActuallyFetching ? lastData.current : displayData

  const onSort = (key: string): void => {
    if (!props.onSortChange) return
    const cur = props.sort?.key === key
      ? props.sort.direction
      : null
    props.onSortChange({
      key,
      direction: cycleSortDirection(cur),
    })
  }

  return (
    <div 
      data-testid="data-table-wrapper"
      data-fetching={String(isActuallyFetching)}
      className={clsx(
        s.w,
        props.className,
        s.trBody,
        isActuallyFetching && s.trFetching
      )}
    >
      <div className={s.sc}>
        <div className={s.al}>
          <div className={clsx(s.b, s.bD)}>
            <table className={s.t}>
              <thead className={s.th}>
                <tr>
                  {props.columns.map((col) => {
                    const sortable = Boolean(col.sortValue)
                    const active = props.sort?.key === col.key
                    const widthClass = col.width ? widths[col.width] : undefined
                    return (
                      <th
                        key={col.key}
                        scope="col"
                        style={widthClass ? { width: widthClass } : undefined}
                        className={clsx(
                          s.thC,
                          s.thCol,
                          col.className,
                          sortable && s.thSort
                        )}
                        title={col.header}
                        onClick={
                          sortable
                            ? () => onSort(col.key)
                            : undefined
                        }
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="truncate">{col.header}</span>
                          {sortable && (
                            <SortIndicator
                              direction={
                                active
                                  ? props.sort!.direction
                                  : null
                              }
                            />
                          )}
                        </div>
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <DataTableBody
                data={renderData}
                columns={props.columns}
                keyExtractor={props.keyExtractor}
                emptyMessage={
                  showInitialLoading
                    ? 'Loading...'
                    : (props.emptyMessage ?? 'No data available')
                }
              />
            </table>
          </div>
        </div>
      </div>
      {props.pagination && (
        <DataTablePagination {...props.pagination} />
      )}
    </div>
  )
}
