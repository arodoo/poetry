/*
 * File: UsersListResults.tsx
 * Purpose: Render fetched users list entries as card stack for admin view.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { UserSummary } from '../model/UsersSchemas'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useT } from '../../../shared/i18n/useT'

export interface UsersListResultsProps {
  readonly users: readonly UserSummary[]
}

export function UsersListResults({
  users,
}: UsersListResultsProps): ReactElement {
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const t: ReturnType<typeof useT> = useT()
  return (
    <Stack as="section" gap="md" data-testid="users-list-results">
      {users.map(
        (user: UserSummary): ReactElement => (
          <Card key={user.id} padding="md" shadow={false}>
            <Stack gap="sm">
              <Stack gap="xs">
                <Heading level={3} size="md">
                  {user.username}
                </Heading>
                <Text size="sm">{user.email}</Text>
                <Text size="sm" className="text-[var(--color-textMuted)]">
                  {user.roles.join(', ')}
                </Text>
              </Stack>
              <Inline gap="sm">
                <Button
                  to={`/${locale}/users/${user.id}`}
                  size="sm"
                  variant="secondary"
                  data-testid={`view-user-${user.id}`}
                >
                  {t('ui.users.actions.view')}
                </Button>
                <Button
                  to={`/${locale}/users/${user.id}/edit`}
                  size="sm"
                  data-testid={`edit-user-${user.id}`}
                >
                  {t('ui.users.actions.edit')}
                </Button>
              </Inline>
            </Stack>
          </Card>
        )
      )}
    </Stack>
  )
}

export default UsersListResults
