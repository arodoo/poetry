/*
 * File: UsersFormStatus.tsx
 * Purpose: Status select component for user forms (create/edit).
 * Renders dropdown for active/inactive status selection.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface UsersFormStatusProps {
  readonly status: 'active' | 'inactive'
  readonly onStatusChange: (v: 'active' | 'inactive') => void
  readonly t: ReturnType<typeof useT>
}

export function UsersFormStatus(props: UsersFormStatusProps): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.status.label')}
      </Text>
      <Select
        value={props.status}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          const raw: string = e.target.value
          const v: 'active' | 'inactive' = raw as 'active' | 'inactive'
          props.onStatusChange(v)
        }}
        required
        data-testid="user-status-select"
      >
        <option value="active">{props.t('ui.users.status.active')}</option>
        <option value="inactive">{props.t('ui.users.status.inactive')}</option>
      </Select>
    </Stack>
  )
}
