/*
 * File: UserDetailPage.tsx
 * Purpose: Admin user detail page referencing query hooks.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersDetailSummary } from '../components/UsersDetailSummary'
import { useUserDetailQuery } from '../hooks/useUsersQueries'

function hasVersion(val: unknown): val is { version: string } {
  if (typeof val !== 'object' || val === null) {
    return false
  }

  const maybeVersion: unknown = (val as Record<string, unknown>)['version']
  return typeof maybeVersion === 'string'
}

export default function UserDetailPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const detailQuery: ReturnType<typeof useUserDetailQuery> =
    useUserDetailQuery(userId)
  const { data, isLoading, isError } = detailQuery
  return (
    <UsersPageLayout
      titleKey="ui.users.detail.title"
      subtitleKey="ui.users.detail.subtitle"
    >
      {isLoading ? (
        <Text size="sm">{t('ui.users.status.loading')}</Text>
      ) : isError || !data ? (
        <Text size="sm">{t('ui.users.status.error')}</Text>
      ) : (
        <Stack gap="md">
          <UsersDetailSummary />
          <Text size="sm">
            {t('ui.users.detail.version', {
              value: hasVersion(data) ? data.version : '1',
            })}
          </Text>
        </Stack>
      )}
    </UsersPageLayout>
  )
}
