import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import MembershipCreateForm from '../components/form/MembershipCreateForm'

export default function MembershipsCreatePage(): ReactElement {
  const t = useT()

  return (
    <PageLayout
      title={t('ui.memberships.create.title')}
      subtitle={t('ui.memberships.create.subtitle')}
    >
      <div className="max-w-2xl">
        <MembershipCreateForm />
      </div>
    </PageLayout>
  )
}
