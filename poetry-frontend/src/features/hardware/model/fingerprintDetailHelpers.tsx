/*
 * File: fingerprintDetailHelpers.tsx
 * Purpose: Helper functions for building fingerprint DetailView sections.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { MergedFingerprint } from '../components/HardwareFingerprintTableShell'

export function buildFingerprintDetailSections(
  fp: MergedFingerprint,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.hardware.fingerprints.detail.section.overview'),
      items: [
        {
          label: t('ui.hardware.fingerprints.detail.id'),
          value: String(fp.id),
        },
        {
          label: t('ui.hardware.fingerprints.detail.user'),
          value: fp.username,
        },
        { label: t('ui.hardware.fingerprints.detail.email'), value: fp.email },
      ],
    },
    {
      title: t('ui.hardware.fingerprints.detail.section.technical'),
      items: [
        {
          label: t('ui.hardware.fingerprints.detail.status'),
          value: fp.status,
        },
        {
          label: t('ui.hardware.fingerprints.detail.enrolled'),
          value: fp.enrolledAt,
        },
        {
          label: t('ui.hardware.fingerprints.detail.version'),
          value: String(fp.version),
        },
      ],
    },
  ]
}
