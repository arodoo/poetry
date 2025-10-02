/*
 * File: DataTable.tsx
 * Purpose: Modern, reusable data table with responsive design.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'
import { s } from './DataTableStyles'

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
}

export function DataTable<T>(props: DataTableProps<T>): ReactElement {
  const hasData: boolean = props.data.length > 0
  return (
    <div className={clsx(s.w, props.className)}>
      <div className={s.sc}>
        <div className={s.al}>
          <div className={clsx(s.b, s.bD)}>
            <table className={s.t}>
              <thead className={s.th}>
                <tr>
                  {props.columns.map(
                    (col: DataTableColumn<T>): ReactElement => (
                      <th
                        key={col.key}
                        scope="col"
                        className={clsx(s.thC, s.thCol, col.className)}
                      >
                        {col.header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className={clsx(s.tb, s.tbD)}>
                {hasData ? (
                  props.data.map(
                    (row: T): ReactElement => (
                      <tr key={props.keyExtractor(row)} className={s.tr}>
                        {props.columns.map(
                          (col: DataTableColumn<T>): ReactElement => (
                            <td key={col.key} className={clsx(s.td, s.tdCol)}>
                              {col.accessor(row)}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={props.columns.length} className={s.em}>
                      {props.emptyMessage ?? 'No data available'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
