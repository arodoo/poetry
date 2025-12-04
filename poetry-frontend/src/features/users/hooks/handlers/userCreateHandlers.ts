/*
 * File: userCreateHandlers.ts
 * Purpose: Event handlers for user creation form. Encapsulates submission
 * and navigation logic. Separates business logic from presentation layer.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { buildFormData } from '../../components/form/usersFormHelpers'
import type { UsersFormValues } from '../../components/form/UsersForm'
import type { UsersFormState } from '../../components/form/useUsersFormState'
import { CreateUserSchema, type CreateUserInput } from '../../model/UsersSchemas'

export function createUserSubmitHandler(
  formState: UsersFormState,
  onSuccess: (input: CreateUserInput) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    try {
      const values: UsersFormValues = buildFormData(
        formState.firstName,
        formState.lastName,
        formState.username,
        formState.email,
        formState.locale,
        formState.rolesString,
        formState.password,
        true,
        formState.status
      )

      const validatedInput: CreateUserInput = CreateUserSchema.parse({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        locale: values.locale,
        roles: values.roles,
        password: values.password ?? undefined,
        status: values.status,
      })
      onSuccess(validatedInput)
    } catch (error) {
      console.error('Validation error:', error)
      throw error
    }
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
