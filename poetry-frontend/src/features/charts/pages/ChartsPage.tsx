/*
 * File: ChartsPage.tsx
 * Purpose: Main container page rendering the dashboard charts grid.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../shared/i18n/useT'
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery'
import { UsersByStatusChart } from '../components/UsersByStatusChart'
import { FingerprintsOverTimeChart } from '../components/FingerprintsOverTimeChart'
import { MembershipsByStatusChart } from '../components/MembershipsByStatusChart'
import { EventsByTypeChart } from '../components/EventsByTypeChart'
import { SubscriptionsByDurationChart } from '../components/SubscriptionsByDurationChart'

import { SellerCodesByStatusChart } from '../components/SellerCodesByStatusChart'
import { BirthdaysThisMonthChart } from '../components/BirthdaysThisMonthChart'
import { MostActiveHoursChart } from '../components/MostActiveHoursChart'
import { MostPopulatedRegionsChart } from '../components/MostPopulatedRegionsChart'

import type { ReactElement } from 'react'

export function ChartsPage(): ReactElement {
  const t = useT()
  const { data, isLoading, isError } = useChartsMetricsQuery()

  if (isLoading) {
    return (
      <div className="p-8 text-center text-[var(--color-text)]">
        {t('ui.common.loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">{t('ui.common.error')}</div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        {t('ui.route.charts.title')}
      </h1>
      <div
        data-testid="charts-grid"
        className="grid auto-rows-[350px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <UsersByStatusChart data={data?.usersByStatus ?? {}} />
        <BirthdaysThisMonthChart data={data?.birthdaysThisMonth ?? {}} />
        <MostActiveHoursChart
          data={data?.activeHours ?? {}}
          daysData={data?.activeDaysOfWeek ?? {}}
        />
        <MostPopulatedRegionsChart data={data?.populatedRegions ?? {}} />
        <FingerprintsOverTimeChart data={data?.enrollmentsOverTime ?? {}} />
        <MembershipsByStatusChart data={data?.membershipsByStatus ?? {}} />
        <EventsByTypeChart data={data?.eventsByType ?? {}} />
        <SubscriptionsByDurationChart
          data={data?.subscriptionsByDuration ?? {}}
        />
        <SellerCodesByStatusChart data={data?.sellerCodesByStatus ?? {}} />
      </div>
    </div>
  )
}
