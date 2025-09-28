/*
 * File: DashboardOverviewPanel.tsx
 * Purpose: Present dashboard overview metrics using design system primitives.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import type { useT } from '../../../shared/i18n/useT'
import { type DashboardOverview } from '../model/DashboardSchemas'
import {
  DashboardMetricList,
  type DashboardMetric,
} from './DashboardMetricList'
import { DashboardOverviewHeader } from './DashboardOverviewHeader'

export interface DashboardOverviewPanelProps {
  readonly overview: DashboardOverview
  readonly t: ReturnType<typeof useT>
}

export function DashboardOverviewPanel(
  props: DashboardOverviewPanelProps
): ReactElement {
  const metrics: DashboardMetric[] = [
    {
      labelKey: 'ui.dashboard.overview.metrics.total',
      value: props.overview.totalPoems,
      testId: 'dashboard-total-poems',
    },
    {
      labelKey: 'ui.dashboard.overview.metrics.published',
      value: props.overview.publishedPoems,
      testId: 'dashboard-published-poems',
    },
    {
      labelKey: 'ui.dashboard.overview.metrics.drafts',
      value: props.overview.draftPoems,
      testId: 'dashboard-draft-poems',
    },
    {
      labelKey: 'ui.dashboard.overview.metrics.members',
      value: props.overview.activeMembers,
      testId: 'dashboard-active-members',
    },
  ]
  return (
    <Card padding="lg" radius="lg" shadow className="w-full">
      <Stack gap="md">
        <DashboardOverviewHeader
          t={props.t}
          highlightKey={props.overview.highlightKey}
          lastUpdatedLabel={props.overview.lastUpdatedLabel}
        />
        <DashboardMetricList metrics={metrics} t={props.t} />
      </Stack>
    </Card>
  )
}
