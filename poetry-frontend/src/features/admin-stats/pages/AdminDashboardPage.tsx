/**
 * File: AdminDashboardPage.tsx
 * Purpose: Main admin dashboard page displaying business health KPIs.
 * Uses internal UI components, i18n keys, and SDK types for data.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useMembershipStatsQuery } from '../api/useStatsQueries'
import { KpiGrid } from '../components/KpiGrid'
import { useT } from '../../../shared/i18n/useT'

export function AdminDashboardPage(): ReactElement {
  const t = useT()
  const { data: stats, isLoading, error } = useMembershipStatsQuery()

  if (isLoading) {
    return <p data-testid="admin-stats-loading">Loading...</p>
  }
  if (error) {
    return (
      <Card padding="md" data-testid="admin-stats-error">
        <p className="text-red-600">{t('ui.adminStats.error.loading')}</p>
      </Card>
    )
  }

  return (
    <div className="p-6" data-testid="admin-stats-page">
      <Stack gap="lg">
        <Heading level={1} data-testid="admin-stats-title">
          {t('ui.adminStats.title')}
        </Heading>
        <Text className="text-[var(--color-textMuted)]">{t('ui.adminStats.subtitle')}</Text>
        {stats && <KpiGrid stats={stats} />}
      </Stack>
    </div>
  )
}
