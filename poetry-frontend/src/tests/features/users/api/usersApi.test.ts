/*
 * File: usersApi.test.ts
 * Purpose: Ensure users API wrappers parse SDK responses and validate input.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it, vi } from 'vitest'

vi.mock('../../../../shared/sdk', () => {
  const listMock = vi.fn()
  const createMock = vi.fn()
  return {
    createUsersSdk: () => ({
      list: listMock,
      retrieve: vi.fn(),
      update: vi.fn(),
      updateRoles: vi.fn(),
      updateSecurity: vi.fn(),
      disable: vi.fn(),
      enable: vi.fn(),
      create: createMock,
    }),
    __testMocks: { listMock, createMock },
  }
})

import { createUser, fetchUsersList } from '../../../../features/users'
import * as sdk from '../../../../shared/sdk'

type MockedSdkModule = {
  __testMocks: {
    listMock: ReturnType<typeof vi.fn>
    createMock: ReturnType<typeof vi.fn>
  }
}

const mockedSdk = sdk as unknown as MockedSdkModule
const { listMock, createMock } = mockedSdk.__testMocks

const dto = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  username: 'user',
  email: 'user@example.com',
  locale: 'en',
  roles: ['admin'],
  status: 'active',
  createdAt: 'now',
  updatedAt: 'now',
  version: 'v1',
}

describe('usersApi', () => {
  it('parses list and validates create payload', async () => {
    listMock.mockResolvedValue([dto])
    createMock.mockResolvedValue(dto)
    const list = await fetchUsersList()
    expect(list[0]?.id).toBe('550e8400-e29b-41d4-a716-446655440000')
    await createUser({
      username: dto.username,
      email: dto.email,
      locale: dto.locale,
      roles: dto.roles,
      password: 'strong-password',
    })
    expect(createMock).toHaveBeenCalledWith({
      username: dto.username,
      email: dto.email,
      locale: dto.locale,
      roles: dto.roles,
      password: 'strong-password',
    })
  })
})
