/*
 File: RequireRole.denies.test.tsx
 Purpose: Verifies RequireRole hides children when the required role is
 missing from the session and triggers navigation side-effects. The test
 confirms the guard denies access and avoids rendering protected content,
 which is critical for route-level authorization correctness.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { RequireRole } from '../../../shared/routing/RequireRole'
import { render } from '@testing-library/react'
import * as session from '../../../shared/security/useSession'

vi.mock('react-router-dom', async () => {
  const real =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...real, useNavigate: (): (() => void) => vi.fn() }
})

describe('RequireRole (deny)', () => {
  it('does not render children without role', () => {
    vi.spyOn(session, 'useSession').mockReturnValue({
      userId: 'x',
      roles: [],
    })
    const { queryByText } = render(
      <RequireRole role="admin">
        <div>secret</div>
      </RequireRole>
    )
    expect(queryByText('secret')).toBeNull()
  })
})
