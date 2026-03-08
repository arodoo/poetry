/*
 * File: PageControls.tsx
 * Purpose: Navigation and size selection controls for pagination.
 * Uses SearchableSelect for the page size picker.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { useT } from '../../shared/i18n/useT'
import { SearchableSelect } from '../SearchableSelect/SearchableSelect'
import type { SelectOption } from '../SearchableSelect/SearchableSelect.types'

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
  const perPageLabel = t('ui.table.pagination.perPage')

  const sizeOptions: SelectOption[] = useMemo(
    () => SIZES.map((s) => ({ value: String(s), label: `${s} ${perPageLabel}` })),
    [perPageLabel]
  )

  return (
    <div className="flex items-center gap-4">
      <div className="w-40">
        <SearchableSelect
          options={sizeOptions}
          value={String(props.pageSize)}
          onChange={(v: string): void => {
            props.onPageSizeChange(Number(v))
          }}
          searchable={false}
          data-testid="page-size-select"
        />
      </div>
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
