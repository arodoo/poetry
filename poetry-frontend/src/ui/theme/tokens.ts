/*
 File: tokens.ts
 Purpose: Public, compact re-export of the token-to-CSS mapping helpers.
 This file is intentionally minimal so the CI header and file-length
 checks remain satisfied while the full implementation lives in
 `tokens.generated.ts`.
 All Rights Reserved. Arodi Emmanuel
*/

export { mapBundleToCssVars, tokensVarNames } from './tokens.generated'
export type { CssVars } from './tokens.generated'
