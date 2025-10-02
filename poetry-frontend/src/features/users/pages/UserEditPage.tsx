/*
 * File: UserEditPage.tsx
 * Purpose: Admin user edit page referencing placeholder form shell.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { Button } from '../../../ui/Button/Button'
import { useT } from '../../../shared/i18n/useT'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { useUpdateUserMutation } from '../hooks/useUsersMutations'
import { useUserDetailQuery } from '../hooks/useUsersQueries'

export default function UserEditPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const detailQuery: ReturnType<typeof useUserDetailQuery> =
    useUserDetailQuery(userId)
  const mutation: ReturnType<typeof useUpdateUserMutation> =
    useUpdateUserMutation()
  const isSubmitting: boolean = mutation.isPending
  const version: string | undefined = (
    detailQuery.data as { version?: string | number } | undefined
  )?.version?.toString()
  return (
    <UsersPageLayout
      titleKey="ui.users.edit.title"
      subtitleKey="ui.users.edit.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.edit.form.title')}
        description={t('ui.users.edit.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">{t('ui.users.edit.form.placeholder')}</Text>
          {version ? (
            <Text size="sm">
              {t('ui.users.detail.version', { value: version })}
            </Text>
          ) : null}
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.save')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
