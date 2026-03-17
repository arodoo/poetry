/*
 * File: AutoBackupSection.tsx
 * Purpose: Displays auto backups in a DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Text } from '../../../ui/Text/Text'
import { DataTable } from '../../../ui/DataTable/DataTable'
import { DataTableControls } from '../../../ui/DataTable/DataTableControls'
import { useT } from '../../../shared/i18n/useT'
import { useAutoBackupsQuery } from '../hooks/useAutoBackupsQuery'
import { useAutoBackupActions } from '../hooks/useAutoBackupActions'
import {
  buildAutoBackupColumns,
  type AutoBackupRow,
} from '../model/autoBackupColumns'
import { toSortParam, type SortState } from '../../../ui/DataTable/SortTypes'
import { DeleteBackupConfirmDialog } from './DeleteBackupConfirmDialog'
import { RestoreToBackupConfirmDialog } from './RestoreToBackupConfirmDialog'

export function AutoBackupSection(): ReactElement {
  const t = useT()
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<SortState>({
    key: 'generatedAt',
    direction: 'desc',
  })
  const {
    del,
    setDel,
    rst,
    setRst,
    handleDownload,
    handleDelete,
    handleRestore,
  } = useAutoBackupActions()
  const q = useAutoBackupsQuery(0, 10, search, toSortParam(sort))
  const data: AutoBackupRow[] = q.data?.content ?? []
  const cols = buildAutoBackupColumns(
    handleDownload,
    (i, n) => {
      setDel({ id: i, name: n })
    },
    (i, n) => {
      setRst({ id: i, name: n })
    }
  )
  const p = q.data
  const pg = {
    currentPage: p?.number ?? 0,
    pageSize: p?.size ?? 10,
    totalElements: p?.totalElements ?? 0,
    totalPages: p?.totalPages ?? 0,
    onPageChange: () => undefined,
    onPageSizeChange: () => undefined,
  }
  return (
    <Card padding="md" data-testid="auto-backup-section">
      <Text className="text-[var(--color-textMuted)] whitespace-normal mb-4">
        {t('ui.dbManagement.autoBackup.description')}
      </Text>
      <div className="mb-4">
        <DataTableControls
          search={{ value: search, onSearchChange: setSearch }}
          columns={cols}
        />
      </div>
      <DataTable
        columns={cols}
        data={data}
        keyExtractor={(r: AutoBackupRow) => String(r.id)}
        emptyMessage={t('ui.autoBackup.empty')}
        sort={sort}
        onSortChange={setSort}
        isLoading={q.isLoading}
        fetching={q.isFetching}
        pagination={pg}
      />
      {del && (
        <DeleteBackupConfirmDialog
          open
          fileName={del.name}
          onConfirm={() => {
            void handleDelete()
          }}
          onCancel={() => {
            setDel(null)
          }}
        />
      )}
      {rst && (
        <RestoreToBackupConfirmDialog
          open
          fileName={rst.name}
          onConfirm={() => {
            void handleRestore()
          }}
          onCancel={() => {
            setRst(null)
          }}
        />
      )}
    </Card>
  )
}
