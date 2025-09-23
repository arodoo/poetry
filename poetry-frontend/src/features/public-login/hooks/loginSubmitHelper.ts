/*
 * File: loginSubmitHelper.ts
 * Purpose: Extracted submit logic to keep useLoginPage under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { LoginForm } from '../model/PublicLoginSchemas'
import { LoginFormSchema } from '../model/PublicLoginSchemas'
import { classifyError } from '../utils/classifyError'
import { mapLoginErrors } from '../utils/loginValidation'
import type { UseMutationResult } from '@tanstack/react-query'
import type { AuthTokens } from '../../auth/model/AuthTokensSchemas'

export interface SubmitHelperParams {
  form: LoginForm
  setFieldErrors: (errors: { username?: string; password?: string }) => void
  setGeneralError: (error: string | null) => void
  mutation: UseMutationResult<AuthTokens, Error, LoginForm>
  navigate: (path: string, options?: { replace?: boolean }) => void
  locale: string
}

export function createSubmitHandler(
  params: SubmitHelperParams
): React.FormEventHandler {
  return (e: React.FormEvent): void => {
    e.preventDefault()
    params.setFieldErrors({})
    params.setGeneralError(null)
    const parsed: ReturnType<typeof LoginFormSchema.safeParse> =
      LoginFormSchema.safeParse(params.form)
    if (!parsed.success) {
      const errs: unknown[] = parsed.error.errors
      params.setFieldErrors(mapLoginErrors(errs))
      params.setGeneralError(classifyError('validation'))
      return
    }
    // Defer promise chain outside synchronous return path
    queueMicrotask((): void => {
      params.mutation
        .mutateAsync(params.form)
        .then((): void => {
          params.navigate(`/${params.locale}/dashboard`, { replace: true })
        })
        .catch((err: unknown): void => {
          params.setGeneralError(classifyError(String(err)))
        })
    })
  }
}
