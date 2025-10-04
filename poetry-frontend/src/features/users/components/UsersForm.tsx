/*
 * File: UsersForm.tsx
 * Purpose: Form component for creating and editing users with validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type FormEvent, type ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Button } from '../../../ui/Button/Button'
import type { useT } from '../../../shared/i18n/useT'
import { UsersFormFields } from './UsersFormFields'
import { buildFormData } from './usersFormHelpers'
import { useUsersFormState, type UsersFormState } from './useUsersFormState'

export interface UsersFormValues {
  readonly firstName: string
  readonly lastName: string
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly roles: readonly string[]
  readonly password?: string
  readonly version?: string
}

export interface UsersFormProps {
  readonly initialValues?: Partial<UsersFormValues>
  readonly onSubmit: (values: UsersFormValues) => void
  readonly isSubmitting: boolean
  readonly showPassword?: boolean
  readonly t: ReturnType<typeof useT>
  readonly submitLabel: string
}

export function UsersForm(props: UsersFormProps): ReactElement {
  const formState: UsersFormState = useUsersFormState(props.initialValues)
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    props.onSubmit(
      buildFormData(
        formState.firstName,
        formState.lastName,
        formState.username,
        formState.email,
        formState.locale,
        formState.rolesString,
        formState.password,
        props.showPassword ?? false,
        props.initialValues?.version
      )
    )
  }
  return (
    <form onSubmit={handleSubmit} noValidate data-testid="users-form">
      <Stack gap="md">
        <UsersFormFields
          firstName={formState.firstName}
          lastName={formState.lastName}
          username={formState.username}
          email={formState.email}
          locale={formState.locale}
          rolesString={formState.rolesString}
          password={formState.password}
          showPassword={props.showPassword ?? false}
          onFirstNameChange={formState.setFirstName}
          onLastNameChange={formState.setLastName}
          onUsernameChange={formState.setUsername}
          onEmailChange={formState.setEmail}
          onLocaleChange={formState.setLocale}
          onRolesChange={formState.setRolesString}
          onPasswordChange={formState.setPassword}
          t={props.t}
        />
        <Button
          type="submit"
          disabled={props.isSubmitting}
          data-testid="user-form-submit"
          className="ml-auto"
        >
          {props.submitLabel}
        </Button>
      </Stack>
    </form>
  )
}
