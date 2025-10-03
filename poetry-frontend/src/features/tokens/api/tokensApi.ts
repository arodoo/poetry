/*
 File: tokensApi.ts
 Purpose: API wrapper functions calling generated SDK (shared sdk here) to
 retrieve the token bundle with ETag support. Performs Zod validation and
 maps to internal types. No direct fetch in components.
 All Rights Reserved. Arodi Emmanuel
*/
import { getTokensRaw } from '../../../shared/sdk'
import { TokenBundleSchema, type TokenBundle } from '../model/TokensSchemas'

export type TokensApiResponse = Readonly<{
  bundle: TokenBundle
  etag: string | null
}>

export async function getTokens(): Promise<TokensApiResponse> {
  try {
    const { data, etag } = await getTokensRaw()

    // Validate with Zod schema - will throw if data doesn't match
    const bundle: TokenBundle = TokenBundleSchema.parse(data)

    // Log success in dev mode
    if (import.meta.env.DEV) {
      console.log(
        '[tokensApi] ✅ Successfully loaded and validated token bundle',
        {
          themes: bundle.themes.length,
          fonts: bundle.fonts.length,
          current: bundle.current,
        }
      )
    }

    return { bundle, etag }
  } catch (err) {
    // Enhanced error for Zod validation failures
    if (
      err &&
      typeof err === 'object' &&
      'name' in err &&
      (err as { name?: string }).name === 'ZodError'
    ) {
      interface ZodIssue {
        path: string[]
        message: string
      }
      const zodError: { issues: ZodIssue[] } = err as unknown as {
        issues: ZodIssue[]
      }
      const details: string = zodError.issues
        .map(
          (issue: ZodIssue): string =>
            `  - ${issue.path.join('.')}: ${issue.message}`
        )
        .join('\n')

      const enhancedError: Error = new Error(
        `Token bundle validation failed. Backend data model doesn't match frontend schema.\n` +
          `Validation errors:\n${details}\n\n` +
          `This usually means:\n` +
          `- Backend changed data structure without updating frontend\n` +
          `- Missing required fields in backend response\n` +
          `- Type mismatch between backend and frontend models`
      )
      enhancedError.name = 'TokenBundleValidationError'
      throw enhancedError
    }

    // Re-throw other errors with context
    throw new Error(
      `Failed to fetch tokens: ${err instanceof Error ? err.message : String(err)}`
    )
  }
}
