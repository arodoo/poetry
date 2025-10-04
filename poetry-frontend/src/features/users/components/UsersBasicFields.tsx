/*
 * File: UsersBasicFields.tsx
 * Purpose: Basic user input fields separated for line limit compliance.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

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
  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onFirstNameChange(e.target.value)
  }
  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onLastNameChange(e.target.value)
  }
  function handleUsernameChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onUsernameChange(e.target.value)
  }
  function handleEmailChange(e: ChangeEvent<HTMLInputElement>): void {
    props.onEmailChange(e.target.value)
  }
  return (
    <>
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
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.username.label')}
        </Text>
        <Input
          type="text"
          value={props.username}
          onChange={handleUsernameChange}
          placeholder={props.t('ui.users.form.username.placeholder')}
          required
          data-testid="user-username-input"
        />
      </Stack>
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
    </>
  )
}
