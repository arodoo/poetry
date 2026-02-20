import type { NavigateFunction } from 'react-router-dom'
import type { RefObject } from 'react'
import type { useT } from '../../../shared/i18n/useT'
import type { useToast } from '../../../shared/toast/toastContext'
import { CreateUserSchema, type CreateUserInput } from '../model/UsersSchemas'
import { buildFormData } from '../components/form/usersFormHelpers'
import { ZodError } from 'zod'
import type { UsersFormState } from '../components/form/useUsersFormState'

export function createHandleCreateUser(
  mutation: {
    mutateAsync: (...args: any[]) => Promise<unknown>
    isPending?: boolean
  },
  formState: UsersFormState,
  slotRef: RefObject<string | null>,
  locale: string,
  navigate: NavigateFunction,
  toast: ReturnType<typeof useToast>,
  t: ReturnType<typeof useT>,
  createMutationHandler: (
    fmd: string | null,
    locale: string,
    navigate: NavigateFunction,
    toast: ReturnType<typeof useToast>,
    t: ReturnType<typeof useT>
  ) => unknown
) {
  return function handleCreateUser(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    try {
      const values = buildFormData(formState, true)
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
        slotRef.current ?? null,
        locale,
        navigate,
        toast,
        t
      )
      void mutation.mutateAsync(input, handlers)
    } catch (error) {
      if (error instanceof ZodError) {
        toast.push(t(error.errors[0]?.message ?? 'users.validation.error'))
      } else {
        toast.push(t('ui.users.toast.create.error'))
      }
    }
  }
}
