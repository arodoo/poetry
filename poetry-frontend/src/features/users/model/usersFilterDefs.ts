/*
 * File: usersFilterDefs.ts
 * Purpose: Filter definitions for UsersListPage.
 * Auto-detects status and role filters for the
 * DataTable filter bar from available field values.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FilterDef } from '../../../ui/DataTable/FilterTypes'

export function buildUserFilters(
  t: (key: string) => string
): readonly FilterDef[] {
  return [
    {
      key: 'status',
      label: t('ui.table.filter.status'),
      options: [
        {
          value: 'active',
          label: t('ui.users.status.active'),
        },
        {
          value: 'inactive',
          label: t('ui.users.status.inactive'),
        },
      ],
    },
    {
      key: 'role',
      label: t('ui.table.filter.role'),
      options: [
        {
          value: 'ADMIN',
          label: t('ui.users.role.admin'),
        },
        {
          value: 'SELLER',
          label: t('ui.users.role.seller'),
        },
      ],
    },
  ]
}
