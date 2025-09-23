/*
 * File: performRequest.ts
 * Purpose: Low-level HTTP request performer extracted to keep the parent
 * file small and under repository line/size thresholds.
 * All Rights Reserved. Arodi Emmanuel
 */
type Tokens = { accessToken?: string; refreshToken?: string } | null
type RefreshFn = () => Promise<{ accessToken: string } | null>
type DelayFn = (ms: number) => Promise<void>

export async function performRequest<T>(
  url: string,
  retryCfg: { maxAttempts: number; backoffMs: number },
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body: BodyInit | null,
  defaultHeaders: Record<string, string>,
  optionsHeaders: Record<string, string> | undefined,
  signal: AbortSignal | undefined,
  tokens: Tokens,
  refreshTokenIfNeeded: RefreshFn,
  delay: DelayFn
): Promise<T> {
  let lastErr: Error | null = null
  const headersBase: Record<string, string> = {
    ...defaultHeaders,
    ...(optionsHeaders ?? {}),
  }
  for (let attempt: number = 1; attempt <= retryCfg.maxAttempts; attempt++) {
    const controller: AbortController = new AbortController()
    const combinedSignal: AbortSignal = signal ?? controller.signal
    try {
      const useBody: BodyInit | null =
        method === 'GET' || body === null ? null : body
      const res: Response = await fetch(url, {
        method,
        headers: headersBase,
        body: useBody,
        signal: combinedSignal,
      })
      if (!res.ok) {
        if (res.status === 401 && tokens?.refreshToken && attempt === 1) {
          try {
            const newTokens: { accessToken: string } | null =
              await refreshTokenIfNeeded()
            if (newTokens) {
              headersBase['Authorization'] = `Bearer ${newTokens.accessToken}`
              continue
            }
          } catch (_err: unknown) {
            // ignore refresh errors and continue to error handling
            void _err
          }
        }
        if (res.status >= 500 && res.status < 600) {
          const statusText: string = String(res.status)
          throw new Error(`HTTP ${statusText}`)
        }
        const text: string = await res.text()
        const errMsg: string = `HTTP ${String(res.status)}: ${text}`
        throw new Error(errMsg)
      }
      const json: T = (await res.json()) as T
      return json
    } catch (err: unknown) {
      lastErr = err instanceof Error ? err : new Error(String(err))
      if (attempt === retryCfg.maxAttempts) break
      await delay(retryCfg.backoffMs)
    }
  }
  throw lastErr ?? new Error('Unknown HTTP error')
}
