/*
 * File: useBackupDownload.ts
 * Purpose: React Query mutation hook for triggering a full SQL
 * database backup download. Downloads the resulting sql file
 * via blob URL on successful response.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import { downloadBackupBlob } from '../api/dbManagementApi'
import { downloadBlob } from '../api/downloadBlob'

export function useBackupDownload() {
  return useMutation({
    mutationFn: async () => {
      const blob: Blob =
        await downloadBackupBlob()
      const ts: string = new Date()
        .toISOString()
        .slice(0, 10)
      downloadBlob(
        blob,
        `poetry-backup-${ts}.sql`
      )
    },
  })
}
