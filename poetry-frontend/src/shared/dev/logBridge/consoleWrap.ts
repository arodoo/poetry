/*
 File: consoleWrap.ts
 Purpose: Wraps console methods to fan-out messages both to the browser
 console and to the server endpoint used by the dev logging pipeline.
 This keeps original behavior while adding reliable server-side capture.
 All Rights Reserved. Arodi Emmanuel
*/
import { post } from './post'
import { toText, safeArgs } from './format'

export type ConsoleLevel = 'log' | 'info' | 'warn' | 'error'

export function wrapConsole(level: ConsoleLevel): void {
  const m: unknown = (
    console as unknown as Partial<
      Record<ConsoleLevel, (...a: unknown[]) => void>
    >
  )[level]
  const orig: ((...a: unknown[]) => void) | undefined =
    typeof m === 'function'
      ? (m as (...a: unknown[]) => void).bind(console)
      : undefined
  ;(console as unknown as Record<ConsoleLevel, (...a: unknown[]) => void>)[
    level
  ] = (...args: unknown[]): void => {
    try {
      if (orig) orig(...args)
    } catch {
      /* ignore */
    }
    post({
      type: 'console',
      level,
      text: toText(args),
      args: safeArgs(args),
      url: location.href,
      ts: Date.now(),
    })
  }
}
