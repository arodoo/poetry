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
import { useSession, type UserSession } from '../security/useSession'

export interface RequireRoleProps {
  role: string
  children: ReactNode
  unauthorizedPath?: string
}

export function RequireRole(props: RequireRoleProps): ReactNode | null {
  const { role, children, unauthorizedPath = '/unauthorized' } = props
  const navigate: NavigateFunction = useNavigate()
  const session: UserSession | null = useSession()
  const roles: readonly string[] = session?.roles ?? []
  const hasRole: boolean = roles.includes(role)

  useEffect((): void => {
    if (!hasRole) void navigate(unauthorizedPath, { replace: true })
  }, [hasRole, navigate, unauthorizedPath])

  if (!hasRole) return null
  return <>{children}</>
}
