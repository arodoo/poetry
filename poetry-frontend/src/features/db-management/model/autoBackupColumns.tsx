/*
 * File: autoBackupColumns.tsx
 * Purpose: Column definitions for auto backup DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { AutoBackupActions } from '../components/AutoBackupActions'
import { formatDateTime } from '../../../shared/utils/dateUtils'

export interface AutoBackupRow {
  id: number
  fileName: string
  sizeBytes: number
  generatedAt: number
}

type TFn = (key: string) => string
type ActionCb = (id: number, name: string) => void | Promise<void>

export function buildAutoBackupColumns(
  t: TFn,
  onDownload: ActionCb,
  onDelete: ActionCb,
  onRestore: ActionCb
): readonly DataTableColumn<AutoBackupRow>[] {
  const dl = (i: number, n: string): void => {
    void onDownload(i, n)
  }
  const rs = (i: number, n: string): void => {
    void onRestore(i, n)
  }
  const rm = (i: number, n: string): void => {
    void onDelete(i, n)
  }
  return [
    {
      key: 'fileName',
      header: t('ui.autoBackup.columns.fileName'),
      width: 'xl',
      accessor: (r: AutoBackupRow) => r.fileName,
      sortValue: (r: AutoBackupRow) => r.fileName,
    },
    {
      key: 'generatedAt',
      header: t('ui.autoBackup.columns.generatedAt'),
      width: 'lg',
      accessor: (r: AutoBackupRow) => formatDateTime(r.generatedAt),
      sortValue: (r: AutoBackupRow) => r.generatedAt,
    },
    {
      key: 'actions',
      header: '',
      width: 'xl',
      accessor: (r: AutoBackupRow): ReactElement => (
        <AutoBackupActions
          id={r.id}
          fileName={r.fileName}
          onDownload={dl}
          onRestore={rs}
          onDelete={rm}
        />
      ),
    },
  ]
}
