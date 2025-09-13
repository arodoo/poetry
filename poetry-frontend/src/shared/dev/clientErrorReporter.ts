/*
 File: clientErrorReporter.ts
 Purpose: Bridge browser console output and runtime errors to the Vite
 dev server via a lightweight reporter. This improves observability in
 development by persisting logs to a file on every reload and capturing
 early failures consistently.
 All Rights Reserved. Arodi Emmanuel
*/
import { post, clearLog } from './logBridge/post'
import { wrapConsole } from './logBridge/consoleWrap'

clearLog()
wrapConsole('log')
wrapConsole('info')
wrapConsole('warn')
wrapConsole('error')

window.addEventListener('error', (e: ErrorEvent): void => {
  const stack: string | undefined = ((): string | undefined => {
    const val: unknown = e.error
    return val instanceof Error ? (val.stack ?? undefined) : undefined
  })()
  post({
    type: 'error',
    message: e.message,
    stack,
    source: e.filename,
    line: e.lineno,
    column: e.colno,
  })
})

window.addEventListener(
  'unhandledrejection',
  (e: PromiseRejectionEvent): void => {
    const r: unknown = e.reason
    const d:
      | { name: string; message: string; stack?: string | undefined }
      | { value: string } =
      r && typeof r === 'object'
        ? {
            name: (r as Record<string, unknown>)['name'] as string,
            message: (r as Record<string, unknown>)['message'] as string,
            stack: (r as Record<string, unknown>)['stack'] as
              | string
              | undefined,
          }
        : { value: String(r) }
    post({ type: 'unhandledrejection', ...d })
  }
)

console.log('[dev-start]', location.href, Date.now())
