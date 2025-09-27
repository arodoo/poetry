/*
 * File: useAccountMutations.ts
 * Purpose: React Query mutations for account write operations such as
 * password updates. Keeps invalidation logic centralized and reusable.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
  type QueryClient,
} from '@tanstack/react-query'
import { updatePassword } from '../api/accountApi'
import { accountQueryKeys } from './useAccountQueries'
import { type AccountPasswordChangeRequest } from '../model/AccountSchemas'

export function useAccountPasswordMutation(): UseMutationResult<
  void,
  unknown,
  AccountPasswordChangeRequest
> {
  const queryClient: QueryClient = useQueryClient()

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: async (): Promise<void> => {
      await queryClient.invalidateQueries({
        queryKey: accountQueryKeys.locale(),
      })
    },
  })
}
