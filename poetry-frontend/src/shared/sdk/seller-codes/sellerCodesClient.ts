/*
 * File: sellerCodesClient.ts
 * Purpose: SDK wrapper for seller codes endpoints using shared fetch client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../../http/fetchClient'
import { getEnv, type Env } from '../../config/env'
import type { HttpOptions } from '../../http/httpTypes'
import type {
  SellerCodeDto,
  SellerCodeCollectionDto,
  SellerCodesSdk,
} from './sellerCodesClientTypes'

export type {
  SellerCodeDto,
  SellerCodeCollectionDto,
  SellerCodesSdk,
} from './sellerCodesClientTypes'

const basePath: string = '/api/v1/seller-codes'

type FetchJson = <T>(path: string, options?: HttpOptions) => Promise<T>

export function createSellerCodesSdk(env: Env = getEnv()): SellerCodesSdk {
  const fetchJson: FetchJson = createFetchClient(env)
  const put: (
    path: string,
    body: unknown,
    etag?: string
  ) => Promise<SellerCodeDto> = (
    path: string,
    body: unknown,
    etag?: string
  ): Promise<SellerCodeDto> => {
    const headers: Record<string, string> = {}
    if (etag) headers['If-Match'] = etag
    return fetchJson<SellerCodeDto>(path, { method: 'PUT', body, headers })
  }
  const post: (path: string, body: unknown) => Promise<SellerCodeDto> = (
    path: string,
    body: unknown
  ): Promise<SellerCodeDto> =>
    fetchJson<SellerCodeDto>(path, { method: 'POST', body })
  return {
    list(): Promise<SellerCodeCollectionDto> {
      return fetchJson<SellerCodeCollectionDto>(basePath)
    },
    retrieve(id: string): Promise<SellerCodeDto> {
      return fetchJson<SellerCodeDto>(`${basePath}/${id}`)
    },
    create(body: unknown): Promise<SellerCodeDto> {
      return post(basePath, body)
    },
    update(id: string, body: unknown, etag?: string): Promise<SellerCodeDto> {
      return put(`${basePath}/${id}`, body, etag)
    },
  }
}
