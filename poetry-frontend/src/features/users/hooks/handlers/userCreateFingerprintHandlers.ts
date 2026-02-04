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
import { tokenStorage } from '../../../../shared/security/tokens/tokenStorage'

export async function linkFingerprintToUser(
  userId: number,
  fmd: string
): Promise<void> {
  const baseUrl =
    (import.meta.env['VITE_API_URL'] as string | undefined) ??
    'http://localhost:8080'
  const tokens = tokenStorage.load()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (tokens?.accessToken) {
    headers['Authorization'] = `Bearer ${tokens.accessToken}`
  }
  const response = await fetch(
    `${baseUrl}/api/v1/users/${String(userId)}/fingerprints/link`,
    {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify({ fmd }),
    }
  )
  if (!response.ok) {
    throw new Error('Failed to link fingerprint')
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
