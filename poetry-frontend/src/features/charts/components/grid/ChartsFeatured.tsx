/*
 * File: ChartsFeatured.tsx
 * Purpose: Renders the primary growth chart in a wide tile.
 * It isolates the first-row layout from the charts page.
 * The metric component still owns chart-specific rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  FingerprintsOverTimeChart,
} from '../FingerprintsOverTimeChart'
import { ChartTile } from './ChartTile'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

export function ChartsFeatured({
  data,
}: ChartsGridDataProps): ReactElement {
  return (
    <ChartTile wide>
      <FingerprintsOverTimeChart
        data={data?.enrollmentsOverTime ?? {}}
      />
    </ChartTile>
  )
}