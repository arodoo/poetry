import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseMutationResult } from '@tanstack/react-query'
import { deleteTheme } from '../api/themeDeleteApi'
import { themeQueryKeys } from './useThemeListQuery'

export function useDeleteThemeMutation(): UseMutationResult<
  void,
  unknown,
  number
> {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteTheme,
    onSuccess: (): void => {
      void queryClient.invalidateQueries({ queryKey: ['tokens'] })
      void queryClient.invalidateQueries({ queryKey: themeQueryKeys.all })
    },
  })
}
