/*
 * File: CarouselPage.tsx
 * Purpose: TV display page living inside the AppShell like any other page.
 * The carousel viewport is 16:9 by default; fullscreen is opt-in via button.
 * The admin gear button lives in the page header, always visible.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useCarouselConfig } from '../hooks/useCarouselConfig'
import { useCarouselPlayer } from '../hooks/useCarouselPlayer'
import { useFullscreen } from '../hooks/useFullscreen'
import { useSession } from '../../../shared/security/session/useSession'
import { useT } from '../../../shared/i18n/useT'
import { CarouselSlideView } from '../components/display/CarouselSlideView'
import { CarouselControls } from '../components/display/CarouselControls'
import { CarouselOverlay } from '../components/display/CarouselOverlay'
import { CarouselEmpty } from '../components/display/CarouselEmpty'
import { FullscreenButton } from '../components/display/FullscreenButton'
import { AdminConfigButton } from '../components/admin/AdminConfigButton'
import { AdminConfigDrawer } from '../components/admin/AdminConfigDrawer'

export default function CarouselPage(): ReactElement {
  const t = useT()
  const { session } = useSession()
  // Backend Role enum uses lowercase keys: 'admin', 'manager', 'user'
  const isAdmin: boolean = Boolean(session?.roles.includes('admin'))
  const { data: config, isLoading, isError } = useCarouselConfig()
  const { ref, isFullscreen, toggle } = useFullscreen()
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  const slides = config?.slides ?? []
  const intervalMs = config?.intervalMs ?? 5000
  const { index, goNext, goPrev, goTo } = useCarouselPlayer(
    slides.length,
    intervalMs
  )

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* ── Page header: title + admin gear, always above the carousel ── */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[var(--color-text)]">
          {t('ui.carousel.pageTitle')}
        </h1>
        {isAdmin && (
          <AdminConfigButton
            onOpen={(): void => setDrawerOpen(true)}
            label={t('ui.carousel.admin.open')}
          />
        )}
      </div>

      {/* ── Carousel viewport: 16:9 normally, h-screen when fullscreen ── */}
      <div
        ref={ref}
        className={
          'relative w-full overflow-hidden rounded-2xl bg-black ' +
          (isFullscreen ? 'h-screen' : 'aspect-video')
        }
        data-testid="carousel-root"
      >
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
          </div>
        ) : isError || !config ? (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-white">{t('ui.carousel.error')}</p>
          </div>
        ) : slides.length === 0 ? (
          <CarouselEmpty message={t('ui.carousel.empty')} />
        ) : (
          slides.map((slide, i: number) => (
            <CarouselSlideView
              key={slide.id}
              slide={slide}
              active={i === index}
            />
          ))
        )}

        {config && slides.length > 0 && !isFullscreen && (
          <CarouselControls
            count={slides.length}
            index={index}
            onPrev={goPrev}
            onNext={goNext}
            onGoTo={goTo}
          />
        )}

        {config && <CarouselOverlay filename={config.overlayFilename} />}

        {!isFullscreen && (
          <FullscreenButton
            isFullscreen={isFullscreen}
            onToggle={toggle}
            label={t('ui.carousel.fullscreen')}
          />
        )}
      </div>

      {/* ── Admin drawer rendered outside viewport so it is never clipped ── */}
      {isAdmin && drawerOpen && config && (
        <AdminConfigDrawer
          config={config}
          onClose={(): void => setDrawerOpen(false)}
        />
      )}
    </div>
  )
}
