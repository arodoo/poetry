import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import { listThemes } from '../api/themeListApi'
import type { ThemeResponse } from '../../../api/generated'

export const themeQueryKeys = {
  all: ['themes'] as const,
}

export function useThemeListQuery(): UseQueryResult<ThemeResponse[]> {
  return useQuery({
    queryKey: themeQueryKeys.all,
    queryFn: listThemes,
  })
}

export function invalidateThemeList(): void {
  const queryClient = useQueryClient()
  void queryClient.invalidateQueries({ queryKey: themeQueryKeys.all })
}
