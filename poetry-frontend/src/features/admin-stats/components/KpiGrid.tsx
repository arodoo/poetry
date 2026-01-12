/**
 * File: KpiGrid.tsx
 * Purpose: Grid layout of KPI cards using internal UI components.
 * Displays membership statistics with color-coded indicators.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { KpiCard } from './KpiCard'
import { useT } from '../../../shared/i18n/useT'
import type { MembershipStatsResponse } from '../model/StatsSchemas'

interface KpiGridProps {
  stats: MembershipStatsResponse
}

export function KpiGrid({ stats }: KpiGridProps): ReactElement {
  const t = useT()
  return (
    <Inline gap="md" wrap>
      <KpiCard
        label={t('ui.adminStats.kpi.active')}
        value={stats.active ?? 0}
        color="green"
        testId="kpi-card-active"
      />
      <KpiCard
        label={t('ui.adminStats.kpi.expiringSoon')}
        value={stats.expiringSoon ?? 0}
        color="yellow"
        testId="kpi-card-expiring"
      />
      <KpiCard
        label={t('ui.adminStats.kpi.expired')}
        value={stats.expired ?? 0}
        color="red"
        testId="kpi-card-expired"
      />
      <KpiCard
        label={t('ui.adminStats.kpi.total')}
        value={stats.total ?? 0}
        color="gray"
        testId="kpi-card-total"
      />
    </Inline>
  )
}
