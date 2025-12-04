/*
 * File: UserSecurityPage.tsx
 * Purpose: Admin user security management placeholder page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/form/UsersFormShell'
import { useUpdateUserSecurityMutation } from '../hooks/mutations/useUsersMutations'

export default function UserSecurityPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const mutation: ReturnType<typeof useUpdateUserSecurityMutation> =
    useUpdateUserSecurityMutation()
  const isSubmitting: boolean = mutation.isPending
  return (
    <UsersPageLayout
      titleKey="ui.users.security.title"
      subtitleKey="ui.users.security.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.security.form.title')}
        description={t('ui.users.security.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">
            {t('ui.users.security.form.placeholder', { value: userId })}
          </Text>
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.save')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
