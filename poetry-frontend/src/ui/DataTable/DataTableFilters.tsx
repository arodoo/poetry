/*
 * File: DataTableFilters.tsx
 * Purpose: Renders searchable dropdown filters for DataTable.
 * Each FilterDef produces a SearchableSelect component with
 * an "All" reset option and selected value tracking.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import type { FilterDef, ActiveFilters } from './FilterTypes'
import { useT } from '../../shared/i18n/useT'
import { SearchableSelect } from '../SearchableSelect/SearchableSelect'
import type { SelectOption } from '../SearchableSelect/SearchableSelect.types'

interface Props {
  readonly filters: readonly FilterDef[]
  readonly active: ActiveFilters
  readonly onChange: (key: string, value: string) => void
}

function FilterItem(p: {
  def: FilterDef
  value: string
  onChange: (key: string, value: string) => void
  allLabel: string
}): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: '', label: `${p.def.label}: ${p.allLabel}` },
      ...p.def.options.map((o) => ({ value: o.value, label: o.label })),
    ],
    [p.def, p.allLabel]
  )

  return (
    <SearchableSelect
      options={options}
      value={p.value}
      onChange={(v: string): void => {
        p.onChange(p.def.key, v)
      }}
      searchable={false}
      data-testid={`table-filter-${p.def.key}`}
    />
  )
}

export function DataTableFilters(props: Props): ReactElement {
  const t = useT()
  const allLabel = t('ui.table.filter.all')
  return (
    <>
      {props.filters.map(
        (def: FilterDef): ReactElement => (
          <FilterItem
            key={def.key}
            def={def}
            value={props.active[def.key] ?? ''}
            onChange={props.onChange}
            allLabel={allLabel}
          />
        )
      )}
    </>
  )
}
