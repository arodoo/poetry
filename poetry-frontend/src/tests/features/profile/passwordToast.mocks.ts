/*
 * File: passwordToast.mocks.ts
 * Purpose: Provide hoisted mocks for profile password toast tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { vi } from 'vitest'
import type { Mock } from 'vitest'
import type { ProfileHookMocks } from './testUtils'

interface AccountApiMockBundle {
  readonly updatePassword: Mock
}

const accountApiMocks: AccountApiMockBundle = vi.hoisted(
  (): AccountApiMockBundle => ({
    updatePassword: vi.fn().mockResolvedValue(undefined),
  })
)

vi.mock(
  '../../../features/account/api/accountApi',
  async (
    importOriginal: () => Promise<
      typeof import('../../../features/account/api/accountApi')
    >
  ): Promise<typeof import('../../../features/account/api/accountApi')> => {
    const actual: typeof import('../../../features/account/api/accountApi') =
      await importOriginal()
    return {
      ...actual,
      updatePassword: accountApiMocks.updatePassword,
    }
  }
)

const profileMocks: ProfileHookMocks = vi.hoisted(
  (): ProfileHookMocks => ({
    useProfileSummaryQuery: vi.fn(),
    useProfileSummaryMutation: vi.fn(),
  })
)

vi.mock(
  '../../../features/profile/hooks/useProfileQueries',
  (): {
    useProfileSummaryQuery: ProfileHookMocks['useProfileSummaryQuery']
    useProfileSummaryMutation: ProfileHookMocks['useProfileSummaryMutation']
  } => ({
    useProfileSummaryQuery: profileMocks.useProfileSummaryQuery,
    useProfileSummaryMutation: profileMocks.useProfileSummaryMutation,
  })
)

export { updatePassword } from '../../../features/account/api/accountApi'

export function getProfileMocks(): ProfileHookMocks {
  return profileMocks
}
