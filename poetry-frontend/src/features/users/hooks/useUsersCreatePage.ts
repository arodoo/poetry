/*
 * File: useUsersCreatePage.ts
 * Purpose: Hook with logic and handlers for user creation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, useRef, useCallback } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { useUsersFormState } from '../components/form/useUsersFormState'
import { useCreateUserMutation } from './mutations/useUsersMutations'
import { createMutationHandler } from './handlers/userCreateFingerprintHandlers'
import { buildFormData } from '../components/form/usersFormHelpers'
import { CreateUserSchema, type CreateUserInput } from '../model/UsersSchemas'
import { rollbackFingerprint } from '../components/fingerprint/rollback-fingerprint'
import { ZodError } from 'zod'

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

  const handleCreateUser = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault()
      try {
        const values = buildFormData(
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
        const input: CreateUserInput = CreateUserSchema.parse({
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          email: values.email,
          locale: values.locale,
          roles: values.roles,
          password: values.password ?? undefined,
          status: values.status,
        })
        const handlers = createMutationHandler(
          slotRef.current,
          locale,
          navigate,
          toast,
          t
        )
        mutation.mutate(input, handlers)
      } catch (error) {
        if (error instanceof ZodError) {
          toast.push(t(error.errors[0]?.message ?? 'users.validation.error'))
        } else {
          toast.push(t('ui.users.toast.create.error'))
        }
      }
    },
    [formState, locale, navigate, toast, t, mutation]
  )

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
