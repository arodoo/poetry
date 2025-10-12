/*
 * File: zoneFormSections.tsx
 * Purpose: Builders for form sections in zone create and edit pages, using the FormLayout component. Returns readonly section arrays with title, description, and ZonesFormFields as field content. Improves modularity and reusability of form layouts.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { ZonesFormFields } from '../components/ZonesFormFields'
import { ZonesFormStatus } from '../components/ZonesFormStatus'
import type * as ZF from '../components/useZonesFormState'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildCreateFormSections(
  formState: ZF.ZonesFormState,
  t: (key: I18nKey) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.zones.create.section.basic'),
      description: t('ui.zones.create.section.basic_desc'),
      fields: (
        <ZonesFormFields
          name={formState.name}
          description={formState.description}
          managerId={formState.managerId}
          onNameChange={formState.setName}
          onDescriptionChange={formState.setDescription}
          onManagerIdChange={formState.setManagerId}
          t={t}
        />
      ),
    },
  ]
}

export function buildEditFormSections(
  formState: ZF.ZonesFormState,
  t: (key: I18nKey) => string
): readonly FormLayoutSection[] {
  return [
    {
      title: t('ui.zones.edit.section.basic'),
      description: t('ui.zones.edit.section.basic_desc'),
      fields: (
        <>
          <ZonesFormFields
            name={formState.name}
            description={formState.description}
            managerId={formState.managerId}
            onNameChange={formState.setName}
            onDescriptionChange={formState.setDescription}
            onManagerIdChange={formState.setManagerId}
            t={t}
          />
          <ZonesFormStatus
            status={formState.status}
            onStatusChange={formState.setStatus}
            t={t}
          />
        </>
      ),
    },
  ]
}
