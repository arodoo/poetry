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
  const { data, etag } = await getTokensRaw()
  const bundle: TokenBundle = TokenBundleSchema.parse(data)
  return { bundle, etag }
}
