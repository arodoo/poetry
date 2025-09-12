/*
 File: tokens.generated.ts
 Purpose: Legacy aggregate kept for backward compatibility during refactor.
 Delegates to part1/part2 smaller files to respect max-lines rule.
 All Rights Reserved. Arodi Emmanuel
*/
export { VAR as tokensVarNames } from './tokens.generated.part1'
export type { CssVars } from './tokens.generated.part1'
export { mapBundleToCssVars } from './tokens.generated.part2'
