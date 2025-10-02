/*
 * File: useUsersMutationHelpers.ts
 * Purpose: Shared utilities for users mutation hooks.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import type { UserDetail } from '../model/UsersSchemas'
import { usersQueryKeys } from './useUsersQueries'

export interface MutationVariables<TInput> {
  readonly id: string
  readonly input: TInput
}

export function useUsersMutationSuccess(): (detail: UserDetail) => void {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return (detail: UserDetail): void => {
    const casted: { id: string | number } = detail as {
      id: string | number
    }
    const id: string = String(casted.id)
    void queryClient.invalidateQueries({ queryKey: usersQueryKeys.list() })
    void queryClient.invalidateQueries({ queryKey: usersQueryKeys.detail(id) })
  }
}

export function useUsersEntityMutation<TInput>(
  mutation: (id: string, input: TInput) => Promise<UserDetail>
): UseMutationResult<UserDetail, unknown, MutationVariables<TInput>> {
  const onSuccess: (detail: UserDetail) => void = useUsersMutationSuccess()
  return useMutation({
    mutationFn: (variables: MutationVariables<TInput>): Promise<UserDetail> =>
      mutation(variables.id, variables.input),
    onSuccess,
  })
}
