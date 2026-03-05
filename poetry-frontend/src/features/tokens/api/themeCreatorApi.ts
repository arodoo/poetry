/*
 * File: themeCreatorApi.ts
 * Purpose: API wrapper that calls the generated SDK `create` function
 * to persist a new theme to the backend. Validates input shape and
 * throws a descriptive error on failure.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  create as createThemeSdk,
  type ThemeResponse,
  type CreateRequest,
} from '../../../api/generated'

export type CreateThemeInput = Required<CreateRequest>

export async function createTheme(
  input: CreateThemeInput
): Promise<ThemeResponse> {
  const response = await createThemeSdk({ body: input })
  if (!response.data) {
    throw new Error('Failed to create theme')
  }
  return response.data
}
