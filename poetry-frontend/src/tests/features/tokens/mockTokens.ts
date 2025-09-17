/*
 File: mockTokens.ts
 Purpose: Mock for TokensProvider test.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest'
import { mockBundle } from './mockData'

vi.mock('../../../features/tokens/hooks/useTokensQueries', (): any => ({
  useTokensQuery: (): any => ({
    data: {
      bundle: mockBundle,
      etag: 'W/"123"',
    },
    isLoading: false,
    error: null,
  }),
}))
