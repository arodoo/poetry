/*
 * File: UserPhoneField.tsx
 * Purpose: Phone number input field for the user form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserPhoneFieldProps {
  phone: string
  onPhoneChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserPhoneField(
  props: UserPhoneFieldProps
): ReactElement {
  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onPhoneChange(e.target.value)
  }
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.phone.label')}
      </Text>
      <Input
        type="tel"
        value={props.phone}
        onChange={handleChange}
        placeholder={props.t('ui.users.form.phone.placeholder')}
        data-testid="user-phone-input"
      />
    </Stack>
  )
}
