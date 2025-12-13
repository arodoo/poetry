/*
 * File: userCreateHandlers.ts
 * Purpose: Event handlers for user creation form. Encapsulates submission
 * and navigation logic. Separates business logic from presentation layer.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import { ZodError } from 'zod'
import { buildFormData } from '../../components/form/usersFormHelpers'
import type { UsersFormValues } from '../../components/form/UsersForm'
import type { UsersFormState } from '../../components/form/useUsersFormState'
import type { useT } from '../../../../shared/i18n/useT'
import type { useToast } from '../../../../shared/toast/toastContext'
import {
  CreateUserSchema,
  type CreateUserInput,
} from '../../model/UsersSchemas'

export function createUserSubmitHandler(
  formState: UsersFormState,
  onSuccess: (input: CreateUserInput) => void,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
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
      if (error instanceof ZodError) {
        const firstError = error.errors[0]
        const message = t(firstError?.message ?? 'users.validation.error')
        toast.push(message)
      } else {
        toast.push(t('ui.users.toast.create.error'))
      }
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

