/*
 * File: usersClientTypes.ts
 * Purpose: Type definitions for users SDK client.
 * All Rights Reserved. Arodi Emmanuel
 */
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
  update(id: string, body: unknown, etag?: string): Promise<UserDto>
  updateRoles(id: string, body: unknown, etag?: string): Promise<UserDto>
  updateSecurity(id: string, body: unknown, etag?: string): Promise<UserDto>
  disable(id: string, body: unknown): Promise<UserDto>
  enable(id: string, body: unknown): Promise<UserDto>
}
