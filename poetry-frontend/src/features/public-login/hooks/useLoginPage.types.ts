/*
 * File: useLoginPage.types.ts
 * Purpose: Extracted types for the public login hook to keep the hook file
 * below repository max-lines. All Rights Reserved. Arodi Emmanuel
 */
import { type NavigateFunction, type Location } from 'react-router-dom'
import type { LoginForm as _LoginForm } from '../model/PublicLoginSchemas'
import type { useT as _useT } from '../../../shared/i18n/useT'
import type { useToast as _useToast } from '../../../shared/toast/toastContext'

export type LoginForm = _LoginForm

export interface UseLoginPageReturn {
  t: ReturnType<typeof _useT>
  form: LoginForm
  setForm: React.Dispatch<React.SetStateAction<LoginForm>>
  onSubmit: (e: React.FormEvent) => void
  isLoading: boolean
  error: string | null
  fieldErrors: { username?: string; password?: string }
  qs: URLSearchParams
  toast: ReturnType<typeof _useToast>
  navigate: NavigateFunction
  location: Location
}
