/*
 * File: dbManagementTypes.ts
 * Purpose: TypeScript interfaces for database management feature.
 * Defines table info and restore result types matching the
 * backend DTOs for API communication.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface TableInfo {
  readonly name: string
  readonly rowCount: number
}

export interface RestoreResult {
  readonly tablesRestored: number
  readonly status: string
}
