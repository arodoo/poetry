/*
 File: RequireRoles.tsx
 Purpose: Route guard allowing access if the user has any role in list.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../security/useSession'
import type { UserSession } from '../security/useSession'

export interface RequireRolesProps {
  roles: readonly string[]
  children: ReactNode
  unauthorizedPath?: string
}

export function RequireRoles(props: RequireRolesProps): ReactNode | null {
  const {
    roles,
    children,
    unauthorizedPath = '/unauthorized',
  }: RequireRolesProps = props
  const session: UserSession | null = useSession()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const userRoles: readonly string[] = (session?.roles ??
    []) as readonly string[]
  const allowed: boolean = roles.some((r: string): boolean =>
    userRoles.includes(r)
  )

  useEffect((): void => {
    if (!allowed) void navigate(unauthorizedPath, { replace: true })
  }, [allowed, navigate, unauthorizedPath])

  if (!allowed) return null
  return <>{children}</>
}
