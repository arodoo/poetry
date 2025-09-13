/*
 File: format.ts
 Purpose: Provide formatting utilities for the dev log bridge. It
 converts console arguments into safe JSON and readable text while
 handling circular structures gracefully. These helpers are reused by
 the console wrapper to keep concerns separated and files concise.
 All Rights Reserved. Arodi Emmanuel
*/
export function toText(args: unknown[]): string {
  return args
    .map((x: unknown): string => {
      try {
        return typeof x === 'string' ? x : JSON.stringify(x)
      } catch {
        return String(x)
      }
    })
    .join(' ')
}

export function safeArgs(args: unknown[]): unknown[] {
  return args.map((x: unknown): unknown =>
    x instanceof Error
      ? { name: x.name, message: x.message, stack: x.stack ?? undefined }
      : x
  )
}
