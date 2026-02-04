/* File: useUsersCreatePage.ts - Hook logic for user creation page */
import { useRef } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { useUsersFormState } from '../components/form/useUsersFormState'
import type { UsersFormState } from '../components/form/useUsersFormState'
import { useCreateUserMutation } from './mutations/useUsersMutations'
import { createMutationHandler } from './handlers/userCreateFingerprintHandlers'
import { createHandleCreateUser } from './useUsersCreatePage.handlers'
export function useUsersCreatePage(
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
): {
  formState: UsersFormState
  isSubmitting: boolean
  handleCreateUser: (e: React.FormEvent<HTMLFormElement>) => void
  handleFingerprintComplete: (slotId: number) => void
  handleSkipFingerprint: () => void
  handleCancel: () => void
} {
  const mutation = useCreateUserMutation()
  const slotRef = useRef<number | null>(null)
  const formState = useUsersFormState()
  function handleFingerprintComplete(slotId: number): void {
    slotRef.current = slotId
  }

  function handleSkipFingerprint(): void {
    slotRef.current = null
  }
  const handleCreateUser = createHandleCreateUser(
    mutation,
    formState,
    slotRef,
    locale,
    navigate,
    toast,
    t,
    createMutationHandler
  )
  function handleCancel(): void {
    void navigate(`/${locale}/users`)
  }

  return {
    formState,
    isSubmitting: mutation.isPending,
    handleCreateUser,
    handleFingerprintComplete,
    handleSkipFingerprint,
    handleCancel,
  }
}
