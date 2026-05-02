/*
 * File: RecentUserActivityCard.tsx
 * Purpose: Lists recent user access activity for admins.
 * It turns raw access logs into a people-centered tool.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import {
  formatDateTime,
} from '../../../../shared/utils/dateUtils'
import type {
  AccessLogRecord,
} from '../../model/ChartsSchemas'
import { ChartCard } from '../shared/ChartCard'

const ROW_CLASS = [
  'grid gap-2 py-3',
  'md:grid-cols-[1fr_1fr_auto]',
].join(' ')

interface RecentUserActivityCardProps {
  readonly logs: AccessLogRecord[]
}

export function RecentUserActivityCard({
  logs,
}: RecentUserActivityCardProps): ReactElement {
  const t = useT()
  const rows = logs.slice(0, 6)
  return (
    <ChartCard title={t('ui.charts.admin.recentActivity')}>
      {rows.length === 0 ? (
        <p className="text-sm text-textMuted">
          {t('ui.charts.admin.recentActivityEmpty')}
        </p>
      ) : (
        <div className="divide-y divide-border">
          {rows.map((log) => (
            <div
              key={String(log.id)}
              className={ROW_CLASS}
            >
              <span className="font-medium text-text">
                {log.userName}
              </span>
              <span className="text-sm text-textMuted">
                {log.email}
              </span>
              <span className="text-sm text-textMuted">
                {formatDateTime(log.timestamp)}
              </span>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  )
}