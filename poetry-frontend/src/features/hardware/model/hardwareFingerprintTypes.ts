/*
 * File: hardwareFingerprintTypes.ts
 * Purpose: Centralized types for hardware fingerprint state and components.
 * Useful for sharing types between hooks, models and components without circular dependencies.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ActiveFilters } from '../../../ui/DataTable/FilterTypes'
import type { SortState } from '../../../ui/DataTable/SortTypes'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export interface HardwareFingerprintsListState {
  page: number
  size: number
  search: string
  setPage: (p: number) => void
  setSize: (s: number) => void
  setSearch: (s: string) => void
  sort: SortState
  setSort: (s: SortState) => void
  activeFilters: ActiveFilters
  onFilterChange: (key: string, value: string) => void
  paginatedData: MergedFingerprint[]
  totalElements: number
  totalPages: number
}
