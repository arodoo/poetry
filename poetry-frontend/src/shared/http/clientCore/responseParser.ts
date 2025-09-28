/*
 * File: responseParser.ts
 * Purpose: Centralizes JSON response parsing for HTTP retries so modules
 * remain compact and compliant with repository limits.
 * All Rights Reserved. Arodi Emmanuel
 */
export async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as unknown as T
  }
  const bodyText: string = await response.text()
  if (!bodyText) {
    return undefined as unknown as T
  }
  return JSON.parse(bodyText) as T
}
