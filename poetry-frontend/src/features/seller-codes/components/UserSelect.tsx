/*
 * File: UserSelect.tsx
 * Purpose: Searchable user dropdown for seller code forms. Uses
 * generated SDK to fetch users and presents them in a filterable
 * SearchableSelect component for quick selection.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
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

  const options: SelectOption[] = useMemo(
    () =>
      (users ?? []).map(
        (u: UserResponse): SelectOption => ({
          value: u.id?.toString() ?? '',
          label: u.username ?? '',
          sublabel: u.email ?? '',
        })
      ),
    [users]
  )

  const placeholder = isLoading
    ? props.t('ui.sellerCodes.form.user.loading')
    : isError
      ? props.t('ui.sellerCodes.form.user.error')
      : props.t('ui.sellerCodes.form.user.placeholder')

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.sellerCodes.form.user.label')}
      </Text>
      <SearchableSelect
        options={options}
        value={props.value}
        onChange={props.onChange}
        placeholder={placeholder}
        disabled={isLoading || isError}
        loading={isLoading}
        data-testid="seller-code-user-select"
      />
    </Stack>
  )
}
