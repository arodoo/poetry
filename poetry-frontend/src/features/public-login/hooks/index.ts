/*
 * File: index.ts
 * Purpose: Re-export public login hooks to provide shorter import paths
 * across the codebase while respecting repository limits.
 * All Rights Reserved. Arodi Emmanuel
 */
export { useLoginPage } from './useLoginPage'
export type { UseLoginPageReturn } from './useLoginPage.types'
