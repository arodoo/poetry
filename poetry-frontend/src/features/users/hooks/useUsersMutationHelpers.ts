/*
 * File: useUsersMutationHelpers.ts
 * Purpose: Shared utilities for users mutation hooks.
 * Uses generated UserResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import type { UserResponse } from '../../../api/generated'
import { usersQueryKeys } from './useUsersQueries'

export interface MutationVariables<TInput> {
  readonly id: string
  readonly input: TInput
  readonly etag?: string
}

export function useUsersMutationSuccess(): (detail: UserResponse) => void {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return (detail: UserResponse): void => {
    const casted: { id?: string | number } = detail as {
      id?: string | number
    }
    const id: string = String(casted.id)
    void queryClient.invalidateQueries({ queryKey: usersQueryKeys.root })
    void queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(id) })
  }
}

export function useUsersEntityMutation<TInput>(
  mutation: (id: string, input: TInput, etag?: string) => Promise<UserResponse>
): UseMutationResult<UserResponse, unknown, MutationVariables<TInput>> {
  const onSuccess: (detail: UserResponse) => void = useUsersMutationSuccess()
  return useMutation({
    mutationFn: (variables: MutationVariables<TInput>): Promise<UserResponse> =>
      mutation(variables.id, variables.input, variables.etag),
    onSuccess,
  })
}
