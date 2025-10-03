/*
 * File: usersListColumns.tsx
 * Purpose: DataTable column definitions for UsersListPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { UserSummary } from '../model/UsersSchemas'

export function buildUsersListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<UserSummary>[] {
  return [
    {
      key: 'username',
      header: t('ui.users.table.username'),
      accessor: (row: UserSummary): string => row.username,
    },
    {
      key: 'email',
      header: t('ui.users.table.email'),
      accessor: (row: UserSummary): string => row.email,
    },
    {
      key: 'roles',
      header: t('ui.users.table.roles'),
      accessor: (row: UserSummary): ReactElement => (
        <Inline gap="xs">
          {row.roles.map(
            (role: string): ReactElement => (
              <Badge key={role} tone="primary" size="sm">
                {role}
              </Badge>
            )
          )}
        </Inline>
      ),
    },
    {
      key: 'actions',
      header: t('ui.users.table.actions'),
      accessor: (row: UserSummary): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/users/${row.id}`}
            size="sm"
            data-testid={`view-user-${row.id}`}
          >
            {t('ui.users.actions.view')}
          </Button>
          <Button
            to={`/${locale}/users/${row.id}/edit`}
            size="sm"
            variant="secondary"
            textTone="primary"
            data-testid={`edit-user-${row.id}`}
          >
            {t('ui.users.actions.edit')}
          </Button>
          <Button
            to={`/${locale}/users/${row.id}/delete`}
            size="sm"
            variant="secondary"
            textTone="error"
            data-testid={`delete-user-${row.id}`}
          >
            {t('ui.users.actions.delete')}
          </Button>
        </Inline>
      ),
    },
  ]
}
