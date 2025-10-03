/*
 File: tokenStorage.ts
 Purpose: Abstraction over token persistence to allow swapping storage.
 All Rights Reserved. Arodi Emmanuel
*/
export interface TokenBundle {
  accessToken: string
  refreshToken: string
}

export const TOKEN_STORAGE_KEY: string = 'poetry.auth.tokens'

type TokenListener = () => void

const subscribers: Set<TokenListener> = new Set<TokenListener>()

function notifySubscribers(): void {
  subscribers.forEach((listener: TokenListener): void => {
    listener()
  })
}

export const tokenStorage: {
  save: (tokens: TokenBundle) => void
  load: () => TokenBundle | null
  clear: () => void
  subscribe: (listener: TokenListener) => () => void
} = {
  save(tokens: TokenBundle): void {
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(tokens))
    notifySubscribers()
  },
  load(): TokenBundle | null {
    const raw: string | null = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!raw) return null
    try {
      return JSON.parse(raw) as TokenBundle
    } catch {
      return null
    }
  },
  clear(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    notifySubscribers()
  },
  subscribe(listener: TokenListener): () => void {
    subscribers.add(listener)
    return (): void => {
      subscribers.delete(listener)
    }
  },
} as const
