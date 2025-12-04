/*
 * File: index.ts
 * Purpose: Public exports for fingerprint feature module.
 * Exports types, hooks, routes for use by other modules.
 * Provides clean API for consuming fingerprint functionality.
 * All Rights Reserved. Arodi Emmanuel
 */

export { FingerprintRoutes } from './routing/fingerprintRoutes'
export {
  useFingerprintsListQuery,
  fingerprintQueryKeys,
} from './hooks/useFingerprintQueries'
export {
  useEnrollFingerprintMutation,
  useVerifyFingerprintMutation,
} from './hooks/useFingerprintMutations'
export type {
  EnrollRequest,
  VerifyRequest,
  FingerprintResponse,
  VerifyResponse,
} from './model/FingerprintSchemas'
