/*
 File: useTokensMutations.ts
 Purpose: React Query mutation hooks for updating token selection.
 Handles cache invalidation and optimistic updates following
 established mutation patterns. All Rights Reserved. Arodi Emmanuel
*/
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import { updateSelection } from '../api/tokensMutations'
import type { UpdateSelectionInput } from '../api/tokensApi'
import type { TokenBundle } from '../../../shared/fonts/loadFontTypes'
import { tokensQueryKeys } from './useTokensQueries'

export function useUpdateSelectionMutation(): UseMutationResult<
  unknown,
  Error,
  UpdateSelectionInput
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSelection,
    // Capture mutation variables to perform a precise optimistic cache update
    onSuccess: (_data: unknown, variables: UpdateSelectionInput): void => {
      // Invalidate queries so active queries become stale
      void queryClient.invalidateQueries({
        queryKey: tokensQueryKeys.all,
      })
      // Optimistic UI: update cached tokens bundle.current using the actual
      // mutation variables so the TokensProvider reapplies CSS vars
      // immediately and deterministically in tests.
      // Optimistically update the cached tokens bundle (safe narrowing)
      queryClient.setQueryData(tokensQueryKeys.all, (old: unknown) => {
        try {
          if (!old || typeof old !== 'object') return old
          const asRecord = old as Record<string, unknown>
          const copy: Record<string, unknown> = { ...asRecord }
          const bundle = copy['bundle'] as TokenBundle | undefined
          if (bundle && typeof bundle === 'object') {
            const nextBundle = {
              ...(bundle as unknown as Record<string, unknown>),
            }
            ;(nextBundle as Record<string, unknown>)['current'] = {
              theme: variables.theme,
              font: variables.font,
              fontSize: variables.fontSize,
              spacing: variables.spacing,
              radius: variables.radius,
              shadow: variables.shadow,
            }
            copy['bundle'] = nextBundle as unknown
          }
          return copy
        } catch {
          return old
        }
      })
      // Also force an immediate refetch of tokens to ensure UI applies
      // new CSS variables and fonts promptly in e2e runs.
      // This is safe: it only triggers a GET of the same resource.
      void queryClient
        .fetchQuery({ queryKey: tokensQueryKeys.all })
        .then(() => {
          try {
            if (typeof window !== 'undefined' && window.__E2E__ === true) {
              // mark the DOM so e2e tests can detect the refetch even if
              // network monitoring misses the request for any reason.
              try {
                document.documentElement.setAttribute(
                  'data-tokens-refetched',
                  String(Date.now())
                )
              } catch {
                // ignore DOM access failures
              }
            }
          } catch {
            // ignore
          }
        })
        .catch(() => {
          /* swallow fetch errors here; tokens provider will surface errors if needed */
        })
    },
  })
}
