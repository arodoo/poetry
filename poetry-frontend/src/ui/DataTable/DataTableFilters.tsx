/*
 * File: DataTableFilters.tsx
 * Purpose: Renders dropdown select filters for DataTable.
 * Each FilterDef produces a styled select element with
 * an "All" reset option and selected value tracking.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import type { FilterDef, ActiveFilters } from './FilterTypes'
import { useT } from '../../shared/i18n/useT'

interface Props {
  readonly filters: readonly FilterDef[]
  readonly active: ActiveFilters
  readonly onChange: (key: string, value: string) => void
}

const selectCls =
  'px-3 py-2 rounded-lg text-sm ' +
  'border border-[var(--color-border,#d0d0d0)] ' +
  'bg-[var(--color-surface,#fff)] ' +
  'text-[var(--color-text,#1a1a1a)] ' +
  'focus:outline-none focus:ring-2 ' +
  'focus:ring-[var(--color-primary,#6366f1)] ' +
  'focus:border-transparent transition-shadow'

export function DataTableFilters(
  props: Props
): ReactElement {
  const t = useT()
  return (
    <>
      {props.filters.map(
        (def: FilterDef): ReactElement => (
          <select
            key={def.key}
            value={props.active[def.key] ?? ''}
            onChange={(
              e: ChangeEvent<HTMLSelectElement>
            ): void => {
              props.onChange(def.key, e.target.value)
            }}
            className={selectCls}
            data-testid={`table-filter-${def.key}`}
          >
            <option value="">
              {def.label}: {t('ui.table.filter.all')}
            </option>
            {def.options.map(
              (opt): ReactElement => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              )
            )}
          </select>
        )
      )}
    </>
  )
}
