/*
 File: tokenStorage.ts
 Purpose: Abstraction over token persistence to allow swapping storage.
 All Rights Reserved. Arodi Emmanuel
*/
export interface TokenBundle {
  accessToken: string
  refreshToken: string
}

export const TOKEN_STORAGE_KEY = 'poetry.auth.tokens'

type TokenListener = () => void

const subscribers: Set<TokenListener> = new Set<TokenListener>()
let cachedTokens: TokenBundle | null = null
let cachedRaw: string | null = null

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
    const raw: string = JSON.stringify(tokens)
    localStorage.setItem(TOKEN_STORAGE_KEY, raw)
    cachedRaw = raw
    cachedTokens = tokens
    notifySubscribers()
  },
  load(): TokenBundle | null {
    const raw: string | null = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!raw) {
      cachedRaw = null
      cachedTokens = null
      return null
    }
    // Return cached object if the raw string hasn't changed
    if (raw === cachedRaw && cachedTokens) {
      return cachedTokens
    }
    try {
      const parsed: TokenBundle = JSON.parse(raw) as TokenBundle
      cachedRaw = raw
      cachedTokens = parsed
      return parsed
    } catch {
      cachedRaw = null
      cachedTokens = null
      return null
    }
  },
  clear(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    cachedRaw = null
    cachedTokens = null
    notifySubscribers()
  },
  subscribe(listener: TokenListener): () => void {
    subscribers.add(listener)
    return (): void => {
      subscribers.delete(listener)
    }
  },
} as const
