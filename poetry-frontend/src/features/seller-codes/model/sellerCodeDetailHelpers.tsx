/*
 * File: sellerCodeDetailHelpers.tsx
 * Purpose: Helper functions for SellerCodeDetailPage to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SellerCodeDetail } from '../model/SellerCodesSchemas'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { DetailViewItem } from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { formatDate } from '../../../shared/utils/dateUtils'

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
              {t('ui.sellerCodes.status.' + (sellerCode.status ?? 'inactive'))}
            </Badge>
          ),
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.sellerCodes.detail.section.metadata'),
      items: [
        {
          label: t('ui.sellerCodes.detail.field.createdAt'),
          value: formatDate((sellerCode as any).createdAt),
        },
        {
          label: t('ui.sellerCodes.detail.field.updatedAt'),
          value: formatDate((sellerCode as any).updatedAt),
        },
        {
          label: t('ui.sellerCodes.detail.field.version'),
          value: sellerCode.version,
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
