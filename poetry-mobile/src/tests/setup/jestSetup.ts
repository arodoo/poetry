/*
 * File: jestSetup.ts
 * Purpose: Global Jest setup for mobile tests. Provides mock
 * implementations for expo-secure-store and expo-sqlite to
 * enable unit testing without native modules.
 * All Rights Reserved. Arodi Emmanuel
 */

jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>()
  return {
    setItemAsync: jest.fn(
      (key: string, val: string) => {
        store.set(key, val)
        return Promise.resolve()
      }
    ),
    getItemAsync: jest.fn((key: string) =>
      Promise.resolve(store.get(key) ?? null)
    ),
    deleteItemAsync: jest.fn((key: string) => {
      store.delete(key)
      return Promise.resolve()
    }),
    __store: store,
    __clear: () => store.clear(),
  }
})

jest.mock('expo-sqlite', () => ({
  openDatabaseAsync: jest.fn(() =>
    Promise.resolve({
      execAsync: jest.fn(() => Promise.resolve()),
      closeAsync: jest.fn(() => Promise.resolve()),
    })
  ),
}))

jest.mock('expo-constants', () => ({
  expoConfig: { extra: {} },
}))
