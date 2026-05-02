/*
 * File: AdminInsightStrip.tsx
 * Purpose: Shows top-level user insights for admins.
 * It keeps the chart page immediately actionable.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import type {
  ChartsGridDataProps,
} from '../grid/ChartsGridDataProps'
import { AdminInsightCard } from './AdminInsightCard'
import { buildAdminInsights } from './adminInsightData'

const STRIP_CLASS = [
  'grid grid-cols-1 gap-4',
  'md:grid-cols-2',
  'xl:grid-cols-4',
].join(' ')

export function AdminInsightStrip({
  data,
}: ChartsGridDataProps): ReactElement {
  const t = useT()
  const insights = buildAdminInsights(data, t)
  return (
    <section
      aria-label={t('ui.charts.admin.overview')}
      className={STRIP_CLASS}
    >
      {insights.map((insight) => (
        <AdminInsightCard
          key={insight.key}
          insight={insight}
        />
      ))}
    </section>
  )
}