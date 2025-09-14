/*
 File: RequireAuth.tsx
 Purpose: Route guard that renders children only when a session exists.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession, type UserSession } from '../security/useSession'

export interface RequireAuthProps {
  children: ReactNode
  loginPath?: string
}

export function RequireAuth(props: RequireAuthProps): ReactNode | null {
  const { children, loginPath = '/unauthorized' }: RequireAuthProps = props
  const session: UserSession | null = useSession()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()

  useEffect((): void => {
    if (!session) void navigate(loginPath, { replace: true })
  }, [session, navigate, loginPath])

  if (!session) return null
  return <>{children}</>
}
