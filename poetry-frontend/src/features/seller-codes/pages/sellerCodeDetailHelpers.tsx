/*
 * File: sellerCodeDetailHelpers.tsx
 * Purpose: Helper functions for SellerCodeDetailPage to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'

export function buildSellerCodeDetailSections(
  sellerCode: SellerCodeDetail,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.sellerCodes.detail.section.basic'),
      items: [
        { label: t('ui.sellerCodes.form.code.label'), value: sellerCode.code },
        {
          label: t('ui.sellerCodes.form.status.label'),
          value: (
            <Badge
              tone={
                sellerCode.status === 'active'
                  ? 'success'
                  : sellerCode.status === 'inactive'
                    ? 'neutral'
                    : 'danger'
              }
            >
              {t(`ui.sellerCodes.status.${sellerCode.status}`)}
            </Badge>
          ),
        },
        {
          label: t('ui.sellerCodes.form.organization.label'),
          value: sellerCode.organizationId ?? '-',
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.sellerCodes.detail.section.metadata'),
      items: [
        {
          label: t('ui.sellerCodes.detail.field.createdAt'),
          value: (sellerCode as any).createdAt
            ? new Date((sellerCode as any).createdAt).toLocaleString()
            : '-',
        },
        {
          label: t('ui.sellerCodes.detail.field.updatedAt'),
          value: (sellerCode as any).updatedAt
            ? new Date((sellerCode as any).updatedAt).toLocaleString()
            : '-',
        },
        {
          label: t('ui.sellerCodes.detail.field.version'),
          value: sellerCode.version,
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
