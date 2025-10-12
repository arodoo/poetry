/*
 * File: useMembershipsMutations.ts
 * Purpose: Mutation hooks for memberships feature.
 * Uses generated MembershipResponse type (zero drift).
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query'
import {
  createMembership,
  updateMembership,
  deleteMembership,
} from '../api/membershipsApi'
import type {
  CreateMembershipInput,
  UpdateMembershipInput,
} from '../model/MembershipsSchemas'
import type { MembershipResponse } from '../../../api/generated'
import { membershipsQueryKeys } from './useMembershipsQueries'

interface UpdateMembershipVariables {
  readonly id: string
  readonly input: UpdateMembershipInput
  readonly etag?: string
}

interface DeleteMembershipVariables {
  readonly id: string
  readonly etag?: string
}

function useMembershipsMutationSuccess(): (detail: MembershipResponse) => void {
  const queryClient = useQueryClient()
  return (detail: MembershipResponse): void => {
    const id = String(detail.id)
    void queryClient.invalidateQueries({
      queryKey: membershipsQueryKeys.root,
    })
    void queryClient.invalidateQueries({
      queryKey: membershipsQueryKeys.detail(id),
    })
  }
}

export function useCreateMembershipMutation(): UseMutationResult<
  MembershipResponse,
  unknown,
  CreateMembershipInput
> {
  const onSuccess = useMembershipsMutationSuccess()
  return useMutation({
    mutationFn: createMembership,
    onSuccess,
  })
}

export function useUpdateMembershipMutation(): UseMutationResult<
  MembershipResponse,
  unknown,
  UpdateMembershipVariables
> {
  const onSuccess = useMembershipsMutationSuccess()
  return useMutation({
    mutationFn: (variables: UpdateMembershipVariables) =>
      updateMembership(variables.id, variables.input, variables.etag),
    onSuccess,
  })
}

export function useDeleteMembershipMutation(): UseMutationResult<
  void,
  unknown,
  DeleteMembershipVariables
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: DeleteMembershipVariables) =>
      deleteMembership(variables.id, variables.etag),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: membershipsQueryKeys.root,
      })
    },
  })
}
