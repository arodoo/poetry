/*
 * File: ChartsFeatured.tsx
 * Purpose: Renders the primary chart in a wide tile.
 * It isolates the first-row layout from the charts page.
 * The metric component still owns chart-specific rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  MostActiveHoursChart,
} from '../MostActiveHoursChart'
import { ChartTile } from './ChartTile'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

export function ChartsFeatured({
  data,
}: ChartsGridDataProps): ReactElement {
  return (
    <ChartTile wide>
      <MostActiveHoursChart
        data={data?.activeHours ?? {}}
        daysData={data?.activeDaysOfWeek ?? {}}
      />
    </ChartTile>
  )
}