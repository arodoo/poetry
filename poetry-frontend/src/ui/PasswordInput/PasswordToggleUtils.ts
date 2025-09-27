/*
 * File: PasswordToggleUtils.ts
 * Purpose: Small helper(s) for password toggle presentation. Keeps sizing
 * helpers separate from components to satisfy fast-refresh constraints.
 * All Rights Reserved. Arodi Emmanuel
 */
export function getPadClass(fieldSize: 'sm' | 'md' | 'lg'): string {
  const padMap: Record<string, string> = {
    sm: 'pr-9',
    md: 'pr-12',
    lg: 'pr-14',
  }
  return padMap[fieldSize] ?? 'pr-12'
}

export default getPadClass
