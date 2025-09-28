/*
 * File: index.ts
 * Purpose: Barrel export for the public register model. Re-exports schemas
 * so other modules can import from a single concise path.
 * All Rights Reserved. Arodi Emmanuel
 */

export * from './PublicRegisterSchemas'

// Backwards-compatible aliases for existing tests and modules that still
// reference the previous symbol names. These aliases are minimal and simply
// re-export the new symbols under the legacy names.
export {
  PublicRegisterRequestSchema as RegisterFormSchema,
  PublicRegisterResultSchema as RegisterResultSchema,
} from './PublicRegisterSchemas'
export type {
  PublicRegisterRequest as RegisterForm,
  PublicRegisterResult as RegisterResult,
} from './PublicRegisterSchemas'
