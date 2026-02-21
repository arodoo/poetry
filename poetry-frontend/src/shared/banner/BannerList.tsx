/*
 * File: BannerList.tsx
 * Purpose: Displays a stack of registration banners.
 * Shows user details and membership status with a 60s lifetime.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useBanner } from './BannerStore'
import { useEffect, useState, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import { BannerItem } from './BannerItem'

export function BannerList(): ReactElement | null {
  const { banners, remove } = useBanner()
  const [portalTarget, setPortalTarget] = useState<Element | null>(null)

  useEffect(() => {
    // Inicializar el target en cuanto se monta el componente
    setPortalTarget(document.fullscreenElement || document.body)

    function onFullscreenChange() {
      setPortalTarget(document.fullscreenElement || document.body)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
    }
  }, [])

  if (banners.length === 0 || !portalTarget) return null

  const containerClasses = [
    'fixed',
    'top-20',
    'right-4',
    'z-50',
    'flex',
    'flex-col',
    'gap-2',
    'w-80',
    'pointer-events-none',
  ].join(' ')

  return createPortal(
    <div className={containerClasses}>
      {banners.map((banner) => (
        <BannerItem banner={banner} key={banner.id} onDismiss={remove} />
      ))}
    </div>,
    portalTarget
  )
}
