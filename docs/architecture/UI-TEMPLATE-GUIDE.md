# UI TMPL GT

This GT details new reusable UI CMPTs for consis. admin PGs (like Users).

## OVERVIEW

Users mod uses 4 new reusable UI CMPTs:

- PageLayout: PG HDR w/ TTL, SUBTTL, ACTs
- DataTable: Mod TBL for LIST VIEWS
- DetailView: Struct. ENTITY detail display
- FormLayout: Std FORM PRES.

## CMPT LOCS

All reusable CMPTs in `src/ui/`:

- `PageLayout/PageLayout.tsx`
- `DataTable/DataTable.tsx`
- `DetailView/DetailView.tsx`
- `FormLayout/FormLayout.tsx`

## PATT 1: LIST PG (TBL VIEW)

### EX: UsersListPage.tsx

```typescript
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
// COLS: Ext to HLP
const columns: readonly DataTableColumn<YourEntity>[] = [
{ key: 'name', header: t('ui.entity.table.name'), accessor: (row: YourEntity): string => row.name, },
{ key: 'actions', header: t('ui.entity.table.actions'), accessor: (row: YourEntity): ReactElement => (
<Inline gap="xs"><Button to={`/${locale}/entity/${row.id}`} size="sm">{t('ui.entity.actions.view')}</Button></Inline>), }, ]
const breadcrumbs: readonly BreadcrumbItem[] = [
{ label: t('ui.entity.breadcrumb.home'), href: `/${locale}` },
{ label: t('ui.entity.breadcrumb.list') },
]
// RENDER
return (
<PageLayout title={t('ui.entity.list.title')} subtitle={t('ui.entity.list.subtitle')} actions={<Button to={`/${locale}/entity/new`}>New</Button>} >
<div className="mb-4"><Breadcrumb items={breadcrumbs} /></div>
{isLoading ? (<Text size="sm">{t('ui.entity.status.loading')}</Text>)
: isError ? (<Text size="sm">{t('ui.entity.status.error')}</Text>)
: (<DataTable columns={columns} data={entities} keyExtractor={(row): string => row.id} emptyMessage={t('ui.entity.status.empty')} />)
}
</PageLayout>
)
REQ I18N Keys:
JSON

{
"ui.entity.list.title": "Entities",
"ui.entity.list.subtitle": "Manage entities",
"ui.entity.table.name": "Name",
"ui.entity.table.actions": "Actions",
"ui.entity.status.empty": "No entities found",
"ui.entity.actions.view": "View"
}
PATT 2: DETAIL PG
EX: UserDetailPage.tsx
TypeScript

import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DetailView } from '../../../ui/DetailView/DetailView'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
// SECs: Ext to HLP
const sections: readonly DetailViewSection[] = [
{ title: t('ui.entity.detail.section.basic'), items: [
{ label: t('ui.entity.field.name'), value: entity.name },
{ label: t('ui.entity.field.email'), value: entity.email },
{ label: t('ui.entity.field.tags'),
value: <Inline gap="xs">{entity.tags.map(tag => <Badge>{tag}</Badge>)}</Inline>, fullWidth: true } ] } ]
const breadcrumbs: readonly BreadcrumbItem[] = [
{ label: t('ui.entity.breadcrumb.home'), href: `/${locale}` },
{ label: t('ui.entity.breadcrumb.list'), href: `/${locale}/entity` },
{ label: t('ui.entity.breadcrumb.detail') },
]
const actions: ReactElement = (
<Inline gap="sm"><Button to={`/${locale}/entity/${entityId}/edit`} size="sm">{t('ui.entity.actions.edit')}</Button></Inline>
)
// RENDER
return (
<PageLayout title={t('ui.entity.detail.title')} subtitle={t('ui.entity.detail.subtitle')} >
<div className="mb-4"><Breadcrumb items={breadcrumbs} /></div>
<div data-testid="entity-detail-content">
{isLoading ? (<Text size="sm">{t('ui.entity.status.loading')}</Text>)
: isError || !entity ? (<Text size="sm">{t('ui.entity.status.error')}</Text>)
: (<DetailView sections={sections} actions={actions} />)}
</div>
</PageLayout>
)
REQ I18N Keys:
JSON

{
"ui.entity.detail.title": "Entity Detail",
"ui.entity.detail.subtitle": "Review entity information",
"ui.entity.detail.section.basic": "Basic Information",
"ui.entity.field.name": "Name",
"ui.entity.field.email": "Email"
}
PATT 3: C/E FORM PG
EX: UsersCreatePage.tsx
TypeScript

import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
// SECs: Ext to HLP
const sections: readonly FormLayoutSection[] = [
{ title: t('ui.entity.form.section.basic'), description: t('ui.entity.form.section.basic_desc'),
fields: (<><Input label={t('ui.entity.field.name')} value={name} onChange={setName} />
<Input label={t('ui.entity.field.email')} value={email} onChange={setEmail} /></>) } ]
const breadcrumbs: readonly BreadcrumbItem[] = [
{ label: t('ui.entity.breadcrumb.home'), href: `/${locale}` },
{ label: t('ui.entity.breadcrumb.list'), href: `/${locale}/entity` },
{ label: t('ui.entity.breadcrumb.create') },
]
// RENDER
return (
<PageLayout title={t('ui.entity.create.title')} subtitle={t('ui.entity.create.subtitle')} >
<div className="mb-4"><Breadcrumb items={breadcrumbs} /></div>
<FormLayout sections={sections} onSubmit={handleSubmit} submitLabel={t('ui.entity.actions.submit')}
cancelLabel={t('ui.entity.actions.cancel')} onCancel={handleCancel} isSubmitting={isSubmitting} />
</PageLayout>
)
REQ I18N Keys:
JSON

{
"ui.entity.create.title": "Create Entity",
"ui.entity.create.subtitle": "Add new entity",
"ui.entity.form.section.basic": "Basic Information",
"ui.entity.form.section.basic_desc": "Enter entity details",
"ui.entity.actions.submit": "Create",
"ui.entity.actions.cancel": "Cancel"
}
PATT 4: HLP FNs (BP)
COL BDRs (for DT)
FILE: entityListColumns.tsx

TypeScript

import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { EntitySummary } from '../model/EntitySchemas'
export function buildEntityListColumns(locale: string, t: (key: string) => string): readonly DataTableColumn<EntitySummary>[] {
return [{ key: 'name', header: t('ui.entity.table.name'), accessor: (row: EntitySummary): string => row.name, }, /*...*/ ]
}
SEC BDRs (for DV)
FILE: entityDetailHelpers.tsx

TypeScript

import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import type { EntityDetail } from '../model/EntitySchemas'
export function buildEntityDetailSections(entity: EntityDetail, t: (key: string) => string): readonly DetailViewSection[] {
return [{ title: t('ui.entity.detail.section.basic'), items: [{ label: t('ui.entity.field.name'), value: entity.name }, /*...*/ ], }, ]
}
FORM SEC BDRs (for FL)
FILE: entityFormSections.tsx

TypeScript

import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'
import type { EntityFormState } from '../components/useEntityFormState'
export function buildCreateFormSections(formState: EntityFormState, t: (key: string) => string): readonly FormLayoutSection[] {
return [{ title: t('ui.entity.form.section.basic'), description: t('ui.entity.form.section.basic_desc'),
fields: <EntityFormFields {...formState} t={t} />, }, ]
}
BC BDRs
FILE: entityBreadcrumbHelpers.ts

TypeScript

import type { BreadcrumbItem } from '../../../ui/Breadcrumb/Breadcrumb'
export function buildEntityListBreadcrumbs(locale: string, t: (key: string) => string): readonly BreadcrumbItem[] {
return [{ label: t('ui.entity.breadcrumb.home'), href: `/${locale}` }, { label: t('ui.entity.breadcrumb.list') }, ]
}
export function buildEntityDetailBreadcrumbs(locale: string, t: (key: string) => string): readonly BreadcrumbItem[] {
return [{ label: t('ui.entity.breadcrumb.home'), href: `/${locale}` }, { label: t('ui.entity.breadcrumb.list'), href: `/${locale}/entity` }, { label: t('ui.entity.breadcrumb.detail') }, ]
}
DSGN PRIN
1. CONSIST SPACING
ALL L/Os use TWind util CLSs

STICK to def. space tokens: xs, sm, md, lg, xl

Use STK/INL for consis. GAPS

2. RESPONSIVE DSGN
PL: max-w-7xl, resp. PAD

DT: Scrollable on mob, FULL disp on desk

DV: 1 COL mob, 2 COLs desk

FL: STK on mob, OPT for desk

3. DM SUP
ALL CMPTs use dark: VARS

TXT: text-neutral-900 dark:text-neutral-100

BGs: bg-white dark:bg-neutral-900

BRDs: border-neutral-200 dark:border-neutral-700

4. ACCESS
ALL INTRX ELMs KBD access

Prop. SEM HTML (TBL, DL, FORM)

FOC states on ALL INTRX ELMs

ARIA LBLs where needed

5. I18N 1ST
NEVER H/C TXT

ALL LBLs, TTLs, DESCs from I18N

ORG keys by FEAT.PG.CMPT.LBL

CLR TOK REF
Use TWind CLSs for CONSIST:
TXT:

Prim: text-[var(--color-text)] or text-neutral-900 dark:text-neutral-100

Sec: text-neutral-600 dark:text-neutral-400

Muted: text-[var(--color-textMuted)] or text-neutral-500 dark:text-neutral-500

Sub: text-[var(--color-textSubtle)]
BGs:

Surf: bg-[var(--color-surface)] or bg-white dark:bg-neutral-900

Elev: bg-neutral-50 dark:bg-neutral-800
BRDs:

Def: border-[var(--color-border)] or border-neutral-200 dark:border-neutral-700

FOC: Use exist. FOC RING TOKs
INTRX:

Hover: hover:bg-neutral-50 dark:hover:bg-neutral-800
NOTE: Pref CSS custom props (var(--color-*)) for TM-aware CLRs.

FS TMPL
For each new FEAT MOD:

features/
your-feature/
pages/
YourFeatureListPage.tsx (uses PL + DT)
YourFeatureDetailPage.tsx (uses PL + DV)
YourFeatureCreatePage.tsx (uses PL + FL)
YourFeatureEditPage.tsx (uses PL + FL)
yourFeatureListColumns.tsx (DT cols HLP)
yourFeatureDetailHelpers.tsx (DV secs HLP)
yourFeatureFormSections.tsx (FL secs HLP)
yourFeatureBreadcrumbHelpers.ts (BC BDRs)
components/
YourFeatureFormFields.tsx (FLD CMPTs)
useYourFeatureFormState.ts (FORM ST HK)
hooks/
useYourFeatureQueries.ts (TanStack QRY HKs)
useYourFeatureMutations.ts (TanStack QRY MUTs)
model/
YourFeatureSchemas.ts (Zod SCHEMAs)
api/
yourFeatureApi.ts (API SDK CALLs)
locales/
en.json
es.json
routing/
yourFeatureRoutes.tsx (RTE DEFs)
QUICK CHKLIST
When creating a new ADMIN PG:

[ ] Use PL for ALL PGs

[ ] Add BC CMPT in each PG

[ ] List VIEW: DT w/ COLS (Ext to HLP)

[ ] Detail VIEW: DV w/ SECs (Ext to HLP)

[ ] Forms: FL w/ SECs (Ext to HLP)

[ ] Ext complex logic to HLP FNs (cols, secs, BCs)

[ ] ALL TXT from I18N (no H/C STRs, incl LBLs)

[ ] Add L/E states w/ prop CONDs

[ ] Use exist. UI CMPTs (BTN, BDG, INL, STK, TXT)

[ ] Add data-testid ATTRs for TSTs

[ ] RESP DSGN (MOB-1ST)

[ ] DM SUP

[ ] ACCESS (KBD NAV, ARIA)

TST PATT
After IMPLing a new PG:

TST on MOB (320px W)

TST on DESK (1920px W)

TST DM TOGGLE

TST KBD NAV

RUN LINT: npm run lint

RUN TPCK: npm run typecheck

RUN TSTs: npm run test

COMM PITFALLS
❌ DONT:

H/C CLRs or SPACING

Use INL STYL

H/C TXT STRs

Create CUST TBL/FORM L/Os

Ignore MOB RESP

✅ DO:

Use TWind util CLSs

Use DSGN TOKs

Use I18N for ALL TXT

Use reusable CMPTs

TST on mult. SCRN SZs

SUP
For Qs or ISSs w/ UI TMPL:

CHK this GT

REF Users mod IMPL

REV CMPT SRC in src/ui/

L/U: 2025-10-02 TMPL VER: 1.0
```
