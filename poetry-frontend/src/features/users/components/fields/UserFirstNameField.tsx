/*
 File: UserFirstNameField.tsx
 Purpose: Small, focused input component for a user's first name. Extracted
 from `UsersBasicFields` to reduce the parent file length and comply with
 repository line-length and linting rules. This component is purely
 presentational: it renders a label and a controlled input and forwards
 value changes via the provided callback. All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserFirstNameFieldProps {
  firstName: string
  onFirstNameChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserFirstNameField(
  props: UserFirstNameFieldProps
): ReactElement {
  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onFirstNameChange(e.target.value)
  }

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.firstName.label')}
      </Text>
      <Input
        type="text"
        value={props.firstName}
        onChange={handleFirstNameChange}
        placeholder={props.t('ui.users.form.firstName.placeholder')}
        required
        data-testid="user-firstname-input"
      />
    </Stack>
  )
}
