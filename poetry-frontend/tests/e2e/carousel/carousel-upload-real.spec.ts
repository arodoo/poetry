/*
 * File: carousel-upload-real.spec.ts
 * Purpose: Real upload E2E against POST /api/v1/carousel/slides to prove
 * the 500-error regression is fixed. Creates a 1x1 PNG in-memory, posts
 * it as multipart, asserts 201 plus a subsequent GET includes the new
 * slide. Cleans up the slide afterwards.
 * All Rights Reserved. Arodi Emmanuel
 */
import { test, expect, request as pw } from '@playwright/test'
import { getAuthTokens } from '../shared/providers/tokenProvider'

const PNG_1X1: Buffer = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4' +
    '2mNgAAIAAAUAAarVyFEAAAAASUVORK5CYII=',
  'base64'
)

test('carousel real upload returns 201 and is listed', async (): Promise<void> => {
  const t = await getAuthTokens()
  const ctx = await pw.newContext({ baseURL: 'http://localhost:8080' })
  const auth = { Authorization: `Bearer ${t.accessToken}` }
  const up = await ctx.post('/api/v1/carousel/slides', {
    headers: auth,
    multipart: {
      file: { name: 'x.png', mimeType: 'image/png', buffer: PNG_1X1 },
    },
  })
  expect(up.status(), await up.text()).toBe(201)
  const created = (await up.json()) as { id: number; filename: string }
  expect(created.filename).toMatch(/\.png$/i)
  const media = await ctx.get(
    `/api/v1/carousel/media/${created.filename}`,
    { headers: auth }
  )
  expect(media.status()).toBe(200)
  const list = await ctx.get('/api/v1/carousel/config', { headers: auth })
  expect(list.ok()).toBe(true)
  const body = (await list.json()) as { slides: { id: number }[] }
  expect(body.slides.some((s) => s.id === created.id)).toBe(true)
  const del = await ctx.delete(
    `/api/v1/carousel/slides/${String(created.id)}`,
    { headers: auth }
  )
  expect(del.ok()).toBe(true)
  await ctx.dispose()
})
