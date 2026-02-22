/*
 * File: HardwareFingerprintTable.tsx
 * Purpose: Presentational table for merged fingerprints.
 * Incorporates local pagination and search to mimic admin lists.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import type { MergedFingerprint } from './HardwareFingerprintTableShell'
import { DataTable } from '../../../ui/DataTable/DataTable'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'
import { buildHardwareFingerprintColumns } from '../model/hardwareFingerprintColumns'
import { useHardwareFingerprintsListState } from '../hooks/useHardwareFingerprintsListState'

interface Props {
  data: MergedFingerprint[]
}

export function HardwareFingerprintTable({ data }: Props): ReactElement {
  const t = useT()
  const state = useHardwareFingerprintsListState(data)
  const columns = buildHardwareFingerprintColumns(t)

  return (
    <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
      <h3 className="text-lg font-medium mb-4">
        {t('ui.hardware.fingerprints.title')}
      </h3>

      <div className="mb-4 flex gap-4">
        <DataTableControls
          search={{
            value: state.search,
            onSearchChange: state.setSearch,
          }}
          columns={columns}
          activeFilters={state.activeFilters}
          onFilterChange={state.onFilterChange}
        />
      </div>

      <DataTable
        columns={columns}
        data={state.paginatedData}
        keyExtractor={(row) => String(row.id)}
        emptyMessage={t('ui.hardware.fingerprints.empty')}
        sort={state.sort}
        onSortChange={state.setSort}
        pagination={{
          currentPage: state.page,
          pageSize: state.size,
          totalElements: state.totalElements,
          totalPages: state.totalPages,
          onPageChange: state.setPage,
          onPageSizeChange: state.setSize,
        }}
      />
    </div>
  )
}
