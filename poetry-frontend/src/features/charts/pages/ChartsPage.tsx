/*
 * File: ChartsPage.tsx
 * Purpose: Main container page rendering the dashboard charts grid.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../shared/i18n/useT';
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery';
import { UsersByStatusChart } from '../components/UsersByStatusChart';
import { FingerprintsOverTimeChart } from '../components/FingerprintsOverTimeChart';
import { MembershipsByStatusChart } from '../components/MembershipsByStatusChart';
import { TokenStatusChart } from '../components/TokenStatusChart';
import { EventsByTypeChart } from '../components/EventsByTypeChart';
import { SubscriptionsByDurationChart } from '../components/SubscriptionsByDurationChart';
import { ScheduledEventsByStatusChart } from '../components/ScheduledEventsByStatusChart';
import { SellerCodesByStatusChart } from '../components/SellerCodesByStatusChart';
import { ZonesConfigurationChart } from '../components/ZonesConfigurationChart';
import { ThemeUsageChart } from '../components/ThemeUsageChart';

export function ChartsPage() {
  const t = useT();
  const { data, isLoading, isError } = useChartsMetricsQuery();

  if (isLoading) {
    return <div className="p-8 text-center text-[var(--color-text)]">{t('ui.common.loading')}</div>;
  }

  if (isError) {
    return <div className="p-8 text-center text-red-500">{t('ui.common.error')}</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        {t('ui.route.charts.title')}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UsersByStatusChart data={data?.usersByStatus} />
        <FingerprintsOverTimeChart data={data?.enrollmentsOverTime} />
        <MembershipsByStatusChart data={data?.membershipsByStatus} />
        <TokenStatusChart data={data?.tokenStatus} />
        <EventsByTypeChart data={data?.eventsByType} />
        <SubscriptionsByDurationChart data={data?.subscriptionsByDuration} />
        <ScheduledEventsByStatusChart data={data?.scheduledEventsByStatus} />
        <SellerCodesByStatusChart data={data?.sellerCodesByStatus} />
        <ZonesConfigurationChart data={data?.zonesConfiguration} />
        <ThemeUsageChart data={data?.themeUsage} />
      </div>
    </div>
  );
}
