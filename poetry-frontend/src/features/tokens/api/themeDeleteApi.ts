import { delete_ as deleteThemeSdk } from '../../../api/generated'

export async function deleteTheme(id: number): Promise<void> {
  const response = await deleteThemeSdk({ path: { id } })
  if (!response.data) {
    throw new Error('Failed to delete theme')
  }
}
