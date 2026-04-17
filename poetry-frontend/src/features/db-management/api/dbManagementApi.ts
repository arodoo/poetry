/*
 * File: dbManagementApi.ts
 * Purpose: API wrapper functions for database management feature.
 * Provides typed functions for listing tables, exporting Excel,
 * downloading backups, and uploading restore files.
 * All Rights Reserved. Arodi Emmanuel
 */

import { fetchJson } from '../../../shared/http/fetchClient'
import { fetchBlob } from './fetchBlob'
import { uploadMultipart } from './uploadMultipart'
import type { TableInfo, RestoreResult } from '../model/dbManagementTypes'

const BASE = '/api/v1/db-management'

export async function fetchTableList(): Promise<TableInfo[]> {
  return fetchJson<TableInfo[]>(`${BASE}/tables`)
}

export async function exportExcelBlob(tables: string[]): Promise<Blob> {
  const query: string =
    tables.length > 0 ? `?tables=${tables.join(',')}` : '?tables=all'
  return fetchBlob(`${BASE}/export/excel${query}`)
}

export async function downloadBackupBlob(): Promise<Blob> {
  return fetchBlob(`${BASE}/backup`)
}

export async function uploadRestore(file: File): Promise<RestoreResult> {
  return uploadMultipart<RestoreResult>(`${BASE}/restore`, file)
}
