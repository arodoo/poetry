/*
 * File: TableCheckboxList.tsx
 * Purpose: Checkbox grid for selecting database tables to export.
 * Displays table names with row counts and provides a select-all
 * toggle for convenience in the Excel export section.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { TableInfo } from '../model/dbManagementTypes'

interface Props {
  readonly tables: TableInfo[]
  readonly selected: string[]
  readonly onToggle: (name: string) => void
  readonly onToggleAll: () => void
}

export function TableCheckboxList({
  tables,
  selected,
  onToggle,
  onToggleAll,
}: Props): ReactElement {
  const t = useT()
  const allSelected: boolean = selected.length === tables.length
  return (
    <div data-testid="table-checkbox-list">
      <label className="flex items-center gap-2 mb-3 font-medium">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onToggleAll}
          data-testid="select-all-tables"
        />
        {t('ui.dbManagement.excel.selectAll')}
      </label>
      <div className="grid grid-cols-2 gap-2">
        {tables.map((tbl: TableInfo) => (
          <label key={tbl.name} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(tbl.name)}
              onChange={() => onToggle(tbl.name)}
            />
            <span>{tbl.name}</span>
            <span className="text-[var(--color-textMuted)]">
              ({tbl.rowCount})
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
