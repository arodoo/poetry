/*
 * File: usersClient.ts
 * Purpose: SDK wrapper for admin users endpoints using shared fetch client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import type { HttpOptions } from '../http/httpTypes'

export interface UserDto {
  readonly id: string
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly roles: readonly string[]
  readonly status: 'active' | 'disabled'
  readonly createdAt: string
  readonly updatedAt: string
  readonly version: string
}

export type UserCollectionDto = readonly UserDto[]

export interface UsersSdk {
  list(): Promise<UserCollectionDto>
  retrieve(id: string): Promise<UserDto>
  create(body: unknown): Promise<UserDto>
  update(id: string, body: unknown): Promise<UserDto>
  updateRoles(id: string, body: unknown): Promise<UserDto>
  updateSecurity(id: string, body: unknown): Promise<UserDto>
  disable(id: string, body: unknown): Promise<UserDto>
  enable(id: string, body: unknown): Promise<UserDto>
}

const basePath: string = '/api/v1/users'

type FetchJson = <T>(path: string, options?: HttpOptions) => Promise<T>

export function createUsersSdk(env: Env = getEnv()): UsersSdk {
  const fetchJson: FetchJson = createFetchClient(env)
  const put: (path: string, body: unknown) => Promise<UserDto> = (
    path: string,
    body: unknown
  ): Promise<UserDto> => {
    return fetchJson<UserDto>(path, { method: 'PUT', body })
  }
  const post: (path: string, body: unknown) => Promise<UserDto> = (
    path: string,
    body: unknown
  ): Promise<UserDto> => {
    return fetchJson<UserDto>(path, { method: 'POST', body })
  }
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
    update(id: string, body: unknown): Promise<UserDto> {
      return put(`${basePath}/${id}`, body)
    },
    updateRoles(id: string, body: unknown): Promise<UserDto> {
      return put(`${basePath}/${id}/roles`, body)
    },
    updateSecurity(id: string, body: unknown): Promise<UserDto> {
      return put(`${basePath}/${id}/security`, body)
    },
    disable(id: string, body: unknown): Promise<UserDto> {
      return post(`${basePath}/${id}/disable`, body)
    },
    enable(id: string, body: unknown): Promise<UserDto> {
      return post(`${basePath}/${id}/enable`, body)
    },
  }
}
