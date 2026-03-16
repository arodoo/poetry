/*
 * File: useExcelExport.ts
 * Purpose: React Query mutation hook for triggering Excel export
 * of selected database tables. Downloads the resulting xlsx
 * file via blob URL on successful response.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import { exportExcelBlob } from '../api/dbManagementApi'
import { downloadBlob } from '../api/downloadBlob'

export function useExcelExport() {
  return useMutation({
    mutationFn: async (tables: string[]) => {
      const blob: Blob =
        await exportExcelBlob(tables)
      downloadBlob(blob, 'poetry-export.xlsx')
    },
  })
}
