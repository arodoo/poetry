/*
 * File: DataTable.tsx
 * Purpose: Modern, reusable data table with responsive
 * design, server-side sorting, and filter dropdowns.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import clsx from 'clsx'
import { s } from './DataTableStyles'
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
}

export function DataTable<T>(
  props: DataTableProps<T>
): ReactElement {
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
    <div className={clsx(s.w, props.className)}>
      <div className={s.sc}>
        <div className={s.al}>
          <div className={clsx(s.b, s.bD)}>
            <table className={s.t}>
              <thead className={s.th}>
                <tr>
                  {props.columns.map((col) => {
                    const sortable = Boolean(
                      col.sortValue
                    )
                    const active =
                      props.sort?.key === col.key
                    return (
                      <th
                        key={col.key}
                        scope="col"
                        className={clsx(
                          s.thC,
                          s.thCol,
                          col.className,
                          sortable && s.thSort
                        )}
                        onClick={
                          sortable
                            ? () => onSort(col.key)
                            : undefined
                        }
                      >
                        {col.header}
                        {sortable && (
                          <SortIndicator
                            direction={
                              active
                                ? props.sort!.direction
                                : null
                            }
                          />
                        )}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <DataTableBody
                data={props.data}
                columns={props.columns}
                keyExtractor={props.keyExtractor}
                emptyMessage={
                  props.emptyMessage ??
                  'No data available'
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
