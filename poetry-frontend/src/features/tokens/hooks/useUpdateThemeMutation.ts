import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { updateTheme, type UpdateThemeInput } from '../api/themeUpdateApi'
import type { ThemeResponse } from '../../../api/generated'
import { themeQueryKeys } from './useThemeListQuery'

export function useUpdateThemeMutation(): UseMutationResult<
  ThemeResponse,
  unknown,
  UpdateThemeInput
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateTheme,
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: ['tokens'] })
      void queryClient.invalidateQueries({ queryKey: themeQueryKeys.all })
    },
  })
}
