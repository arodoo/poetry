/*
 * File: UsersLocaleField.tsx
 * Purpose: Searchable locale selection field for user forms.
 * Provides EN/ES options through a filterable dropdown.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { Stack } from '../../../../../ui/Stack/Stack'
import { SearchableSelect } from '../../../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../../../ui/Text/Text'
import type { SelectOption } from '../../../../../ui/SearchableSelect/SearchableSelect.types'
import type { useT } from '../../../../../shared/i18n/useT'

export interface UsersLocaleFieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersLocaleField(props: UsersLocaleFieldProps): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: 'en', label: props.t('ui.users.form.locale.en') },
      { value: 'es', label: props.t('ui.users.form.locale.es') },
    ],
    [props.t]
  )

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.locale.label')}
      </Text>
      <SearchableSelect
        options={options}
        value={props.value}
        onChange={props.onChange}
        searchable={false}
        required
        data-testid="user-locale-select"
      />
    </Stack>
  )
}
