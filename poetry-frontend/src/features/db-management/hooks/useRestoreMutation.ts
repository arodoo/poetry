/*
 * File: useRestoreMutation.ts
 * Purpose: React Query mutation hook for restoring the database
 * from an uploaded SQL backup file. Returns the restore result
 * with count of tables restored and status.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useMutation } from '@tanstack/react-query'
import { uploadRestore } from '../api/dbManagementApi'
import type { RestoreResult } from '../model/dbManagementTypes'

export function useRestoreMutation() {
  return useMutation<RestoreResult, Error, File>({
    mutationFn: (file: File) => uploadRestore(file),
  })
}
