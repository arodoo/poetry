/*
 * File: UsersForm.tsx
 * Purpose: Form component for creating and editing users with validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type FormEvent, type ReactElement } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Button } from '../../../../ui/Button/Button'
import type { useT } from '../../../../shared/i18n/useT'
import { UsersFormFields } from './UsersFormFields'
import { buildFormData } from './usersFormHelpers'
import { useUsersFormState, type UsersFormState } from './useUsersFormState'
import type { UserResponse } from '../../../../api/generated'

export type UsersFormValues = Required<
  Pick<
    UserResponse,
    'firstName' | 'lastName' | 'username' | 'email' | 'locale' | 'roles'
  >
> & {
  readonly password?: string
  readonly status: 'active' | 'inactive'
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
        formState.status
      )
    )
  }
  return (
    <form onSubmit={handleSubmit} noValidate data-testid="users-form">
      <Stack gap="md">
        <UsersFormFields
          {...formState}
          showPassword={props.showPassword ?? false}
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
