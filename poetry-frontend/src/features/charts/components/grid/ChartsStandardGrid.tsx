/*
 * File: ChartsStandardGrid.tsx
 * Purpose: Renders secondary user chart groups.
 * It keeps the main grid component small.
 * People and activity cards own their own rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  RecentUserActivityCard,
} from '../admin/RecentUserActivityCard'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'
import { ChartsPeopleGrid } from './ChartsPeopleGrid'
import { ChartTile } from './ChartTile'

export function ChartsStandardGrid(
  props: ChartsGridDataProps
): ReactElement {
  return (
    <>
      <ChartsPeopleGrid data={props.data} />
      <ChartTile wide>
        <RecentUserActivityCard
          logs={props.data?.recentAccessLogs ?? []}
        />
      </ChartTile>
    </>
  )
}