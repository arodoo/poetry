/*
 * File: useUsersCreatePage.ts
 * Purpose: Hook with logic and handlers for user creation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { useUsersFormState } from '../components/useUsersFormState'
import { useCreateUserMutation } from '../hooks/useUsersMutations'
import type { CreateUserInput } from '../model/UsersSchemas'
import {
  createUserSubmitHandler,
  createUserCancelHandler,
} from './userCreateHandlers'

export function useUsersCreatePage(
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
): {
  formState: ReturnType<typeof useUsersFormState>
  createdUserId: number | null
  isSubmitting: boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  handleCancel: () => void
  handleFingerprintSuccess: () => void
  handleSkipFingerprint: () => void
} {
  const mutation = useCreateUserMutation()
  const [createdUserId, setCreatedUserId] = useState<number | null>(null)
  const formState = useUsersFormState()

  const handleSubmit = createUserSubmitHandler(
    formState,
    (input: CreateUserInput): void => {
      mutation.mutate(input, {
        onSuccess: (user): void => {
          toast.push(t('ui.users.toast.create.success'))
          setCreatedUserId(user.id ?? 0)
        },
        onError: (error): void => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : t('ui.users.toast.create.error')
          toast.push(errorMessage)
        },
      })
    }
  )

  const handleCancel = createUserCancelHandler(navigate, locale)

  function handleFingerprintSuccess(): void {
    void navigate(`/${locale}/users`)
  }

  function handleSkipFingerprint(): void {
    void navigate(`/${locale}/users`)
  }

  return {
    formState,
    createdUserId,
    isSubmitting: mutation.isPending,
    handleSubmit,
    handleCancel,
    handleFingerprintSuccess,
    handleSkipFingerprint,
  }
}
