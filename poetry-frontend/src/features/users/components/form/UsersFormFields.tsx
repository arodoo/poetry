/*
 * File: UsersFormFields.tsx
 * Purpose: Input fields for the users form, separated to respect line limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import type { useT } from '../../../../shared/i18n/useT'
import { UsersBasicFields } from './fields/UsersBasicFields'
import { UsersPasswordField } from './fields/UsersPasswordField'
import { UsersRolesField } from './fields/UsersRolesField'
import { UsersFormStatus } from './UsersFormStatus'
import type { UsersFormState } from './useUsersFormState'

export interface UsersFormFieldsProps extends Omit<
  UsersFormState,
  'setActive'
> {
  readonly showPassword: boolean
  readonly isEditing?: boolean
  readonly t: ReturnType<typeof useT>
}

function shouldShowPassword(rolesString: string): boolean {
  const roles = rolesString.toUpperCase()
  return roles.includes('ADMIN') || roles.includes('MANAGER')
}

export function UsersFormFields(props: UsersFormFieldsProps): ReactElement {
  return (
    <>
      <UsersBasicFields
        firstName={props.firstName}
        lastName={props.lastName}
        username={props.username}
        email={props.email}
        isEditing={props.isEditing}
        onFirstNameChange={props.setFirstName}
        onLastNameChange={props.setLastName}
        onUsernameChange={props.setUsername}
        onEmailChange={props.setEmail}
        t={props.t}
      />
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
