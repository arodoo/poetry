/*
 * File: UserSelect.tsx
 * Purpose: User dropdown select component using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Select } from '../../../ui/Select/Select'
import { Stack } from '../../../ui/Stack/Stack'
import { Text } from '../../../ui/Text/Text'
import type { UserResponse } from '../../../api/generated'
import type { useT } from '../../../shared/i18n/useT'
import { useUsersListForSelect } from '../hooks/useUsersListForSelect'

export interface UserSelectProps {
  readonly value: string
  readonly onChange: (userId: string) => void
  readonly t: ReturnType<typeof useT>
  readonly required?: boolean
}

export function UserSelect(props: UserSelectProps): ReactElement {
  const { data: users, isLoading, isError } = useUsersListForSelect()

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.sellerCodes.form.user.label')}
      </Text>
      <Select
        value={props.value}
        onChange={(e): void => props.onChange(e.target.value)}
        required={props.required}
        disabled={isLoading || isError}
        data-testid="seller-code-user-select"
      >
        <option value="">
          {isLoading
            ? props.t('ui.sellerCodes.form.user.loading')
            : isError
              ? props.t('ui.sellerCodes.form.user.error')
              : props.t('ui.sellerCodes.form.user.placeholder')}
        </option>
        {!isLoading &&
          !isError &&
          users &&
          users.map((user: UserResponse) => (
            <option key={user.id} value={user.id?.toString() || ''}>
              {user.username} ({user.email})
            </option>
          ))}
      </Select>
    </Stack>
  )
}
