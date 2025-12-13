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
import { rollbackFingerprint } from '../../components/fingerprint/rollback-fingerprint'

export async function linkFingerprintToUser(
  userId: number,
  slotId: number
): Promise<void> {
  const baseUrl =
    (import.meta.env['VITE_API_URL'] as string | undefined) ??
    'http://localhost:8080'
  const response = await fetch(
    `${baseUrl}/api/v1/users/${String(userId)}/fingerprints/link`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ slotId }),
    }
  )
  if (!response.ok) {
    throw new Error('Failed to link fingerprint')
  }
}

export function createMutationHandler(
  slotId: number | null,
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
      if (slotId !== null && user.id !== undefined) {
        try {
          await linkFingerprintToUser(user.id, slotId)
        } catch (error) {
          console.error('Error linking fingerprint:', error)
        }
      }
      toast.push(t('ui.users.toast.create.success'))
      void navigate(`/${locale}/users`)
    },
    onError: (error): void => {
      if (slotId !== null) {
        void rollbackFingerprint(slotId)
      }
      toast.push(
        error instanceof Error
          ? error.message
          : t('ui.users.toast.create.error')
      )
    },
  }
}
