/*
 * File: UsersFormFields.tsx
 * Purpose: Input fields for the users form, separated to respect line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'
import { UsersBasicFields } from './UsersBasicFields'
import { UsersPasswordField } from './UsersPasswordField'
import { UsersRolesField } from './UsersRolesField'

export interface UsersFormFieldsProps {
  readonly firstName: string
  readonly lastName: string
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly rolesString: string
  readonly password: string
  readonly showPassword: boolean
  readonly onFirstNameChange: (value: string) => void
  readonly onLastNameChange: (value: string) => void
  readonly onUsernameChange: (value: string) => void
  readonly onEmailChange: (value: string) => void
  readonly onLocaleChange: (value: string) => void
  readonly onRolesChange: (value: string) => void
  readonly onPasswordChange: (value: string) => void
  readonly t: ReturnType<typeof useT>
}

export function UsersFormFields(props: UsersFormFieldsProps): ReactElement {
  function handleLocaleChange(e: ChangeEvent<HTMLSelectElement>): void {
    props.onLocaleChange(e.target.value)
  }
  return (
    <>
      <UsersBasicFields
        firstName={props.firstName}
        lastName={props.lastName}
        username={props.username}
        email={props.email}
        onFirstNameChange={props.onFirstNameChange}
        onLastNameChange={props.onLastNameChange}
        onUsernameChange={props.onUsernameChange}
        onEmailChange={props.onEmailChange}
        t={props.t}
      />
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.users.form.locale.label')}
        </Text>
        <Select
          value={props.locale}
          onChange={handleLocaleChange}
          required
          data-testid="user-locale-select"
        >
          <option value="en">{props.t('ui.users.form.locale.en')}</option>
          <option value="es">{props.t('ui.users.form.locale.es')}</option>
        </Select>
      </Stack>
      <UsersRolesField
        value={props.rolesString}
        onChange={props.onRolesChange}
        t={props.t}
      />
      {props.showPassword ? (
        <UsersPasswordField
          value={props.password}
          onChange={props.onPasswordChange}
          t={props.t}
        />
      ) : null}
    </>
  )
}
