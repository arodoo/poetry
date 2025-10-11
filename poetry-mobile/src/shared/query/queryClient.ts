/*
 * File: queryClient.ts
 * Purpose: TanStack Query client configuration for server state.
 * Centralized defaults for staleTime, gcTime, and retry behavior
 * to ensure consistent caching and refetching across the app.
 * All Rights Reserved. Arodi Emmanuel
 */
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      gcTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
})
