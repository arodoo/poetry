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
import { useCreateUserMutation } from './useUsersMutations'
import {
  createUserSubmitHandler,
  createUserCancelHandler,
} from './userCreateHandlers'
import { createMutationHandler } from './userCreateFingerprintHandlers'

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

  const handleCreateUser = createUserSubmitHandler(formState, (input) => {
    const handlers = createMutationHandler(
      pendingSlotId,
      locale,
      navigate,
      toast,
      t
    )
    mutation.mutate(input, handlers)
  })

  function handleFingerprintComplete(slotId: number): void {
    setPendingSlotId(slotId)
  }

  function handleSkipFingerprint(): void {
    setPendingSlotId(null)
  }

  const handleCancel = createUserCancelHandler(navigate, locale)

  return {
    formState,
    isSubmitting: mutation.isPending,
    handleCreateUser,
    handleFingerprintComplete,
    handleSkipFingerprint,
    handleCancel,
  }
}
