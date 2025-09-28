/*
 * File: useProfileQueries.ts
 * Purpose: React Query hooks for profile summary retrieval and updates.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationResult,
  type UseQueryResult,
} from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/security/tokenStorage'
import { fetchProfileSummary, updateProfileSummary } from '../api/profileApi'
import {
  type ProfileSummary,
  type ProfileSummaryUpdateInput,
} from '../model/ProfileSchemas'

export const profileQueryKeys: {
  readonly root: readonly ['profile']
  summary(): readonly ['profile', 'summary']
} = {
  root: ['profile'],
  summary(): readonly ['profile', 'summary'] {
    return ['profile', 'summary'] as const
  },
}

export function useProfileSummaryQuery(): UseQueryResult<ProfileSummary> {
  const hasAccessToken: boolean = Boolean(tokenStorage.load()?.accessToken)
  return useQuery<ProfileSummary>({
    queryKey: profileQueryKeys.summary(),
    queryFn: fetchProfileSummary,
    staleTime: 1000 * 60,
    enabled: hasAccessToken,
    retry(failureCount: number, error: unknown): boolean {
      if (
        error instanceof Error &&
        (error.message.includes('HTTP 401') ||
          error.message.includes('HTTP 403'))
      )
        return false
      return failureCount < 2
    },
  })
}

export function useProfileSummaryMutation(): UseMutationResult<
  ProfileSummary,
  unknown,
  ProfileSummaryUpdateInput
> {
  const queryClient: ReturnType<typeof useQueryClient> = useQueryClient()
  return useMutation({
    mutationFn: updateProfileSummary,
    onSuccess: (profile: ProfileSummary): void => {
      void queryClient.setQueryData(profileQueryKeys.summary(), profile)
    },
  })
}
