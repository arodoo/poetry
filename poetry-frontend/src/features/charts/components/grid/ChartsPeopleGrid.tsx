/*
 * File: ChartsPeopleGrid.tsx
 * Purpose: Renders people-focused chart tiles.
 * It groups identity and regional metrics together.
 * Each tile keeps a stable height for Recharts.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UsersByStatusChart } from '../UsersByStatusChart'
import {
  FingerprintsOverTimeChart,
} from '../FingerprintsOverTimeChart'
import {
  BirthdaysThisMonthChart,
} from '../BirthdaysThisMonthChart'
import {
  MostPopulatedRegionsChart,
} from '../MostPopulatedRegionsChart'
import { ChartTile } from './ChartTile'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

export function ChartsPeopleGrid({
  data,
}: ChartsGridDataProps): ReactElement {
  const usersByStatus = data?.usersByStatus ?? {}
  const birthdaysThisMonth =
    data?.birthdaysThisMonth ?? {}
  const populatedRegions =
    data?.populatedRegions ?? {}
  const enrollmentsOverTime =
    data?.enrollmentsOverTime ?? {}

  return (
    <>
      <ChartTile>
        <UsersByStatusChart data={usersByStatus} />
      </ChartTile>
      <ChartTile>
        <BirthdaysThisMonthChart
          data={birthdaysThisMonth}
        />
      </ChartTile>
      <ChartTile>
        <MostPopulatedRegionsChart
          data={populatedRegions}
        />
      </ChartTile>
      <ChartTile>
        <FingerprintsOverTimeChart
          data={enrollmentsOverTime}
        />
      </ChartTile>
    </>
  )
}