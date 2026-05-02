/*
 * File: ChartsGrid.tsx
 * Purpose: Arranges admin user insights and charts.
 * It separates page composition from metric cards.
 * User growth receives a wide first chart row.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  AdminInsightStrip,
} from '../admin/AdminInsightStrip'
import { ChartsFeatured } from './ChartsFeatured'
import { ChartsStandardGrid } from './ChartsStandardGrid'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

const GRID_CLASS = [
  'grid grid-cols-1 gap-8',
  'xl:grid-cols-2',
].join(' ')
const WRAPPER_CLASS = 'flex flex-col gap-8'

export function ChartsGrid({
  data,
}: ChartsGridDataProps): ReactElement {
  return (
    <div
      data-testid="charts-grid"
      className={WRAPPER_CLASS}
    >
      <AdminInsightStrip data={data} />
      <div className={GRID_CLASS}>
        <ChartsFeatured data={data} />
        <ChartsStandardGrid data={data} />
      </div>
    </div>
  )
}