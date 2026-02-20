/* File: useUsersCreatePage.ts - Hook logic for user creation page */
import { useRef } from 'react'
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import type { UserResponse } from '../../../api/generated/types.gen'
import { useUsersFormState } from '../components/form/useUsersFormState'
import type { UsersFormState } from '../components/form/useUsersFormState'
import { useCreateUserMutation } from './mutations/useUsersMutations'
import { createMutationHandler } from './handlers/userCreateFingerprintHandlers'
import { createHandleCreateUser } from './useUsersCreatePage.handlers'
import { useUserDemographicsForm } from '../../userdemographics/hooks/useUserDemographicsForm'
import type { UserDemographicsFormState } from '../../userdemographics/hooks/useUserDemographicsForm'
import { useUserAddressForm } from '../../useraddress/hooks/useUserAddressForm'
import type { UserAddressFormState } from '../../useraddress/hooks/useUserAddressForm'

export function useUsersCreatePage(
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
): {
  formState: UsersFormState
  demographicsState: UserDemographicsFormState
  addressState: UserAddressFormState
  isSubmitting: boolean
  handleCreateUser: (e: React.FormEvent<HTMLFormElement>) => void
  handleFingerprintComplete: (fmd: string) => void
  handleSkipFingerprint: () => void
  handleCancel: () => void
} {
  const mutation = useCreateUserMutation()
  const slotRef = useRef<string | null>(null)
  const formState = useUsersFormState()
  const demographicsState = useUserDemographicsForm()
  const addressState = useUserAddressForm()

  function handleFingerprintComplete(fmd: string): void {
    slotRef.current = fmd
  }

  function handleSkipFingerprint(): void {
    slotRef.current = null
  }

  function createMutationHandlerWithProfile(
    fmd: string | null,
    loc: string,
    nav: NavigateFunction,
    tst: ReturnType<typeof useToast>,
    tr: ReturnType<typeof useT>
  ) {
    const base = createMutationHandler(fmd, loc, nav, tst, tr)
    return {
      ...base,
      onSuccess: async (user: UserResponse): Promise<void> => {
        if (user.id !== undefined) {
          await Promise.allSettled([
            demographicsState.saveForUser(user.id),
            addressState.saveForUser(user.id),
          ])
        }
        await base.onSuccess(user)
      },
    }
  }

  const handleCreateUser = createHandleCreateUser(
    mutation,
    formState,
    slotRef,
    locale,
    navigate,
    toast,
    t,
    createMutationHandlerWithProfile
  )

  function handleCancel(): void {
    void navigate(`/${locale}/users`)
  }

  return {
    formState,
    demographicsState,
    addressState,
    isSubmitting: mutation.isPending,
    handleCreateUser,
    handleFingerprintComplete,
    handleSkipFingerprint,
    handleCancel,
  }
}
