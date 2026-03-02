/*
 * File: StorageError.ts
 * Purpose: Typed error class for all storage operations. Wraps
 * SQLite and SecureStore errors with a consistent interface.
 * Includes operation context for debugging and logging.
 * All Rights Reserved. Arodi Emmanuel
 */

export class StorageError extends Error {
  readonly operation: string
  readonly cause?: unknown

  constructor(
    operation: string,
    message: string,
    cause?: unknown
  ) {
    super(`[${operation}] ${message}`)
    this.name = 'StorageError'
    this.operation = operation
    this.cause = cause
  }
}
