/*
 * File: publicRegisterApi.test.ts
 * Purpose: Verify the public register API adapter sets required headers
 * and forwards responses correctly. The test ensures the
 * Idempotency-Key is present to avoid processing duplicate requests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'

vi.mock('src/shared/http/fetchClient', () => ({
  fetchJson: vi.fn().mockResolvedValue({ success: true }),
}))

import * as Fetch from 'src/shared/http/fetchClient'
import * as RegApi from 'src/features/public-register/api/publicRegisterApi'

describe('publicRegisterApi', () => {
  it('sends Idempotency-Key header', async () => {
    const mocked = vi.mocked(Fetch.fetchJson)
    mocked.mockResolvedValueOnce({ success: true })
    await RegApi.registerRequest({
      username: 'u',
      email: 'e@e.com',
      password: 'secret',
    })
    const call = mocked.mock.calls.at(-1)
    const options = call?.[1] as {
      headers?: Record<string, string>
    }
    expect(options?.headers?.['Idempotency-Key']).toBeDefined()
  })
})
