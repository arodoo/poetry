/*
 * File: ActiveHoursDetailsView.tsx
 * Purpose: Drill-through sub-dashboard for active hours combining three
 * tabs (By Hour / Busiest Days / 7-Day Trend) with the raw access logs
 * table. Tab labels are fully i18n-driven and theme-aware.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { MostActiveHoursChart } from './MostActiveHoursChart'
import { ActiveDaysChart } from './ActiveDaysChart'
import { AccessLogTrendChart } from './AccessLogTrendChart'
import { AccessLogsRawDataView } from './AccessLogsRawDataView'
import type { DashboardMetrics } from '../model/ChartsSchemas'

type TabKey = 'hour' | 'day' | 'trend'

export function ActiveHoursDetailsView({
  data,
}: {
  data: DashboardMetrics
}): ReactElement {
  const t = useT()
  const [active, setActive] = useState<TabKey>('hour')
  const tabs: { key: TabKey; label: string }[] = [
    { key: 'hour', label: t('ui.charts.tabs.byHour') },
    { key: 'day', label: t('ui.charts.tabs.busiestDays') },
    { key: 'trend', label: t('ui.charts.tabs.sevenDayTrend') },
  ]
  const tabClass = (tab: TabKey): string =>
    [
      'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
      active === tab
        ? 'border-primary text-primary'
        : 'border-transparent text-textMuted hover:text-text hover:border-border',
    ].join(' ')
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            className={tabClass(tab.key)}
            onClick={(): void => {
              setActive(tab.key)
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="h-[360px] w-full">
        {active === 'hour' ? (
          <MostActiveHoursChart
            data={data.activeHours}
            daysData={data.activeDaysOfWeek ?? {}}
          />
        ) : active === 'day' ? (
          <ActiveDaysChart data={data.activeDaysOfWeek ?? {}} />
        ) : (
          <AccessLogTrendChart data={data.accessLogTrend ?? {}} />
        )}
      </div>
      <AccessLogsRawDataView logs={data.recentAccessLogs ?? []} />
    </div>
  )
}
