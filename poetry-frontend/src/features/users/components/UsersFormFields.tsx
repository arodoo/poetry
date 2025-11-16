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
import { UsersFormStatus } from './UsersFormStatus'
import type { UsersFormState } from './useUsersFormState'

export interface UsersFormFieldsProps
  extends Omit<UsersFormState, 'setActive'> {
  readonly showPassword: boolean
  readonly t: ReturnType<typeof useT>
}

function shouldShowPassword(rolesString: string): boolean {
  const roles = rolesString.toUpperCase()
  return roles.includes('ADMIN') || roles.includes('MANAGER')
}

export function UsersFormFields(props: UsersFormFieldsProps): ReactElement {
  function handleLocaleChange(e: ChangeEvent<HTMLSelectElement>): void {
    props.setLocale(e.target.value)
  }
  return (
    <>
      <UsersBasicFields
        firstName={props.firstName}
        lastName={props.lastName}
        username={props.username}
        email={props.email}
        onFirstNameChange={props.setFirstName}
        onLastNameChange={props.setLastName}
        onUsernameChange={props.setUsername}
        onEmailChange={props.setEmail}
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
        onChange={props.setRolesString}
        t={props.t}
      />
      <UsersFormStatus
        status={props.status}
        onStatusChange={props.setStatus}
        t={props.t}
      />
      {props.showPassword && shouldShowPassword(props.rolesString) ? (
        <UsersPasswordField
          value={props.password}
          onChange={props.setPassword}
          t={props.t}
        />
      ) : null}
    </>
  )
}
