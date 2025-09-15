/*
 File: RequireRole.allows.test.tsx
 Purpose: Verifies RequireRole renders children when the required role is
 present on the session. The test ensures the guard component does not
 interfere with rendering of permitted content and that the happy path
 displays child nodes as expected. This provides confidence for route
 composition using role-based protection.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { RequireRole } from '../../../shared/routing/RequireRole'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as session from '../../../shared/security/useSession'

describe('RequireRole (allow)', () => {
  it('renders children with role', () => {
    vi.spyOn(session, 'useSession').mockReturnValue({
      userId: 'x',
      roles: ['admin'],
    })
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
