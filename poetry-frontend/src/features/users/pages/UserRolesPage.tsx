/*
 * File: UserRolesPage.tsx
 * Purpose: Admin user roles management placeholder page.
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
import { useUpdateUserRolesMutation } from '../hooks/useUsersMutations'

export default function UserRolesPage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const mutation: ReturnType<typeof useUpdateUserRolesMutation> =
    useUpdateUserRolesMutation()
  const isSubmitting: boolean = mutation.isPending
  return (
    <UsersPageLayout
      titleKey="ui.users.roles.title"
      subtitleKey="ui.users.roles.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.roles.form.title')}
        description={t('ui.users.roles.form.subtitle')}
      >
        <Stack gap="sm">
          <Text size="sm">
            {t('ui.users.roles.form.placeholder', { value: userId })}
          </Text>
          <Button size="sm" disabled={isSubmitting}>
            {t('ui.users.actions.save')}
          </Button>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
