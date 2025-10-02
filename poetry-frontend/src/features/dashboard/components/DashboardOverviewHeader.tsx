/*
 * File: DashboardOverviewHeader.tsx
 * Purpose: Render dashboard overview heading, highlight, and timestamp.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface DashboardOverviewHeaderProps {
  readonly t: ReturnType<typeof useT>
  readonly highlightKey: string
  readonly lastUpdatedLabel: string
}

export function DashboardOverviewHeader(
  props: DashboardOverviewHeaderProps
): ReactElement {
  return (
    <Stack gap="xs">
      <Heading level={3} size="lg">
        {props.t('ui.dashboard.welcome.title')}
      </Heading>
      <Text size="sm">{props.t('ui.dashboard.welcome.message')}</Text>
      <Text size="sm" data-testid="dashboard-highlight">
        {props.t(props.highlightKey)}
      </Text>
      <Text size="sm">
        {props.t('ui.dashboard.overview.lastUpdated', {
          label: props.lastUpdatedLabel,
        })}
      </Text>
    </Stack>
  )
}
