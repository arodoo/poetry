/* File: useUsersCreatePage.ts - Hook logic for user creation page */
import { useState, useRef } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { useUsersFormState } from '../components/form/useUsersFormState'
import type { UsersFormState } from '../components/form/useUsersFormState'
import { useCreateUserMutation } from './mutations/useUsersMutations'
import { createMutationHandler } from './handlers/userCreateFingerprintHandlers'
import { rollbackFingerprint } from '../components/fingerprint/rollback-fingerprint'
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
  const [pendingSlotId, setPendingSlotId] = useState<number | null>(null)
  const slotRef = useRef<number | null>(null)
  const formState = useUsersFormState()
  function handleFingerprintComplete(slotId: number): void {
    setPendingSlotId(slotId)
    slotRef.current = slotId
  }

  function handleSkipFingerprint(): void {
    setPendingSlotId(null)
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
    if (pendingSlotId !== null) {
      void rollbackFingerprint(pendingSlotId)
    }
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
