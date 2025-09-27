/*
 * File: profileApi.test.ts
 * Purpose: Ensure profile API wrappers validate summary payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import {
  fetchProfileSummary,
  updateProfileSummary,
} from '../../../../features/profile'

const summary = {
  username: 'aurora',
  email: 'aurora@example.com',
  locale: 'en-US',
  version: 'v1',
}

describe('profileApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses summary response from sdk', async () => {
    vi.spyOn(sdk, 'getProfileSummaryRaw').mockResolvedValue(summary)
    const result = await fetchProfileSummary()
    expect(result.username).toBe('aurora')
  })

  it('rejects invalid update payload without sdk call', async () => {
    const spy = vi.spyOn(sdk, 'putProfileSummary')
    await expect(
      updateProfileSummary({ username: '', version: 'v1' })
    ).rejects.toThrow()
    expect(spy).not.toHaveBeenCalled()
  })

  it('returns updated summary from sdk', async () => {
    const spy = vi.spyOn(sdk, 'putProfileSummary').mockResolvedValue(summary)
    const result = await updateProfileSummary({
      username: 'nova',
      version: 'v1',
    })
    expect(spy).toHaveBeenCalledWith({
      username: 'nova',
      version: 'v1',
    })
    expect(result.locale).toBe('en-US')
  })
})
