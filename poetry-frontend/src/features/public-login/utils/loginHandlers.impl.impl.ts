/*
 File: loginHandlers.impl.impl.ts
 Purpose: Concrete createOnSubmit implementation split from the impl module.
 All Rights Reserved. Arodi Emmanuel
*/
import type { LoginForm } from '../model/PublicLoginSchemas'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'
import type { SafeParseResult } from './loginHandlers.types'

export type MutationLike = UseMutationResult<AuthTokens, Error, LoginForm>

export function createOnSubmit(params: {
  form: LoginForm
  setFieldErrors: (v: { username?: string; password?: string }) => void
  setGeneralError: (v: string | null) => void
  mutation: MutationLike
  locale: string
  navigate: (p: string, opts?: { replace?: boolean }) => void
  loginSchema: { safeParse: (f: LoginForm) => SafeParseResult }
  classifyError: (s: string) => string
  mapLoginErrors: (e: unknown[]) => { username?: string; password?: string }
}): (e: React.FormEvent) => Promise<void> {
  const form: LoginForm = params.form
  const setFieldErrors: (v: { username?: string; password?: string }) => void =
    params.setFieldErrors
  const setGeneralError: (v: string | null) => void = params.setGeneralError
  const mutation: MutationLike = params.mutation
  const locale: string = params.locale
  const navigate: (p: string, opts?: { replace?: boolean }) => void =
    params.navigate
  const loginSchema: {
    safeParse: (f: LoginForm) => SafeParseResult
  } = params.loginSchema
  const classifyError: (s: string) => string = params.classifyError
  const mapLoginErrors: (e: unknown[]) => {
    username?: string
    password?: string
  } = params.mapLoginErrors

  return async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setFieldErrors({})
    setGeneralError(null)

    const parsed: SafeParseResult = loginSchema.safeParse(form)
    if (!parsed.success) {
      const errs: unknown[] = parsed.error?.errors ?? []
      const fieldErrs: { username?: string; password?: string } =
        mapLoginErrors(errs)
      setFieldErrors(fieldErrs)
      return
    }

    try {
      const data: LoginForm = (parsed as { success: true; data: LoginForm })
        .data
      await mutation.mutateAsync(data)
      const dashPath = `/${locale}/dashboard`
      navigate(dashPath, { replace: true })
    } catch (caught: unknown) {
      const errorMsg: string =
        caught instanceof Error ? caught.message : String(caught)
      setGeneralError(classifyError(errorMsg))
    }
  }
}
