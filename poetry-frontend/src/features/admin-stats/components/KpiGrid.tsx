/**
 * File: KpiGrid.tsx
 * Purpose: Grid layout of KPI cards showing membership statistics
 * with color coding based on business health thresholds.
 * All Rights Reserved. Arodi Emmanuel
 */

import { SimpleGrid } from '@mantine/core';
import { KpiCard } from './KpiCard';
import type { MembershipStats } from '../model/StatsSchemas';

interface KpiGridProps {
  stats: MembershipStats;
}

export function KpiGrid({ stats }: KpiGridProps) {
  return (
    <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
      <KpiCard label="Activas" value={stats.active} color="green" />
      <KpiCard label="Por vencer (7 días)" value={stats.expiringSoon} color="yellow" />
      <KpiCard label="Vencidas" value={stats.expired} color="red" />
      <KpiCard label="Total" value={stats.total} color="gray" />
    </SimpleGrid>
  );
}
