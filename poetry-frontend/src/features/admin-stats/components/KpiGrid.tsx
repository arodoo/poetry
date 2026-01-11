/**
 * File: KpiGrid.tsx
 * Purpose: Grid layout of KPI cards using SDK types and i18n
 * translation keys. Displays membership statistics with colors.
 * All Rights Reserved. Arodi Emmanuel
 */

import { SimpleGrid } from '@mantine/core';
import { KpiCard } from './KpiCard';
import { useT } from '../../../shared/i18n/useT';
import type { MembershipStatsResponse } from '../model/StatsSchemas';

interface KpiGridProps {
  stats: MembershipStatsResponse;
}

export function KpiGrid({ stats }: KpiGridProps) {
  const t = useT();
  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
      <KpiCard label={t('ui.adminStats.kpi.active')} value={stats.active ?? 0} color="green" />
      <KpiCard label={t('ui.adminStats.kpi.expiringSoon')} value={stats.expiringSoon ?? 0} color="yellow" />
      <KpiCard label={t('ui.adminStats.kpi.expired')} value={stats.expired ?? 0} color="red" />
      <KpiCard label={t('ui.adminStats.kpi.total')} value={stats.total ?? 0} color="gray" />
    </SimpleGrid>
  );
}
