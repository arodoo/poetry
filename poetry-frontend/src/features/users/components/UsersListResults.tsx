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

export interface UsersListResultsProps {
  readonly users: readonly UserSummary[]
}

export function UsersListResults({
  users,
}: UsersListResultsProps): ReactElement {
  return (
    <Stack as="section" gap="md" data-testid="users-list-results">
      {users.map(
        (user: UserSummary): ReactElement => (
          <Card key={user.id} padding="md" shadow={false}>
            <Stack gap="xs">
              <Heading level={3} size="md">
                {user.username}
              </Heading>
              <Text size="sm">{user.email}</Text>
              <Text size="sm" className="text-neutral-500">
                {user.roles.join(', ')}
              </Text>
            </Stack>
          </Card>
        )
      )}
    </Stack>
  )
}

export default UsersListResults
