/*
 * File: useCreateThemeMutation.ts
 * Purpose: React Query mutation hook for creating a new theme via
 * the themeCreatorApi. Invalidates the tokens query on success so
 * the dropdown refreshes with the newly created theme.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { createTheme, type CreateThemeInput } from '../api/themeCreatorApi'
import type { ThemeResponse } from '../../../api/generated'

export function useCreateThemeMutation(): UseMutationResult<
  ThemeResponse,
  unknown,
  CreateThemeInput
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createTheme,
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: ['tokens'] })
    },
  })
}
