/*
 * File: httpErrors.ts
 * Purpose: Provide custom HTTP error types so performer logic stays short
 * and within repository limits.
 * All Rights Reserved. Arodi Emmanuel
 */
export class HttpError extends Error {
  public readonly status: number

  public constructor(status: number, body: string) {
    super(`HTTP ${String(status)}: ${body}`)
    this.status = status
  }
}
