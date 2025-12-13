/*
 * File: useUsersCreatePage.ts
 * Purpose: Hook with logic and handlers for user creation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { useUsersFormState } from '../components/form/useUsersFormState'
import { useCreateUserMutation } from './mutations/useUsersMutations'
import { createUserSubmitHandler } from './handlers/userCreateHandlers'
import { createMutationHandler } from './handlers/userCreateFingerprintHandlers'
import { rollbackFingerprint } from '../components/fingerprint/rollback-fingerprint'

export function useUsersCreatePage(
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
): {
  formState: ReturnType<typeof useUsersFormState>
  isSubmitting: boolean
  handleCreateUser: (e: React.FormEvent<HTMLFormElement>) => void
  handleFingerprintComplete: (slotId: number) => void
  handleSkipFingerprint: () => void
  handleCancel: () => void
} {
  const mutation = useCreateUserMutation()
  const [pendingSlotId, setPendingSlotId] = useState<number | null>(null)
  const formState = useUsersFormState()

  const handleCreateUser = createUserSubmitHandler(
    formState,
    (input) => {
      const handlers = createMutationHandler(
        pendingSlotId,
        locale,
        navigate,
        toast,
        t
      )
      mutation.mutate(input, handlers)
    },
    toast,
    t
  )

  function handleFingerprintComplete(slotId: number): void {
    setPendingSlotId(slotId)
  }

  function handleSkipFingerprint(): void {
    setPendingSlotId(null)
  }

  function handleCancel(): void {
    if (pendingSlotId !== null) {
      void rollbackFingerprint(pendingSlotId)
    }
    navigate(`/${locale}/users`)
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
