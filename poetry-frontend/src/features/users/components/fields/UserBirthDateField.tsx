/*
 * File: UserBirthDateField.tsx
 * Purpose: Date input for user birth date in the form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserBirthDateFieldProps {
  birthDate: string
  onBirthDateChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserBirthDateField(
  props: UserBirthDateFieldProps
): ReactElement {
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onBirthDateChange(e.target.value)
  }
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.birthDate.label')}
      </Text>
      <Input
        type="date"
        value={props.birthDate}
        onChange={handleChange}
        data-testid="user-birthdate-input"
      />
    </Stack>
  )
}
