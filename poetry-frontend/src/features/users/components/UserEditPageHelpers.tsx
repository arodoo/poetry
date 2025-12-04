/*
 * File: UserEditPageHelpers.tsx
 * Purpose: Helper components for UserEditPage to keep main file under 80 lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { Text } from '../../../ui/Text/Text'

export function UserEditPageLoading({
  message,
}: {
  readonly message: string
}): ReactElement {
  return (
    <UsersPageLayout
      titleKey="ui.users.edit.title"
      subtitleKey="ui.users.edit.subtitle"
    >
      <Text size="sm">{message}</Text>
    </UsersPageLayout>
  )
}
