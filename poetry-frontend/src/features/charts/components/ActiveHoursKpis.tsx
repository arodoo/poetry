/*
 * File: ActiveHoursKpis.tsx
 * Purpose: Presents the Peak Hour and Busiest Day KPI tiles consumed by
 * the MostActiveHoursChart. Uses themed tokens for legible contrast on
 * every theme and reads its copy through the i18n catalog.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'

interface KpiTileProps {
  label: string
  value: string
}

function KpiTile({ label, value }: KpiTileProps): ReactElement {
  return (
    <div className="flex-1 rounded-md border border-border bg-background px-3 py-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-textMuted">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-primary">
        {value}
      </p>
    </div>
  )
}

export function ActiveHoursKpis({
  peakHourInfo,
  busiestDayInfo,
}: {
  peakHourInfo: string
  busiestDayInfo: string
}): ReactElement {
  const t = useT()
  return (
    <div className="mb-3 flex gap-3">
      <KpiTile label={t('ui.charts.kpi.peakHour')} value={peakHourInfo} />
      <KpiTile label={t('ui.charts.kpi.busiestDay')} value={busiestDayInfo} />
    </div>
  )
}
