/*
 File: loginHandlers.ts
 Purpose: Public thin module that re-exports login handler utilities for the
 public-login feature. This file intentionally only re-exports small
 specialized modules to keep its size minimal and stable across the codebase.
 All Rights Reserved. Arodi Emmanuel
*/

export { isMutationPending } from './loginHandlers.impl'
export { createOnSubmit } from './loginHandlers.impl'
export type { MutationLike, SafeParseResult } from './loginHandlers.types'
