/*
 File: guards.routing.test.tsx
 Purpose: Validate RequireAuth/RequireRoles with MemoryRouter.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render } from '@testing-library/react'
import { RequireAuth } from '../../../shared/routing/RequireAuth'
import { RequireRoles } from '../../../shared/routing/RequireRoles'
import * as session from '../../../shared/security/useSession'

vi.mock('react-router-dom', async () => {
  const real =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...real, useNavigate: () => vi.fn() }
})

describe('route guards', () => {
  it('RequireAuth blocks when no session', () => {
    vi.spyOn(session, 'useSession').mockReturnValue(null)
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
    expect(queryByText('ok')).toBeNull()
  })

  it('RequireRoles allows with matching role', () => {
    vi.spyOn(session, 'useSession').mockReturnValue({
      userId: 'u',
      roles: ['a'],
    })
    const roles = ['a', 'b']
    const { getByText } = render(
      <MemoryRouter initialEntries={['/x']}>
        <Routes>
          <Route
            path="/x"
            element={
              <RequireRoles roles={roles}>
                <div>ok</div>
              </RequireRoles>
            }
          />
        </Routes>
      </MemoryRouter>
    )
    expect(getByText('ok')).toBeTruthy()
  })
})
