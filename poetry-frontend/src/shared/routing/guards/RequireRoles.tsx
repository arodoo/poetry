/*
 File: RequireRoles.tsx
 Purpose: Route guard allowing access if the user has any role in list.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../security/session/useSession'
import { buildLocalePath } from '../localeUtils'

export interface RequireRolesProps {
  roles: readonly string[]
  children: ReactNode
  unauthorizedPath?: string
}

export function RequireRoles(props: RequireRolesProps): ReactNode | null {
  const { roles, children, unauthorizedPath }: RequireRolesProps = props
  const { status, session } = useSession()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const userRoles: readonly string[] = (session?.roles ??
    []) as readonly string[]
  const allowed: boolean = roles.some((r: string): boolean =>
    userRoles.includes(r)
  )

  useEffect((): void => {
    if (status === 'loading') return
    if (status === 'unauthenticated') {
      void navigate(buildLocalePath('/login'), { replace: true })
    } else if (!allowed) {
      const fallbackPath: string =
        unauthorizedPath ?? buildLocalePath('/dashboard')
      void navigate(fallbackPath, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, allowed, unauthorizedPath])

  if (status !== 'authenticated' || !session || !allowed) return null
  return <>{children}</>
}
