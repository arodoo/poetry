/*
 * File: DataTable.tsx
 * Purpose: Modern, reusable data table with responsive design.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { useMemo } from 'react'
import clsx from 'clsx'
import { s } from './DataTableStyles'
import { DataTablePagination } from './DataTablePagination'
import type { PaginationProps } from './DataTablePagination'
import { DataTableBody } from './DataTableBody'
import { DataTableSearch } from './DataTableSearch'
import type { SearchProps } from './DataTableSearch'

export interface DataTableColumn<T> {
  readonly key: string
  readonly header: string
  readonly accessor: (row: T) => ReactNode
  readonly className?: string
}

export interface DataTableProps<T> {
  readonly columns: readonly DataTableColumn<T>[]
  readonly data: readonly T[]
  readonly keyExtractor: (row: T) => string
  readonly emptyMessage?: string
  readonly className?: string
  readonly pagination?: PaginationProps
  readonly search: SearchProps
}

export function DataTable<T>(props: DataTableProps<T>): ReactElement {
  const tableContent = useMemo(
    (): ReactElement => (
      <div className={s.sc}>
        <div className={s.al}>
          <div className={clsx(s.b, s.bD)}>
            <table className={s.t}>
              <thead className={s.th}>
                <tr>
                  {props.columns.map((col): ReactElement => (
                    <th
                      key={col.key}
                      scope="col"
                      className={clsx(s.thC, s.thCol, col.className)}
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <DataTableBody
                data={props.data}
                columns={props.columns}
                keyExtractor={props.keyExtractor}
                emptyMessage={props.emptyMessage ?? 'No data available'}
              />
            </table>
          </div>
        </div>
      </div>
    ),
    [props.data, props.columns, props.keyExtractor, props.emptyMessage]
  )

  return (
    <div className={clsx(s.w, props.className)}>
      <DataTableSearch {...props.search} />
      {tableContent}
      {props.pagination && <DataTablePagination {...props.pagination} />}
    </div>
  )
}
