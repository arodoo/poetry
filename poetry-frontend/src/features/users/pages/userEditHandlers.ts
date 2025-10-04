/*
 * File: userEditHandlers.ts
 * Purpose: Event handlers for user edit form. Encapsulates form submission
 * logic and navigation callbacks. Keeps form component focused on rendering.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { buildFormData } from '../components/usersFormHelpers'
import type { UsersFormValues } from '../components/UsersForm'
import type { UsersFormState } from '../components/useUsersFormState'

export function createSubmitHandler(
  formState: UsersFormState,
  onSubmit: (values: UsersFormValues) => void
): (event: FormEvent<HTMLFormElement>) => void {
  return (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const data: UsersFormValues = buildFormData(
      formState.firstName,
      formState.lastName,
      formState.username,
      formState.email,
      formState.locale,
      formState.rolesString,
      formState.password,
      false
    )
    onSubmit(data)
  }
}

export function createCancelHandler(
  navigate: NavigateFunction,
  locale: string,
  userId: string
): () => void {
  return (): void => {
    void navigate(`/${locale}/users/${userId}`)
  }
}
