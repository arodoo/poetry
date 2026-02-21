/*
 * File: carousel.spec.ts
 * Purpose: E2E tests for the enterprise carousel feature.
 * ALL tests run against the real running backend — zero mocks.
 * Cleanup: every slide uploaded during a test is deleted via the API
 * (DELETE /api/v1/carousel/slides/:id) so tests leave no residue.
 * All Rights Reserved. Arodi Emmanuel
 */

import { test, expect, type Page, type APIRequestContext, request } from '@playwright/test'
import { injectTokens, getAuthTokens } from '../shared/providers/tokenProvider'

const API = 'http://localhost:8080/api/v1/carousel'

// ── helpers ────────────────────────────────────────────────────────────────

/** Returns a fresh APIRequestContext authenticated as admin. */
async function adminApi(): Promise<APIRequestContext> {
  const tokens = await getAuthTokens()
  return request.newContext({
    baseURL: 'http://localhost:8080',
    extraHTTPHeaders: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  })
}

interface SlideResponse {
  id: number
  type: string
  filename: string
  originalName: string
  sortOrder: number
}

interface ConfigResponse {
  intervalMs: number
  overlayFilename: string | null
  slides: SlideResponse[]
}

/** Uploads a tiny synthetic PNG as a carousel slide. Returns the created slide. */
async function uploadTestSlide(api: APIRequestContext, name = 'test-slide.png'): Promise<SlideResponse> {
  // 1×1 transparent PNG (67 bytes)
  const pngBytes = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI6QAAAABJRU5ErkJggg==',
    'base64'
  )
  const resp = await api.post('/api/v1/carousel/slides', {
    multipart: {
      file: {
        name,
        mimeType: 'image/png',
        buffer: pngBytes,
      },
    },
  })
  expect(resp.status(), `upload slide failed: ${resp.status()}`).toBe(201)
  return (await resp.json()) as SlideResponse
}

/** Deletes a slide by id (best-effort cleanup). */
async function deleteSlide(api: APIRequestContext, id: number): Promise<void> {
  await api.delete(`/api/v1/carousel/slides/${id}`)
}

/** Fetches the live carousel config from the backend. */
async function fetchConfig(api: APIRequestContext): Promise<ConfigResponse> {
  const resp = await api.get('/api/v1/carousel/config')
  expect(resp.ok()).toBe(true)
  return (await resp.json()) as ConfigResponse
}

/** Navigate to /en/dashboard and wait for the carousel root to appear. */
async function gotoCarousel(page: Page): Promise<void> {
  await page.goto('/en/dashboard')
  await expect(
    page.locator('[data-testid="carousel-root"]')
  ).toBeVisible({ timeout: 15000 })
}

// ── tests ──────────────────────────────────────────────────────────────────

test.describe('Carousel – escenarios reales (sin mocks)', () => {

  // ── Test 1: GET /carousel/config es público y devuelve estructura válida ──

  test('caso 1 – /carousel/config es público y devuelve estructura válida', async () => {
    const api = await request.newContext({ baseURL: 'http://localhost:8080' })
    const resp = await api.get('/api/v1/carousel/config')

    expect(resp.status()).toBe(200)
    const body = (await resp.json()) as ConfigResponse
    expect(typeof body.intervalMs).toBe('number')
    expect(body.intervalMs).toBeGreaterThan(0)
    expect(Array.isArray(body.slides)).toBe(true)
    // overlayFilename puede ser null o string — ambos válidos
    expect(body.overlayFilename === null || typeof body.overlayFilename === 'string').toBe(true)
  })

  // ── Test 2: Admin sube una imagen, la ve en la config, luego la borra ────

  test('caso 2 – admin sube una imagen y aparece en /carousel/config', async () => {
    const api = await adminApi()
    let slideId: number | null = null

    try {
      // Subir imagen real al backend
      const slide = await uploadTestSlide(api, 'e2e-caso2.png')
      slideId = slide.id

      expect(slide.id).toBeGreaterThan(0)
      expect(slide.type).toBe('IMAGE')
      expect(slide.originalName).toBe('e2e-caso2.png')

      // Verificar que aparece en la config
      const config = await fetchConfig(api)
      const found = config.slides.find((s) => s.id === slideId)
      expect(found, 'la imagen subida debe aparecer en /carousel/config').toBeDefined()
      expect(found!.filename).toBeTruthy()
    } finally {
      if (slideId !== null) await deleteSlide(api, slideId)
    }
  })

  // ── Test 3: La página /dashboard muestra el carrusel (viewport presente) ─

  test('caso 3 – /dashboard renderiza el viewport del carrusel correctamente', async ({ page }) => {
    await injectTokens(page)
    await gotoCarousel(page)

    // El div raíz del carrusel existe y es visible
    const viewport = page.locator('[data-testid="carousel-root"]')
    await expect(viewport).toBeVisible()

    // Tiene proporción 16:9 (aspect-video) o llena la pantalla en fullscreen
    // Verificamos que tiene dimensiones reales (ancho > 0)
    const box = await viewport.boundingBox()
    expect(box).not.toBeNull()
    expect(box!.width).toBeGreaterThan(100)
    expect(box!.height).toBeGreaterThan(50)
  })

  // ── Test 4: Admin ve el botón "Configurar carrusel" ──────────────────────

  test('caso 4 – usuario admin ve el botón de configuración del carrusel', async ({ page }) => {
    await injectTokens(page)
    await gotoCarousel(page)

    // El botón de config es visible solo para admin (rol 'admin' en minúscula)
    const configBtn = page.getByRole('button', { name: /configurar carrusel|configure carousel/i })
    await expect(configBtn).toBeVisible({ timeout: 10000 })
  })

  // ── Test 5: Admin sube slide, lo ve en el drawer, y lo borra desde la UI ─

  test('caso 5 – admin sube slide real, abre drawer, ve el slide y lo elimina', async ({ page }) => {
    const api = await adminApi()
    let slideId: number | null = null

    // Subir slide vía API para garantizar que existe al cargar la página
    const slide = await uploadTestSlide(api, 'e2e-caso5.png')
    slideId = slide.id

    try {
      await injectTokens(page)
      await gotoCarousel(page)

      // Abrir el drawer de configuración
      const configBtn = page.getByRole('button', { name: /configurar carrusel|configure carousel/i })
      await expect(configBtn).toBeVisible({ timeout: 10000 })
      await configBtn.click()

      // El drawer debe abrirse
      const drawer = page.getByRole('dialog')
      await expect(drawer).toBeVisible({ timeout: 5000 })

      // El slide subido debe aparecer en la lista del drawer
      await expect(
        drawer.getByText('e2e-caso5.png')
      ).toBeVisible({ timeout: 5000 })

      // Eliminar el slide desde la UI (botón de borrar del SlideListItem)
      const deleteButtons = drawer.getByRole('button', { name: /eliminar diapositiva|delete slide/i })
      await deleteButtons.first().click()

      // El slide ya no debe aparecer en el drawer
      await expect(
        drawer.getByText('e2e-caso5.png')
      ).not.toBeVisible({ timeout: 8000 })

      // Marcar como eliminado para que el finally no reintente
      slideId = null
    } finally {
      // Best-effort cleanup si la UI no lo eliminó
      if (slideId !== null) await deleteSlide(api, slideId)
    }
  })

  // ── Test 6: Actualizar el intervalo cambia el valor en la config ─────────

  test('caso 6 – admin actualiza el intervalo y se persiste en el backend', async () => {
    const api = await adminApi()

    // Leer intervalo actual para restaurarlo al final
    const before = await fetchConfig(api)
    const originalInterval = before.intervalMs
    const newInterval = originalInterval === 7000 ? 8000 : 7000

    try {
      const resp = await api.put('/api/v1/carousel/config/interval', {
        data: newInterval,
        headers: { 'Content-Type': 'application/json' },
      })
      expect(resp.status()).toBe(204)

      // Verificar que el nuevo valor se refleja en la config
      const after = await fetchConfig(api)
      expect(after.intervalMs).toBe(newInterval)
    } finally {
      // Restaurar intervalo original
      await api.put('/api/v1/carousel/config/interval', {
        data: originalInterval,
        headers: { 'Content-Type': 'application/json' },
      })
    }
  })

  // ── Test 7: Múltiples slides se muestran con controles de navegación ─────

  test('caso 7 – con múltiples slides aparecen las flechas de navegación', async ({ page }) => {
    const api = await adminApi()
    const uploaded: number[] = []

    try {
      // Subir 2 slides reales para que los controles aparezcan
      const s1 = await uploadTestSlide(api, 'e2e-nav-1.png')
      const s2 = await uploadTestSlide(api, 'e2e-nav-2.png')
      uploaded.push(s1.id, s2.id)

      await injectTokens(page)
      await gotoCarousel(page)

      // Con >= 2 slides deben aparecer las flechas prev/next
      await expect(
        page.getByRole('button', { name: /previous slide|diapositiva anterior/i })
      ).toBeVisible({ timeout: 10000 })
      await expect(
        page.getByRole('button', { name: /next slide|siguiente diapositiva/i })
      ).toBeVisible()
    } finally {
      for (const id of uploaded) await deleteSlide(api, id)
    }
  })

  // ── Test 8: Las imágenes usan object-contain para estirarse sin distorsión ──

  test('caso 8 – las imágenes del carrusel usan object-contain para mantener proporciones', async ({ page }) => {
    const api = await adminApi()
    let slideId: number | null = null

    try {
      const slide = await uploadTestSlide(api, 'e2e-caso8-contain.png')
      slideId = slide.id

      await injectTokens(page)
      await gotoCarousel(page)

      const img = page.locator('img[alt="e2e-caso8-contain.png"]')
      await expect(img).toBeVisible({ timeout: 10000 })
      await expect(img).toHaveClass(/object-contain/)
      await expect(img).not.toHaveClass(/object-cover/)
      await expect(img).not.toHaveClass(/object-fill/)
    } finally {
      if (slideId !== null) await deleteSlide(api, slideId)
    }
  })

  // ── Test 9: En fullscreen los controles desaparecen ──────────────────────

  test('caso 9 – al entrar en fullscreen desaparecen los botones de navegación y fullscreen', async ({ page }) => {
    const api = await adminApi()
    const uploaded: number[] = []

    try {
      // Necesitamos al menos 2 slides para que aparezcan las flechas
      const s1 = await uploadTestSlide(api, 'e2e-fs-1.png')
      const s2 = await uploadTestSlide(api, 'e2e-fs-2.png')
      uploaded.push(s1.id, s2.id)

      await injectTokens(page)
      await gotoCarousel(page)

      // Verificar que los controles existen en modo normal
      const prevBtn = page.getByRole('button', { name: /previous slide|diapositiva anterior/i })
      const fullscreenBtn = page.getByRole('button', { name: /pantalla completa|fullscreen/i })

      await expect(prevBtn).toBeVisible({ timeout: 10000 })
      await expect(fullscreenBtn).toBeVisible()

      // Activar fullscreen
      await fullscreenBtn.click()

      // En modo fullscreen, los botones de prev/next y el mismo botón de fullscreen deben desaparecer
      await expect(prevBtn).not.toBeVisible()
      await expect(fullscreenBtn).not.toBeVisible()

      // Salir del fullscreen para limpiar el estado del navegador
      await page.evaluate(() => document.exitFullscreen()).catch(() => { })

      // Tras salir de fullscreen, deberían volver a aparecer
      await expect(prevBtn).toBeVisible()
      await expect(fullscreenBtn).toBeVisible()

    } finally {
      for (const id of uploaded) await deleteSlide(api, id)
    }
  })

})
