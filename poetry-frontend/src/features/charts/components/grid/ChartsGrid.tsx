/*
 * File: ChartsGrid.tsx
 * Purpose: Arranges charts into a roomy analytics grid.
 * It separates page composition from metric cards.
 * The active-hours chart receives a wide first row.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { ChartsFeatured } from './ChartsFeatured'
import { ChartsStandardGrid } from './ChartsStandardGrid'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

const GRID_CLASS = [
  'grid grid-cols-1 gap-8',
  'xl:grid-cols-2',
].join(' ')

export function ChartsGrid({
  data,
}: ChartsGridDataProps): ReactElement {
  return (
    <div data-testid="charts-grid" className={GRID_CLASS}>
      <ChartsFeatured data={data} />
      <ChartsStandardGrid data={data} />
    </div>
  )
}