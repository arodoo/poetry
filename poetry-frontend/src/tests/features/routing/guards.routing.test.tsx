/*
 File: guards.routing.test.tsx
 Purpose: Validate RequireAuth/RequireRoles with MemoryRouter.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { RequireAuth } from '../../../shared/routing/guards/RequireAuth'
import * as session from '../../../shared/security/session/useSession'
import type { SessionHookResult }
  from '../../../shared/security/session/useSession'

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

describe('route guards - auth', () => {
  it('RequireAuth redirects to login when unauthenticated', async () => {
    window.history.pushState(null, '', '/en/x')
    const unauth: SessionHookResult = {
      status: 'unauthenticated',
      session: null,
    }
    vi.spyOn(session, 'useSession').mockReturnValue(unauth)
    const { queryByText } = render(
      <MemoryRouter initialEntries={['/x']}>
        <Routes>
          <Route
            path="/x"
            element={
              <RequireAuth>
                <div>ok</div>
              </RequireAuth>
            }
          />
        </Routes>
      </MemoryRouter>
    )
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/en/login', { replace: true })
    })
    expect(queryByText('ok')).toBeNull()
  })
})
