/*
 * File: useListenerLoop.ts
 * Purpose: WebSocket-based fingerprint listener replacing HTTP long-polling.
 * Connects to /ws/fingerprint, authenticates via first frame, and calls
 * push() on every scan event. Reconnects automatically on drop.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback, useRef } from 'react'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'
import { useBanner } from '../../../shared/banner/BannerStore'

const RECONNECT_DELAY_MS = 2_000
const MAX_RECONNECT_DELAY_MS = 30_000

function buildWsUrl(): string {
  const proto = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${proto}//${window.location.host}/ws/fingerprint`
}

// Module-level flag — survives StrictMode double-mount
let listenerActive = false

export function useListenerLoop() {
  const { push } = useBanner()
  const delayRef = useRef(RECONNECT_DELAY_MS)
  const socketRef = useRef<WebSocket | null>(null)

  const stop = useCallback(() => {
    listenerActive = false
    socketRef.current?.close()
    socketRef.current = null
    console.info('[WS] stopped')
  }, [])

  const connect = useCallback(() => {
    if (!listenerActive) return
    const token = tokenStorage.load()?.accessToken ?? ''
    const ws = new WebSocket(buildWsUrl())
    socketRef.current = ws
    console.info('[WS] connecting...')

    ws.onopen = () => {
      console.info('[WS] connected — authenticating')
      ws.send(token)
      delayRef.current = RECONNECT_DELAY_MS
    }

    ws.onmessage = (ev: MessageEvent) => {
      try {
        const data = JSON.parse(ev.data as string) as {
          type: string
          userId?: number
        }
        if (data.type === 'MATCH' && data.userId != null) {
          void push(data.userId)
        } else if (data.type === 'UNKNOWN') {
          void push(null)
        }
      } catch {
        console.warn('[WS] bad frame:', ev.data)
      }
    }

    ws.onerror = (e) => console.error('[WS] error', e)

    ws.onclose = () => {
      console.info('[WS] closed — reconnecting in', delayRef.current, 'ms')
      if (!listenerActive) return
      setTimeout(() => {
        delayRef.current = Math.min(
          delayRef.current * 2,
          MAX_RECONNECT_DELAY_MS
        )
        connect()
      }, delayRef.current)
    }
  }, [push])

  const start = useCallback(() => {
    if (listenerActive) return
    listenerActive = true
    connect()
  }, [connect])

  return { start, stop }
}
