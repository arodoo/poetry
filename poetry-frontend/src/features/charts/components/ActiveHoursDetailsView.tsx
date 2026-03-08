/*
 * File: ActiveHoursDetailsView.tsx
 * Purpose: A dedicated sub-dashboard for Access Logs comprising multiple tabs and a raw data table. It isolates the logic of managing the different metric subsets into a clean component avoiding massive files. Users can seamlessly tab between weekly trends, hourly peaks, and raw check-in instances.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { MostActiveHoursChart } from './MostActiveHoursChart'
import { ActiveDaysChart } from './ActiveDaysChart'
import { AccessLogTrendChart } from './AccessLogTrendChart'
import { AccessLogsRawDataView } from './AccessLogsRawDataView'
import type { DashboardMetrics } from '../model/ChartsSchemas'

interface ActiveHoursDetailsViewProps {
  data: DashboardMetrics
}

export function ActiveHoursDetailsView({
  data,
}: ActiveHoursDetailsViewProps): ReactElement {
  const [activeTab, setActiveTab] = useState<'hour' | 'day' | 'trend'>('hour')

  const logs = data.recentAccessLogs ?? []

  const tabClass = (tab: string) =>
    `px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
      activeTab === tab
        ? 'border-primary text-primary'
        : 'border-transparent text-text-muted hover:text-text hover:border-divider'
    }`

  return (
    <div className="flex flex-col gap-6">
      <div className="flex border-b border-divider gap-4">
        <button
          className={tabClass('hour')}
          onClick={() => {
            setActiveTab('hour')
          }}
        >
          By Hour
        </button>
        <button
          className={tabClass('day')}
          onClick={() => {
            setActiveTab('day')
          }}
        >
          Busiest Days
        </button>
        <button
          className={tabClass('trend')}
          onClick={() => {
            setActiveTab('trend')
          }}
        >
          7-Day Trend
        </button>
      </div>

      {activeTab === 'hour' && (
        <div className="w-full">
          <MostActiveHoursChart
            data={data.activeHours}
            daysData={data.activeDaysOfWeek ?? {}}
          />
        </div>
      )}

      {activeTab === 'day' && (
        <div className="w-full">
          <ActiveDaysChart data={data.activeDaysOfWeek ?? {}} />
        </div>
      )}

      {activeTab === 'trend' && (
        <div className="w-full">
          <AccessLogTrendChart data={data.accessLogTrend ?? {}} />
        </div>
      )}

      <AccessLogsRawDataView logs={logs} />
    </div>
  )
}
