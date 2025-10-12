/*
 * File: PageControls.tsx
 * Purpose: Navigation and size selection controls for pagination.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../shared/i18n/useT'

interface Props {
  readonly currentPage: number
  readonly pageSize: number
  readonly hasPrev: boolean
  readonly hasNext: boolean
  readonly onPageChange: (page: number) => void
  readonly onPageSizeChange: (size: number) => void
}

const SIZES: readonly number[] = [10, 25, 50, 100]

export function PageControls(props: Props): ReactElement {
  const t = useT()
  return (
    <div className="flex items-center gap-4">
      <select
        value={props.pageSize}
        onChange={(e) => {
          props.onPageSizeChange(Number(e.target.value))
        }}
        className="text-sm bg-surface-base border px-2 py-1"
      >
        {SIZES.map((s) => (
          <option key={s} value={s}>
            {s} {t('ui.table.pagination.perPage')}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          props.onPageChange(props.currentPage - 1)
        }}
        disabled={!props.hasPrev}
        className="px-3 py-1 bg-surface-base border disabled:opacity-50"
      >
        {t('ui.table.pagination.previous')}
      </button>
      <span className="text-sm">
        {t('ui.table.pagination.page')} {props.currentPage + 1}
      </span>
      <button
        onClick={() => {
          props.onPageChange(props.currentPage + 1)
        }}
        disabled={!props.hasNext}
        className="px-3 py-1 bg-surface-base border disabled:opacity-50"
      >
        {t('ui.table.pagination.next')}
      </button>
    </div>
  )
}
