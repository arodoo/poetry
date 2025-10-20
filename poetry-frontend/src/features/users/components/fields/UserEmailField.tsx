/*
 File: UserEmailField.tsx
 Purpose: Presentational email input component used in user forms. Extracted
 from `UsersBasicFields` to keep the parent file under the project's line and
 lint limits. The component renders a labeled email input and forwards
 changes through the provided callback; no business logic is implemented here.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import type { useT } from '../../../../shared/i18n/useT'

export interface UserEmailFieldProps {
  email: string
  onEmailChange: (value: string) => void
  t: ReturnType<typeof useT>
}

export function UserEmailField(props: UserEmailFieldProps): ReactElement {
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onEmailChange(e.target.value)
  }

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.users.form.email.label')}
      </Text>
      <Input
        type="email"
        value={props.email}
        onChange={handleEmailChange}
        placeholder={props.t('ui.users.form.email.placeholder')}
        required
        data-testid="user-email-input"
      />
    </Stack>
  )
}
