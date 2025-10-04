/*
 * File: useUserMenuDependencies.ts
 * Purpose: Gather user menu dependencies so the core hook stays focused
 * on orchestration within the repository line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../i18n/useT'
import { useLogout } from '../../../../features/auth/hooks/useLogout'
import { useMeQuery } from '../../../../features/auth/hooks/useMe'

export interface UserMenuDependencies {
  readonly translate: ReturnType<typeof useT>
  readonly locale: string
  readonly logoutMutation: ReturnType<typeof useLogout>
  readonly navigate: ReturnType<typeof useNavigate>
  readonly username: string
}

export type LogoutMutation = ReturnType<typeof useLogout>
export type NavigateFunction = ReturnType<typeof useNavigate>

export function useUserMenuDependencies(): UserMenuDependencies {
  const translate: ReturnType<typeof useT> = useT()
  const params: { locale?: string } = useParams() as { locale?: string }
  const locale: string = params.locale ?? 'en'
  const logoutMutation: ReturnType<typeof useLogout> = useLogout()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const me: ReturnType<typeof useMeQuery> = useMeQuery()
  const username: string = me.data?.username ?? 'User'

  return {
    translate,
    locale,
    logoutMutation,
    navigate,
    username,
  }
}
