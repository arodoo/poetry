/*
 * File: AdminConfigDrawer.tsx
 * Purpose: Slide-in drawer for admin carousel management.
 * Contains slide list, upload zone, interval control and overlay control.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../../shared/i18n/useT'
import type { CarouselConfig } from '../../model/CarouselSchemas'
import {
  useDeleteOverlayMutation,
  useDeleteSlideMutation,
  useUpdateIntervalMutation,
  useUploadOverlayMutation,
  useUploadSlideMutation,
} from '../../hooks/useCarouselMutations'
import { SlideListItem } from './SlideListItem'
import { SlideUploadZone } from './SlideUploadZone'
import { IntervalControl } from './IntervalControl'
import { OverlayControl } from './OverlayControl'

interface Props {
  config: CarouselConfig
  onClose: () => void
}

export function AdminConfigDrawer({ config, onClose }: Props): ReactElement {
  const t = useT()
  const uploadSlide = useUploadSlideMutation()
  const deleteSlide = useDeleteSlideMutation()
  const updateInterval = useUpdateIntervalMutation()
  const uploadOverlay = useUploadOverlayMutation()
  const deleteOverlay = useDeleteOverlayMutation()

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={t('ui.carousel.admin.drawerTitle')}
        className={
          'fixed right-0 top-0 z-50 flex h-full w-80 flex-col gap-4 ' +
          'overflow-y-auto bg-[var(--color-surface)] p-5 shadow-2xl'
        }
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[var(--color-text)]">
            {t('ui.carousel.admin.drawerTitle')}
          </h2>
          <button
            onClick={onClose}
            aria-label={t('ui.carousel.admin.close')}
            className="rounded-full p-1 hover:bg-[var(--color-surface-alt)]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Interval */}
        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[var(--color-text)]">
            {t('ui.carousel.admin.interval')}
          </h3>
          <IntervalControl
            currentMs={config.intervalMs}
            onSave={(ms: number): void => { updateInterval.mutate(ms) }}
            isPending={updateInterval.isPending}
            label={t('ui.carousel.admin.intervalLabel')}
            saveLabel={t('ui.carousel.admin.save')}
          />
        </section>

        {/* Overlay */}
        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[var(--color-text)]">
            {t('ui.carousel.admin.overlay')}
          </h3>
          <OverlayControl
            currentFilename={config.overlayFilename}
            onUpload={(f: File): void => { uploadOverlay.mutate(f) }}
            onDelete={(): void => { deleteOverlay.mutate() }}
            isUploading={uploadOverlay.isPending}
            isDeleting={deleteOverlay.isPending}
            uploadLabel={t('ui.carousel.admin.overlayUpload')}
            removeLabel={t('ui.carousel.admin.overlayRemove')}
          />
        </section>

        {/* Slides */}
        <section className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-[var(--color-text)]">
            {t('ui.carousel.admin.slides')}
          </h3>
          <SlideUploadZone
            onUpload={(f: File): void => { uploadSlide.mutate(f) }}
            isPending={uploadSlide.isPending}
            label={t('ui.carousel.admin.uploadSlide')}
            hint={t('ui.carousel.admin.uploadHint')}
          />
          <ul className="flex flex-col gap-2">
            {config.slides.map((slide) => (
              <SlideListItem
                key={slide.id}
                slide={slide}
                onDelete={(id: number): void => { deleteSlide.mutate(id) }}
                isDeleting={deleteSlide.isPending}
                deleteLabel={t('ui.carousel.admin.deleteSlide')}
              />
            ))}
          </ul>
        </section>
      </aside>
    </>
  )
}
