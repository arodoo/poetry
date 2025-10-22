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
import { updateSelection, type UpdateSelectionInput } from '../api/tokensApi'
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
      try {
        queryClient.setQueryData(tokensQueryKeys.all, (old: unknown) => {
          try {
            if (!old || typeof old !== 'object') return old
            // old is expected to be { bundle: TokenBundle, etag: string | null }
            // Create a shallow copy and update bundle.current with variables
            // @ts-ignore - runtime shape guard above
            const copy: any = { ...(old as any) }
            if (copy.bundle && typeof copy.bundle === 'object') {
              copy.bundle = { ...(copy.bundle as Record<string, unknown>) }
              copy.bundle.current = {
                theme: variables.theme,
                font: variables.font,
                fontSize: variables.fontSize,
                spacing: variables.spacing,
                radius: variables.radius,
                shadow: variables.shadow,
              }
            }
            return copy
          } catch (e) {
            return old
          }
        })
      } catch (e) {
        // ignore optimistic update failures
      }
      // Also force an immediate refetch of tokens to ensure UI applies
      // new CSS variables and fonts promptly in e2e runs.
      // This is safe: it only triggers a GET of the same resource.
      void queryClient
        .fetchQuery({ queryKey: tokensQueryKeys.all })
        .then(() => {
          try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if ((window as any).__E2E__ === true) {
              // mark the DOM so e2e tests can detect the refetch even if
              // network monitoring misses the request for any reason.
              try {
                document.documentElement.setAttribute(
                  'data-tokens-refetched',
                  String(Date.now())
                )
              } catch (e) {
                // ignore DOM access failures
              }
            }
          } catch (e) {
            // ignore
          }
        })
        .catch(() => {
          /* swallow fetch errors here; tokens provider will surface errors if needed */
        })
    },
  })
}
