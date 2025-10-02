/*
 * File: ProfilePage.tsx
 * Purpose: Authenticated profile view composing summary and security flows.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import ProfilePasswordSection from '../components/ProfilePasswordSection'
import { useT } from '../../../shared/i18n/useT'
import { ProfileSummarySection } from '../components/ProfileSummarySection'
import {
  useProfileSummaryMutation,
  useProfileSummaryQuery,
} from '../hooks/useProfileQueries'
import type { ProfileSummaryUpdateInput } from '../model/ProfileSchemas'

export default function ProfilePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const summaryQuery: ReturnType<typeof useProfileSummaryQuery> =
    useProfileSummaryQuery()
  const summaryMutation: ReturnType<typeof useProfileSummaryMutation> =
    useProfileSummaryMutation()
  const isLoading: boolean = summaryQuery.isLoading
  const isError: boolean = summaryQuery.isError
  const profile: ReturnType<typeof useProfileSummaryQuery>['data'] =
    summaryQuery.data
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-2">
        <Heading level={1} size="lg">
          {t('ui.profile.page.title')}
        </Heading>
        <Text size="sm">{t('ui.profile.page.subtitle')}</Text>
      </header>
      {isLoading ? (
        <div
          data-testid="profile-loading"
          className="h-48 animate-pulse rounded bg-[var(--color-muted)]"
        />
      ) : isError ? (
        <Text role="alert" data-testid="profile-summary-error">
          {t('ui.profile.summary.error')}
        </Text>
      ) : profile ? (
        <ProfileSummarySection
          profile={profile}
          onSubmit={(input: ProfileSummaryUpdateInput): void => {
            summaryMutation.mutate(input)
          }}
          isSubmitting={summaryMutation.isPending}
          t={t}
        />
      ) : (
        <Text data-testid="profile-summary-empty">
          {t('ui.profile.summary.empty')}
        </Text>
      )}
      <ProfilePasswordSection />
    </main>
  )
}
