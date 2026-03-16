import {
  list as listThemesSdk,
  type ThemeResponse,
} from '../../../api/generated'

export async function listThemes(): Promise<ThemeResponse[]> {
  const response = await listThemesSdk()
  if (!response.data) {
    throw new Error('Failed to list themes')
  }
  return response.data
}
