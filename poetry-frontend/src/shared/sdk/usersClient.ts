/*
 * File: usersClient.ts
 * Purpose: SDK wrapper for admin users endpoints using shared fetch client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import type { HttpOptions } from '../http/httpTypes'
import type { UserDto, UserCollectionDto, UsersSdk } from './usersClientTypes'

export type { UserDto, UserCollectionDto, UsersSdk } from './usersClientTypes'

const basePath: string = '/api/v1/users'

type FetchJson = <T>(path: string, options?: HttpOptions) => Promise<T>

export function createUsersSdk(env: Env = getEnv()): UsersSdk {
  const fetchJson: FetchJson = createFetchClient(env)
  const put: (
    path: string,
    body: unknown,
    etag?: string
  ) => Promise<UserDto> = (
    path: string,
    body: unknown,
    etag?: string
  ): Promise<UserDto> => {
    const headers: Record<string, string> = {}
    if (etag) headers['If-Match'] = etag
    return fetchJson<UserDto>(path, { method: 'PUT', body, headers })
  }
  const post: (path: string, body: unknown) => Promise<UserDto> = (
    path: string,
    body: unknown
  ): Promise<UserDto> => fetchJson<UserDto>(path, { method: 'POST', body })
  return {
    list(): Promise<UserCollectionDto> {
      return fetchJson<UserCollectionDto>(basePath)
    },
    retrieve(id: string): Promise<UserDto> {
      return fetchJson<UserDto>(`${basePath}/${id}`)
    },
    create(body: unknown): Promise<UserDto> {
      return post(basePath, body)
    },
    update(id: string, body: unknown, etag?: string): Promise<UserDto> {
      return put(`${basePath}/${id}`, body, etag)
    },
    updateRoles(id: string, body: unknown, etag?: string): Promise<UserDto> {
      return put(`${basePath}/${id}/roles`, body, etag)
    },
    updateSecurity(id: string, body: unknown, etag?: string): Promise<UserDto> {
      return put(`${basePath}/${id}/security`, body, etag)
    },
    disable(id: string, body: unknown): Promise<UserDto> {
      return post(`${basePath}/${id}/disable`, body)
    },
    enable(id: string, body: unknown): Promise<UserDto> {
      return post(`${basePath}/${id}/enable`, body)
    },
  }
}
