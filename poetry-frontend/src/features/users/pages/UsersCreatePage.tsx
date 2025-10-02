/*
 * File: UsersCreatePage.tsx
 * Purpose: Admin create user page assembling placeholder form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { useCreateUserMutation } from '../hooks/useUsersMutations'

export default function UsersCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const mutation: ReturnType<typeof useCreateUserMutation> =
    useCreateUserMutation()
  const isSubmitting: boolean = mutation.isPending
  return (
    <UsersPageLayout
      titleKey="ui.users.create.title"
      subtitleKey="ui.users.create.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.create.form.title')}
        description={t('ui.users.create.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">{t('ui.users.create.form.placeholder')}</Text>
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.submit')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
