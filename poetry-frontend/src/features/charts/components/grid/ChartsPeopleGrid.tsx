/*
 * File: ChartsPeopleGrid.tsx
 * Purpose: Renders user-focused chart tiles.
 * It groups identity, membership and regional metrics.
 * Each tile keeps a stable height for Recharts.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UsersByStatusChart } from '../UsersByStatusChart'
import {
  MembershipsByStatusChart,
} from '../MembershipsByStatusChart'
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
  const membershipsByStatus =
    data?.membershipsByStatus ?? {}

  return (
    <>
      <ChartTile>
        <UsersByStatusChart data={usersByStatus} />
      </ChartTile>
      <ChartTile>
        <MembershipsByStatusChart
          data={membershipsByStatus}
        />
      </ChartTile>
      <ChartTile>
        <MostPopulatedRegionsChart
          data={populatedRegions}
        />
      </ChartTile>
      <ChartTile>
        <BirthdaysThisMonthChart
          data={birthdaysThisMonth}
        />
      </ChartTile>
    </>
  )
}