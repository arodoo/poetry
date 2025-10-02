/*
 * File: UsersListPage.tsx
 * Purpose: Admin users index page composing list shells.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useUsersListQuery } from '../hooks/useUsersQueries'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersListShell } from '../components/UsersListShell'
import { UsersListResults } from '../components/UsersListResults'
import type { UserSummary } from '../model/UsersSchemas'
import { useT } from '../../../shared/i18n/useT'

export default function UsersListPage(): ReactElement {
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  const listQuery: ReturnType<typeof useUsersListQuery> = useUsersListQuery()
  const isLoading: boolean = listQuery.isLoading
  const isError: boolean = listQuery.isError
  const users: readonly UserSummary[] = Array.isArray(listQuery.data)
    ? (listQuery.data as readonly UserSummary[])
    : []
  const hasUsers: boolean = users.length > 0
  const actions: ReactElement = (
    <Button to={`/${locale}/users/new`} size="sm">
      {t('ui.users.actions.new')}
    </Button>
  )
  return (
    <UsersPageLayout
      titleKey="ui.users.list.title"
      subtitleKey="ui.users.list.subtitle"
      actions={actions}
    >
      {isLoading ? (
        <Text size="sm">{t('ui.users.status.loading')}</Text>
      ) : isError ? (
        <Text size="sm">{t('ui.users.status.error')}</Text>
      ) : hasUsers ? (
        <Stack gap="md">
          <Text size="sm">{t('ui.users.status.ready')}</Text>
          <UsersListResults users={users} />
        </Stack>
      ) : (
        <UsersListShell />
      )}
    </UsersPageLayout>
  )
}
