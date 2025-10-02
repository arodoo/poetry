/*
 * File: DashboardMetricList.tsx
 * Purpose: Render dashboard metrics in a responsive definition list grid.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import type { useT } from '../../../shared/i18n/useT'

export interface DashboardMetric {
  readonly labelKey: string
  readonly value: number
  readonly testId: string
}

export interface DashboardMetricListProps {
  readonly metrics: readonly DashboardMetric[]
  readonly t: ReturnType<typeof useT>
}

export function DashboardMetricList(
  props: DashboardMetricListProps
): ReactElement {
  return (
    <dl className="grid grid-cols-2 gap-4" data-testid="dashboard-metrics">
      {props.metrics.map(
        (metric: DashboardMetric): ReactElement => (
          <div
            key={metric.labelKey}
            className="rounded bg-[var(--color-surface)] p-3"
          >
            <dt className="text-xs text-[var(--color-textMuted)]">
              {props.t(metric.labelKey)}
            </dt>
            <dd
              data-testid={metric.testId}
              className="text-xl font-semibold text-[var(--color-text)]"
            >
              {metric.value}
            </dd>
          </div>
        )
      )}
    </dl>
  )
}
