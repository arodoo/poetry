/*
 * File: UsersBasicFields.tsx
 * Purpose: Basic user input fields separated for line limit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../../../ui/Stack/Stack'
import { Input } from '../../../../../ui/Input/Input'
import { Text } from '../../../../../ui/Text/Text'
import type { useT } from '../../../../../shared/i18n/useT'
import { UserFirstNameField } from '../../fields/UserFirstNameField'
import { UserLastNameField } from '../../fields/UserLastNameField'
import { UserEmailField } from '../../fields/UserEmailField'
export interface UsersBasicFieldsProps {
  readonly firstName: string
  readonly lastName: string
  readonly username: string
  readonly email: string
  readonly onFirstNameChange: (value: string) => void
  readonly onLastNameChange: (value: string) => void
  readonly onUsernameChange: (value: string) => void
  readonly onEmailChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersBasicFields(props: UsersBasicFieldsProps): ReactElement {
  return (
    <>
      <UserFirstNameField
        firstName={props.firstName}
        onFirstNameChange={props.onFirstNameChange}
        t={props.t}
      />
      <UserLastNameField
        lastName={props.lastName}
        onLastNameChange={props.onLastNameChange}
        t={props.t}
      />
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.username.label')}
        </Text>
        <Input
          type="text"
          value={props.username}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onUsernameChange(e.target.value)
          }}
          placeholder={props.t('ui.users.form.username.placeholder')}
          required
          data-testid="user-username-input"
        />
      </Stack>
      <UserEmailField
        email={props.email}
        onEmailChange={props.onEmailChange}
        t={props.t}
      />
    </>
  )
}
