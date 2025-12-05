/*
 File: RequireAuth.tsx
 Purpose: Route guard that renders children only when a session exists.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../security/session/useSession'
import { buildLocalePath } from '../localeUtils'

export interface RequireAuthProps {
  children: ReactNode
  loginPath?: string
}

export function RequireAuth(props: RequireAuthProps): ReactNode | null {
  const { children, loginPath }: RequireAuthProps = props
  const { status, session } = useSession()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()

  useEffect((): void => {
    if (status === 'unauthenticated') {
      const redirectPath: string = loginPath ?? buildLocalePath('/login')
      void navigate(redirectPath, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, loginPath])

  if (status !== 'authenticated' || !session) return null
  return <>{children}</>
}
