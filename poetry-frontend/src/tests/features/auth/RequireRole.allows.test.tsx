/*
 File: RequireRole.allows.test.tsx
 Purpose: Verifies RequireRole renders children when the required role is
 present on the session. The test ensures the guard component does not
 interfere with rendering of permitted content and that the happy path
 displays child nodes as expected. This provides confidence for route
 composition using role-based protection.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import * as session from '../../../shared/security/session/useSession'
import type { SessionHookResult } from '../../../shared/security/session/useSession'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RequireRole (allow)', () => {
  it('renders children with role', () => {
    const value: SessionHookResult = {
      status: 'authenticated',
      session: { userId: 'x', roles: ['admin'] },
    }
    vi.spyOn(session, 'useSession').mockReturnValue(value)
    const { getByText } = render(
      <MemoryRouter>
        <RequireRole role="admin">
          <div>secret</div>
        </RequireRole>
      </MemoryRouter>
    )
    expect(getByText('secret')).toBeTruthy()
  })
})
