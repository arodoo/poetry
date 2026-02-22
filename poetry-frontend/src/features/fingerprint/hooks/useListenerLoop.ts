/*
 * File: useListenerLoop.ts
 * Purpose: Fingerprint listener loop using backend capture and verify.
 * Calls /capture (blocks until finger), then /verify (matches FMD to userId).
 * Pushes banner on every detection. Stops cleanly on abort.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback } from 'react'
import { captureFingerprint, verifyFingerprint } from '../../../api/generated'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { useBanner } from '../../../shared/banner/BannerStore'

const CAPTURE_TIMEOUT_MS = 30000
const RETRY_DELAY_MS = 3000

// Module-level flag — survives StrictMode double-mount
let loopActive = false

export function useListenerLoop() {
  const { push } = useBanner()

  const stop = useCallback(() => {
    loopActive = false
  }, [])

  const start = useCallback(async () => {
    console.info('[Loop] start called, loopActive=', loopActive)
    if (loopActive) return
    loopActive = true
    console.info('[Loop] loop started')

    while (loopActive) {
      try {
        const token = tokenStorage.load()?.accessToken ?? ''
        const headers = { Authorization: `Bearer ${token}` }

        console.info('[Loop] calling capture...')
        const captured = await captureFingerprint({
          body: { timeoutMs: CAPTURE_TIMEOUT_MS },
          headers,
        })
        console.info('[Loop] capture result:', captured.data)

        if (!captured.data?.success || !captured.data.fmd) {
          console.info('[Loop] capture failed, retrying...')
          await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
          continue
        }

        console.info('[Loop] calling verify...')
        const verified = await verifyFingerprint({
          body: { fmd: captured.data.fmd },
          headers,
        })
        console.info('[Loop] verify result:', verified.data)

        if (verified.data?.matched && verified.data.userId) {
          console.info(
            '[Loop] pushing banner for userId:',
            verified.data.userId
          )
          void push(verified.data.userId)
        } else if (verified.data && !verified.data.matched) {
          console.info('[Loop] unknown finger, pushing null banner')
          void push(null)
        }
      } catch (err) {
        console.error('[Loop] error:', err)
        if (!loopActive) break
        await new Promise((r) => setTimeout(r, RETRY_DELAY_MS))
      }
    }
    console.info('[Loop] loop stopped')
  }, [push])

  return { start, stop }
}
