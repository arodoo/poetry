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
import { Tabs } from '../../../ui/Tabs/Tabs'
import { useMembershipStatsQuery } from '../api/useStatsQueries'
import { KpiGrid } from '../components/KpiGrid'
import { useT } from '../../../shared/i18n/useT'
import { MembersList } from '../components/memberships/MembersList'

export function AdminDashboardPage(): ReactElement {
  const t = useT()
  const { data: stats, isLoading, error } = useMembershipStatsQuery()

  if (isLoading) {
    return <p data-testid="admin-stats-loading">Loading...</p>
  }
  if (error) {
    return (
      <Card padding="md" data-testid="admin-stats-error">
        <p className="text-[var(--color-error)]">
          {t('ui.adminStats.error.loading')}
        </p>
      </Card>
    )
  }

  return (
    <div className="p-6" data-testid="admin-stats-page">
      <Stack gap="lg">
        <Heading level={1} data-testid="admin-stats-title">
          {t('ui.adminStats.title')}
        </Heading>
        <Text className="text-[var(--color-textMuted)]">
          {t('ui.adminStats.subtitle')}
        </Text>
        {stats && <KpiGrid stats={stats} />}

        <div className="mt-8">
          <Tabs
            items={[
              {
                label: t('ui.adminStats.status.active'),
                panel: <MembersList status="ACTIVE" />,
              },
              {
                label: t('ui.adminStats.status.expiring'),
                panel: <MembersList status="EXPIRING" />,
              },
              {
                label: t('ui.adminStats.status.expired'),
                panel: <MembersList status="EXPIRED" />,
              },
            ]}
          />
        </div>
      </Stack>
    </div>
  )
}
