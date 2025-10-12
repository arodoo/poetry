/*
 * File: DataTableBody.tsx
 * Purpose: Table body rendering with data rows or empty message.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import clsx from 'clsx'
import { s } from './DataTableStyles'

interface Column<T> {
  readonly key: string
  readonly accessor: (row: T) => ReactNode
  readonly className?: string
}

interface Props<T> {
  readonly data: readonly T[]
  readonly columns: readonly Column<T>[]
  readonly keyExtractor: (row: T) => string
  readonly emptyMessage?: string
}

export function DataTableBody<T>(props: Props<T>): ReactElement {
  const hasData = props.data.length > 0
  return (
    <tbody className={clsx(s.tb, s.tbD)}>
      {hasData ? (
        props.data.map(
          (row: T): ReactElement => (
            <tr key={props.keyExtractor(row)} className={s.tr}>
              {props.columns.map(
                (col: Column<T>): ReactElement => (
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
  )
}
