/*
 * File: DashboardPage.tsx
 * Purpose: Dashboard entry point orchestrating overview data and layout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { DashboardOverviewPanel } from '../components/DashboardOverviewPanel'
import { useDashboardOverviewQuery } from '../hooks/useDashboardQueries'

export default function DashboardPage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const overviewQuery: ReturnType<typeof useDashboardOverviewQuery> =
    useDashboardOverviewQuery()
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-2">
        <Heading level={1} size="lg">
          {t('ui.dashboard.page.title')}
        </Heading>
        <Text size="sm">{t('ui.dashboard.page.subtitle')}</Text>
      </header>
      {overviewQuery.isLoading ? (
        <div
          data-testid="dashboard-loading"
          className="h-48 animate-pulse rounded bg-[var(--color-muted)]"
        />
      ) : overviewQuery.isError ? (
        <Text role="alert" data-testid="dashboard-error">
          {t('ui.dashboard.overview.error')}
        </Text>
      ) : overviewQuery.data ? (
        <DashboardOverviewPanel overview={overviewQuery.data} t={t} />
      ) : (
        <Text data-testid="dashboard-empty">
          {t('ui.dashboard.overview.empty')}
        </Text>
      )}
    </main>
  )
}
