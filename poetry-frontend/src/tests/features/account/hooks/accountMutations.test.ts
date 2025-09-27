/*
 * File: accountMutations.test.ts
 * Purpose: Ensure account mutations register the correct mutation fn.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it, vi } from 'vitest'

const spies = vi.hoisted(() => ({
  useMutationSpy: vi.fn(() => ({ isPending: false })),
  invalidateQueriesSpy: vi.fn(),
}))

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-query')>(
    '@tanstack/react-query'
  )
  return {
    ...actual,
    useMutation: spies.useMutationSpy,
    useQueryClient: () => ({
      invalidateQueries: spies.invalidateQueriesSpy,
    }),
  }
})

import { useAccountPasswordMutation } from '../../../../features/account'
import { updatePassword } from '../../../../features/account/api/accountApi'

describe('useAccountPasswordMutation', () => {
  it('wires updatePassword mutation fn', () => {
    useAccountPasswordMutation()
    expect(spies.useMutationSpy).toHaveBeenCalledWith(
      expect.objectContaining({ mutationFn: updatePassword })
    )
  })
})
