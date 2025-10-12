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
  void,
  Error,
  UpdateSelectionInput
> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateSelection,
    onSuccess: (): void => {
      void queryClient.invalidateQueries({
        queryKey: tokensQueryKeys.all,
      })
    },
  })
}
