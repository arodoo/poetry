/*
 * File: UserEnablePage.tsx
 * Purpose: Admin user enable confirmation placeholder page.
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
import { useEnableUserMutation } from '../hooks/useUsersMutations'

export default function UserEnablePage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const mutation: ReturnType<typeof useEnableUserMutation> =
    useEnableUserMutation()
  const isSubmitting: boolean = mutation.isPending
  return (
    <UsersPageLayout
      titleKey="ui.users.enable.title"
      subtitleKey="ui.users.enable.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.enable.form.title')}
        description={t('ui.users.enable.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">
            {t('ui.users.enable.form.placeholder', { value: userId })}
          </Text>
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.enable')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
