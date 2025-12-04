/*
 * File: UsersLocaleField.tsx
 * Purpose: Locale selection field for user forms with EN/ES options.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../../ui/Stack/Stack'
import { Select } from '../../../../../ui/Select/Select'
import { Text } from '../../../../../ui/Text/Text'
import type { useT } from '../../../../../shared/i18n/useT'

export interface UsersLocaleFieldProps {
  readonly value: string
  readonly onChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersLocaleField(props: UsersLocaleFieldProps): ReactElement {
  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    props.onChange(e.target.value)
  }
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.locale.label')}
      </Text>
      <Select
        value={props.value}
        onChange={handleChange}
        required
        data-testid="user-locale-select"
      >
        <option value="en">{props.t('ui.users.form.locale.en')}</option>
        <option value="es">{props.t('ui.users.form.locale.es')}</option>
      </Select>
    </Stack>
  )
}
