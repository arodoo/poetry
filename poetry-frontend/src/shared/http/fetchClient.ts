/*
 File: fetchClient.ts
 Purpose: Factory and default export for JSON HTTP client using env.
 Delegates execution to clientCore to keep this file minimal. All
 Rights Reserved. Arodi Emmanuel
*/
import { getEnv, type Env } from '../config/env'
import { type HttpOptions } from './httpTypes'
import { fetchJsonInternal } from './clientCore'

export function createFetchClient(
  cfg: Env
): <T>(path: string, options?: HttpOptions) => Promise<T> {
  return async function fetchJson<T>(
    path: string,
    options: HttpOptions = {}
  ): Promise<T> {
    return fetchJsonInternal<T>(cfg, path, options)
  }
}

export async function fetchJson<T>(
  path: string,
  options: HttpOptions = {}
): Promise<T> {
  const client: <R>(p: string, o?: HttpOptions) => Promise<R> =
    createFetchClient(getEnv())
  return client<T>(path, options)
}
