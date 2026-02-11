/*
 * File: userCreateFingerprintHandlers.ts
 * Purpose: Handlers for fingerprint enrollment during user creation.
 * Links fingerprint slot to newly created user via backend API.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { NavigateFunction } from 'react-router-dom'
import type { useT } from '../../../../shared/i18n/useT'
import type { useToast } from '../../../../shared/toast/toastContext'
import type { UserResponse } from '../../../../api/generated/types.gen'
import { linkFingerprintToUser as sdkLinkFingerprint } from '../../../../api/generated/sdk.gen'

export async function linkFingerprintToUser(
  userId: number,
  fmd: string
): Promise<void> {
  try {
    await sdkLinkFingerprint({
      path: { userId },
      body: { fmd },
    })
  } catch (error) {
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status
      if (status === 401) {
        throw new Error('ui.users.fingerprint.errors.unauthorized')
      }
      if (status === 404) {
        throw new Error('ui.users.fingerprint.errors.userNotFound')
      }
      if (status >= 500) {
        throw new Error('ui.users.fingerprint.errors.server')
      }
    }
    throw new Error('ui.users.fingerprint.errors.linkFailed')
  }
}

export function createMutationHandler(
  fmd: string | null,
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>
): {
  onSuccess: (user: UserResponse) => Promise<void>
  onError: (error: unknown) => void
} {
  return {
    onSuccess: async (user): Promise<void> => {
      console.log('[DEBUG] onSuccess - fmd:', fmd, 'userId:', user.id)
      if (fmd !== null && user.id !== undefined) {
        try {
          console.log('[DEBUG] Calling linkFingerprintToUser...')
          await linkFingerprintToUser(user.id, fmd)
          console.log('[DEBUG] Link successful')
        } catch (error) {
          console.error('Error linking fingerprint:', error)
          const errorKey = error instanceof Error ? error.message : 'error.unexpected'
          toast.push(t(errorKey))
        }
      } else {
        console.log('[DEBUG] Skipping link - fmd or userId missing')
      }
      toast.push(t('ui.users.toast.create.success'))
      void navigate(`/${locale}/users`)
    },
    onError: (error): void => {
      const errorKey =
        error instanceof Error ? error.message : 'ui.users.toast.create.error'
      const translated = t(errorKey)
      toast.push(translated !== errorKey ? translated : t('error.unexpected'))
    },
  }
}
