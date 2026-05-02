/*
 * File: ChartsGridDataProps.ts
 * Purpose: Shares data props for chart grid groups.
 * It keeps dashboard group components consistent.
 * The type stays close to grid composition code.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  DashboardMetrics,
} from '../../model/ChartsSchemas'

export interface ChartsGridDataProps {
  readonly data: DashboardMetrics | undefined
}