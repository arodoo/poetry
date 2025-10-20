/*
 * File: UsersRolesField.tsx
 * Purpose: Multi-select roles field with checkboxes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'
import { useRolesQuery } from '../hooks/useRolesQuery'
import type { RoleDto } from '../../../api/generated'
import { UsersRolesFieldStatus } from './UsersRolesFieldStatus'

export interface UsersRolesFieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersRolesField(props: UsersRolesFieldProps): ReactElement {
  const rolesQuery: ReturnType<typeof useRolesQuery> = useRolesQuery()
  const selectedRoles: string[] = props.value
    .split(',')
    .map((r: string): string => r.trim())
    .filter(Boolean)

  function handleCheckboxChange(e: ChangeEvent<HTMLInputElement>): void {
    const updatedRoles: string[] = e.target.checked
      ? selectedRoles.includes(e.target.value)
        ? selectedRoles
        : [...selectedRoles, e.target.value]
      : selectedRoles.filter((role: string): boolean => role !== e.target.value)
    props.onChange(updatedRoles.join(', '))
  }

  const statusMsg: string | undefined = rolesQuery.isLoading
    ? props.t('ui.users.form.roles.loading')
    : rolesQuery.isError || rolesQuery.data === undefined
      ? props.t('ui.users.form.roles.error')
      : undefined
  if (statusMsg !== undefined) {
    return (
      <UsersRolesFieldStatus
        message={statusMsg}
        isError={rolesQuery.isError}
        label={props.t('ui.users.form.roles.label')}
      />
    )
  }

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.roles.label')}
      </Text>
      <Stack gap="sm">
        {rolesQuery.data?.map(
          (role: RoleDto): ReactElement => (
            <label
              key={role.key}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                value={role.key}
                checked={selectedRoles.includes(role.key ?? '')}
                onChange={handleCheckboxChange}
                data-testid={`role-checkbox-${(role.key ?? '').toLowerCase()}`}
                className="w-4 h-4"
              />
              <Text size="sm">
                {props.t('ui.users.roles.' + (role.key ?? ''))}
              </Text>
            </label>
          )
        )}
      </Stack>
    </Stack>
  )
}
