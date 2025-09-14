/*
 File: tokenStorage.ts
 Purpose: Abstraction over token persistence to allow swapping storage.
 All Rights Reserved. Arodi Emmanuel
*/
export interface TokenBundle {
  accessToken: string
  refreshToken: string
}

const KEY: string = 'poetry.auth.tokens'

export const tokenStorage: {
  save: (tokens: TokenBundle) => void
  load: () => TokenBundle | null
  clear: () => void
} = {
  save(tokens: TokenBundle): void {
    localStorage.setItem(KEY, JSON.stringify(tokens))
  },
  load(): TokenBundle | null {
    const raw: string | null = localStorage.getItem(KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as TokenBundle
    } catch {
      return null
    }
  },
  clear(): void {
    localStorage.removeItem(KEY)
  },
} as const
