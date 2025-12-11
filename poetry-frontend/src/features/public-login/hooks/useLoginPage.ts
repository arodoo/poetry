/*
 * File: useLoginPage.ts
 * Purpose: Encapsulate state and submit logic for the public login page.
 * Keeps the page component small and focused on presentation.
 * All Rights Reserved. Arodi Emmanuel
 */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
// z not needed here; validation done via schema import
import { useT } from '../../../shared/i18n/useT'
import { useLogin } from '../hooks/useLogin'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { isMutationPending } from '../utils/loginHandlers'
import { LoginFormSchema } from '../model/PublicLoginSchemas'
import { classifyError } from '../utils/classifyError'
import { mapLoginErrors } from '../utils/loginValidation'
import type { UseLoginPageReturn, LoginForm } from './useLoginPage.types'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'
import type { NavigateFunction, Location } from 'react-router-dom'

export function useLoginPage(): UseLoginPageReturn {
  const t: ReturnType<typeof useT> = useT()
  const mutation: UseMutationResult<AuthTokens, Error, LoginForm> = useLogin()

  const navigate: NavigateFunction = useNavigate()
  const { locale } = useLocale() as { locale: string }
  const location: Location<unknown> = useLocation()
  const qs: URLSearchParams = new URLSearchParams(location.search)
  const toast: ReturnType<typeof useToast> = useToast()

  const initialForm: LoginForm = { username: '', password: '' }
  const [form, setForm] = useState<LoginForm>(initialForm)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string
    password?: string
  }>({})
  const [generalError, setGeneralError] = useState<string | null>(null)

  const onSubmit: React.FormEventHandler = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault()
      setFieldErrors({})
      setGeneralError(null)
      const parsed: ReturnType<typeof LoginFormSchema.safeParse> =
        LoginFormSchema.safeParse(form)
      if (!parsed.success) {
        const errs: unknown[] = parsed.error.errors
        const raw = mapLoginErrors(errs)
        const newErrors: { username?: string; password?: string } = {}
        if (raw.username) newErrors.username = t(raw.username)
        if (raw.password) newErrors.password = t(raw.password)
        setFieldErrors(newErrors)
        setGeneralError(t(classifyError('validation')))
        return
      }
      const ok: () => void = (): void => {
        navigate('/' + locale + '/dashboard', { replace: true })
      }
      const fail: (err: Error) => void = (err: Error): void => {
        setGeneralError(t(classifyError(String(err))))
      }
      mutation.mutate(form, { onSuccess: ok, onError: fail })
    },
    [form, mutation, navigate, locale, t]
  )

  return {
    t,
    form,
    setForm,
    onSubmit,
    isLoading: isMutationPending(mutation),
    error: generalError,
    fieldErrors,
    qs,
    toast,
    navigate,
    location,
  }
}
