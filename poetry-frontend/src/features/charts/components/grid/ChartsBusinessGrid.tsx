/*
 * File: ChartsBusinessGrid.tsx
 * Purpose: Renders operations and commerce chart tiles.
 * It keeps non-people dashboard metrics grouped together.
 * Each tile keeps a stable height for Recharts.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  MembershipsByStatusChart,
} from '../MembershipsByStatusChart'
import { EventsByTypeChart } from '../EventsByTypeChart'
import {
  SubscriptionsByDurationChart,
} from '../SubscriptionsByDurationChart'
import {
  SellerCodesByStatusChart,
} from '../SellerCodesByStatusChart'
import { ChartTile } from './ChartTile'
import type {
  ChartsGridDataProps,
} from './ChartsGridDataProps'

export function ChartsBusinessGrid({
  data,
}: ChartsGridDataProps): ReactElement {
  const membershipsByStatus =
    data?.membershipsByStatus ?? {}
  const eventsByType = data?.eventsByType ?? {}
  const subscriptionsByDuration =
    data?.subscriptionsByDuration ?? {}
  const sellerCodesByStatus =
    data?.sellerCodesByStatus ?? {}

  return (
    <>
      <ChartTile>
        <MembershipsByStatusChart
          data={membershipsByStatus}
        />
      </ChartTile>
      <ChartTile>
        <EventsByTypeChart data={eventsByType} />
      </ChartTile>
      <ChartTile>
        <SubscriptionsByDurationChart
          data={subscriptionsByDuration}
        />
      </ChartTile>
      <ChartTile>
        <SellerCodesByStatusChart
          data={sellerCodesByStatus}
        />
      </ChartTile>
    </>
  )
}