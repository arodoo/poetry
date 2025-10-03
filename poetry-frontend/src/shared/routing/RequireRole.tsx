/*
File: RequireRole.tsx
Purpose: React route guard component that restricts access to children
based on user roles. It centralizes role-checking logic and navigation
behaviour (redirects to login or unauthorized pages), keeping the rest of
the routing code declarative and straightforward.
All Rights Reserved. Arodi Emmanuel
*/

import { type ReactNode, useEffect } from 'react'
import { useNavigate, type NavigateFunction } from 'react-router-dom'
import { useSession } from '../security/useSession'
import { buildLocalePath } from './localeUtils'

export interface RequireRoleProps {
  role: string
  children: ReactNode
  unauthorizedPath?: string
}

export function RequireRole(props: RequireRoleProps): ReactNode | null {
  const { role, children, unauthorizedPath }: RequireRoleProps = props
  const navigate: NavigateFunction = useNavigate()
  const { status, session } = useSession()
  const roles: readonly string[] = session?.roles ?? []
  const hasRole: boolean = roles.includes(role)

  useEffect((): void => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      void navigate(buildLocalePath('/login'), { replace: true })
    } else if (!hasRole) {
      const fallbackPath: string =
        unauthorizedPath ?? buildLocalePath('/dashboard')
      void navigate(fallbackPath, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, hasRole, unauthorizedPath])

  if (status !== 'authenticated' || !session || !hasRole) return null
  return <>{children}</>
}
