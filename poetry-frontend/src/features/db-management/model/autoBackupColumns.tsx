/*
 * File: autoBackupColumns.tsx
 * Purpose: Column definitions for auto backup DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { AutoBackupActions } from '../components/AutoBackupActions'

export interface AutoBackupRow {
  id: number
  fileName: string
  sizeBytes: number
  generatedAt: number
}

type ActionCb = (id: number, name: string) => void | Promise<void>

export function buildAutoBackupColumns(
  onDownload: ActionCb,
  onDelete: ActionCb,
  onRestore: ActionCb
): readonly DataTableColumn<AutoBackupRow>[] {
  const handleDownload = (id: number, name: string): void => {
    void onDownload(id, name)
  }
  const handleRestore = (id: number, name: string): void => {
    void onRestore(id, name)
  }
  const handleDelete = (id: number, name: string): void => {
    void onDelete(id, name)
  }
  return [
    {
      key: 'fileName',
      header: 'Archivo',
      width: 'xl',
      accessor: (r: AutoBackupRow) => r.fileName,
      sortValue: (r: AutoBackupRow) => r.fileName,
    },
    {
      key: 'generatedAt',
      header: 'Generado',
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
          onDownload={handleDownload}
          onRestore={handleRestore}
          onDelete={handleDelete}
        />
      ),
    },
  ]
}

function formatDateTime(timestamp: number): string {
  if (!timestamp) return '-'
  const d = new Date(timestamp)
  if (isNaN(d.getTime())) return '-'
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${day}-${month}-${year} ${hour}:${min}`
}
