/*
 * File: UserDisablePage.tsx
 * Purpose: Admin user disable confirmation placeholder page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { useDisableUserMutation } from '../hooks/useUsersMutations'

export default function UserDisablePage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const mutation: ReturnType<typeof useDisableUserMutation> =
    useDisableUserMutation()
  const isSubmitting: boolean = mutation.isPending
  return (
    <UsersPageLayout
      titleKey="ui.users.disable.title"
      subtitleKey="ui.users.disable.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.disable.form.title')}
        description={t('ui.users.disable.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">
            {t('ui.users.disable.form.placeholder', { value: userId })}
          </Text>
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.disable')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
