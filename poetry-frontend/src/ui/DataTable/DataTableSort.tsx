/*
 * File: DataTableSort.tsx
 * Purpose: Renders a sort selection dropdown for DataTable.
 * Allows users to choose which column to sort by and toggles 
 * between ascending and descending order. Supports locale-aware labels.
 * All Rights Reserved Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import type { SortableColumn, SortState, SortDirection } from './SortTypes'
import { useT } from '../../shared/i18n/useT'

interface Props<T> {
  readonly columns: readonly SortableColumn<T>[]
  readonly sort: SortState
  readonly onChange: (s: SortState) => void
}

const selectCls =
  'px-3 py-2 rounded-lg text-sm ' +
  'border border-[var(--color-border,#d0d0d0)] ' +
  'bg-[var(--color-surface,#fff)] ' +
  'text-[var(--color-text,#1a1a1a)] ' +
  'focus:outline-none focus:ring-2 ' +
  'focus:ring-[var(--color-primary,#6366f1)] ' +
  'focus:border-transparent transition-shadow'

export function DataTableSort<T>(
  props: Props<T>
): ReactElement | null {
  const t = useT()
  const sortableColumns = props.columns.filter(c => c.sortValue)
  
  if (sortableColumns.length === 0) return null

  const onColumnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const key = e.target.value
    if (!key) {
      props.onChange({ key: '', direction: null })
      return
    }
    // Default to desc when picking a new column as per user request
    props.onChange({ key, direction: 'desc' })
  }

  const toggleDirection = (): void => {
    const nextDir: SortDirection = 
      props.sort.direction === 'desc' ? 'asc' : 'desc'
    props.onChange({ ...props.sort, direction: nextDir })
  }

  return (
    <div className="flex items-center gap-2">
      <select
        value={props.sort.key}
        onChange={onColumnChange}
        className={selectCls}
        data-testid="table-sort-column"
      >
        <option value="">{t('ui.table.sort.none')}</option>
        {sortableColumns.map(col => (
          <option key={col.key} value={col.key}>
            {t('ui.table.sort.by')}: {col.header}
          </option>
        ))}
      </select>
      
      {props.sort.key && (
        <button
          onClick={toggleDirection}
          className={selectCls}
          title={t('ui.table.sort.toggle')}
          data-testid="table-sort-direction"
        >
          {props.sort.direction === 'desc' ? '↓' : '↑'}
        </button>
      )}
    </div>
  )
}
