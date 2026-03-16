import {
  update as updateThemeSdk,
  type ThemeResponse,
} from '../../../api/generated'

export type UpdateThemeInput = {
  id: number
  name?: string
  colors?: Record<string, string>
}

export async function updateTheme(
  input: UpdateThemeInput
): Promise<ThemeResponse> {
  const body: { name?: string; colors?: Record<string, string> } = {}
  if (input.name !== undefined) body.name = input.name
  if (input.colors !== undefined) body.colors = input.colors

  const response = await updateThemeSdk({
    path: { id: input.id },
    body,
  })
  if (!response.data) {
    throw new Error('Failed to update theme')
  }
  return response.data
}
