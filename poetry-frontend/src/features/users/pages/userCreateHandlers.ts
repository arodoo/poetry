/*
 * File: userCreateHandlers.ts
 * Purpose: Event handlers for user creation form. Encapsulates submission
 * and navigation logic. Separates business logic from presentation layer.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { buildFormData } from '../components/usersFormHelpers'
import type { UsersFormValues } from '../components/UsersForm'
import type { UsersFormState } from '../components/useUsersFormState'
import type { CreateUserInput } from '../model/UsersSchemas'

export function createUserSubmitHandler(
  formState: UsersFormState,
  onSuccess: (input: CreateUserInput) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const values: UsersFormValues = buildFormData(
      formState.username,
      formState.email,
      formState.locale,
      formState.rolesString,
      formState.password,
      true,
      undefined
    )
    const input: CreateUserInput = {
      ...values,
      roles: values.roles as string[],
      password: values.password ?? '',
    }
    onSuccess(input)
  }
}

export function createUserCancelHandler(
  navigate: NavigateFunction,
  locale: string
): () => void {
  return (): void => {
    void navigate(`/${locale}/users`)
  }
}
