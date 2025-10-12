/*
 * File: usersApi.test.ts
 * Purpose: Ensure users API wrappers parse SDK responses and validate input.
 * Tests now use generated SDK mocks from api/generated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it, vi, beforeEach } from 'vitest'

// Mock the generated SDK
vi.mock('../../../../api/generated', () => {
  const listMock = vi.fn()
  const createMock = vi.fn()
  return {
    listUsers: listMock,
    createUser: createMock,
    __testMocks: { listMock, createMock },
  }
})

import { createUser, fetchUsersList } from '../../../../features/users'
import * as generatedSdk from '../../../../api/generated'

type MockedGeneratedSdk = typeof generatedSdk & {
  __testMocks: {
    listMock: ReturnType<typeof vi.fn>
    createMock: ReturnType<typeof vi.fn>
  }
}

const mockedSdk = generatedSdk as unknown as MockedGeneratedSdk
const { listMock, createMock } = mockedSdk.__testMocks

const dto = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  username: 'user',
  email: 'user@example.com',
  locale: 'en',
  roles: ['admin'],
  active: true,
  version: 1,
}

describe('usersApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses list and validates create payload', async () => {
    listMock.mockResolvedValue({
      data: [dto],
      request: new Request('http://localhost/api/v1/users'),
      response: new Response(),
    })
    createMock.mockResolvedValue({
      data: dto,
      request: new Request('http://localhost/api/v1/users'),
      response: new Response(),
    })

  const list = await fetchUsersList()
  // IDs may be numeric from SDK; assert stringified value for stability
  expect(String(list[0]?.id)).toBe('1')

    await createUser({
      firstName: dto.firstName,
      lastName: dto.lastName,
      username: dto.username,
      email: dto.email,
      locale: dto.locale,
      roles: dto.roles,
      password: 'strong-password',
    })

    expect(createMock).toHaveBeenCalledWith({
      body: {
        firstName: dto.firstName,
        lastName: dto.lastName,
        username: dto.username,
        email: dto.email,
        locale: dto.locale,
        roles: dto.roles,
        password: 'strong-password',
        status: 'active',
      },
    })
  })
})
