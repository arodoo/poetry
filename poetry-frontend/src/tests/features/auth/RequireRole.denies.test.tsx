/*
 File: RequireRole.denies.test.tsx
 Purpose: Verifies RequireRole hides children when the required role is
 missing from the session and triggers navigation side-effects. The test
 confirms the guard denies access and avoids rendering protected content,
 which is critical for route-level authorization correctness.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { RequireRole } from '../../../shared/routing/guards/RequireRole'
import * as session from '../../../shared/security/session/useSession'
import type {
  SessionHookResult,
} from '../../../shared/security/session/useSession'

const navigateMock = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

beforeEach(() => {
  navigateMock.mockReset()
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('RequireRole (deny)', () => {
  it('redirects away and hides children', async () => {
    window.history.pushState(null, '', '/en/settings')
    const value: SessionHookResult = {
      status: 'authenticated',
      session: { userId: 'x', roles: [] },
    }
    vi.spyOn(session, 'useSession').mockReturnValue(value)
    const { queryByText } = render(
      <MemoryRouter>
        <RequireRole role="admin">
          <div>secret</div>
        </RequireRole>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/en/dashboard', {
        replace: true,
      })
    })
    expect(queryByText('secret')).toBeNull()
  })
})
