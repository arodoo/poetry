/*
 File: UserLastNameField.tsx
 Purpose: Small presentational component that renders a label and input for the
 user's last name. This component was extracted to keep `UsersBasicFields`
 concise and to comply with the project's line-length linting policy. It is
 a controlled component that invokes the provided callback on value change.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserLastNameFieldProps {
  lastName: string
  onLastNameChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserLastNameField(props: UserLastNameFieldProps): ReactElement {
  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onLastNameChange(e.target.value)
  }

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.lastName.label')}
      </Text>
      <Input
        type="text"
        value={props.lastName}
        onChange={handleLastNameChange}
        placeholder={props.t('ui.users.form.lastName.placeholder')}
        required
        data-testid="user-lastname-input"
      />
    </Stack>
  )
}
