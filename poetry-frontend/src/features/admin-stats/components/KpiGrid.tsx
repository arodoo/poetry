/**
 * File: KpiGrid.tsx
 * Purpose: Grid layout of KPI cards using SDK types.
 * Uses MembershipStatsResponse from generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */

import { SimpleGrid } from '@mantine/core';
import { KpiCard } from './KpiCard';
import type { MembershipStatsResponse } from '../model/StatsSchemas';

interface KpiGridProps {
  stats: MembershipStatsResponse;
}

export function KpiGrid({ stats }: KpiGridProps) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
      <KpiCard label="Activas" value={stats.active ?? 0} color="green" />
      <KpiCard label="Por vencer" value={stats.expiringSoon ?? 0} color="yellow" />
      <KpiCard label="Vencidas" value={stats.expired ?? 0} color="red" />
      <KpiCard label="Total" value={stats.total ?? 0} color="gray" />
    </SimpleGrid>
  );
}
