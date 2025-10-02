/\*

- File: UI-TEMPLATE-GUIDE.md
- Purpose: Guide for replicating the modern Users UI pattern across all
- admin pages. Contains reusable component patterns and best practices.
- All Rights Reserved. Arodi Emmanuel \*/

# Modern Admin UI Template Guide

This guide explains how to use the new reusable UI components to create
consistent, modern admin pages like the Users module.

## Overview

The Users module has been refactored with 4 new reusable UI components:

- **PageLayout**: Page header with title, subtitle, actions
- **DataTable**: Modern table for list views
- **DetailView**: Structured entity detail display
- **FormLayout**: Standardized form presentation

## Component Locations

All reusable components are in `src/ui/`:

- `PageLayout/PageLayout.tsx`
- `DataTable/DataTable.tsx`
- `DetailView/DetailView.tsx`
- `FormLayout/FormLayout.tsx`

## Pattern 1: List Page (Table View)

### Example: UsersListPage.tsx

```typescript
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DataTable } from '../../../ui/DataTable/DataTable'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'

// Define columns
const columns: readonly DataTableColumn<YourEntity>[] = [
  {
    key: 'name',
    header: t('ui.entity.table.name'),
    accessor: (row: YourEntity): string => row.name,
  },
  {
    key: 'actions',
    header: t('ui.entity.table.actions'),
    accessor: (row: YourEntity): ReactElement => (
      <Inline gap="xs">
        <Button to={`/${locale}/entity/${row.id}`} size="sm">
          {t('ui.entity.actions.view')}
        </Button>
      </Inline>
    ),
  },
]

// Render
return (
  <PageLayout
    title={t('ui.entity.list.title')}
    subtitle={t('ui.entity.list.subtitle')}
    actions={<Button>New</Button>}
  >
    <DataTable
      columns={columns}
      data={entities}
      keyExtractor={(row): string => row.id}
      emptyMessage={t('ui.entity.status.empty')}
    />
  </PageLayout>
)
```

### Required i18n keys:

```json
{
  "ui.entity.list.title": "Entities",
  "ui.entity.list.subtitle": "Manage entities",
  "ui.entity.table.name": "Name",
  "ui.entity.table.actions": "Actions",
  "ui.entity.status.empty": "No entities found",
  "ui.entity.actions.view": "View"
}
```

## Pattern 2: Detail Page

### Example: UserDetailPage.tsx

```typescript
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { DetailView } from '../../../ui/DetailView/DetailView'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'

// Define sections
const sections: readonly DetailViewSection[] = [
  {
    title: t('ui.entity.detail.section.basic'),
    items: [
      { label: t('ui.entity.field.name'), value: entity.name },
      { label: t('ui.entity.field.email'), value: entity.email },
      {
        label: t('ui.entity.field.tags'),
        value: <Inline gap="xs">{entity.tags.map(tag => <Badge>{tag}</Badge>)}</Inline>,
        fullWidth: true
      }
    ]
  }
]

// Render
return (
  <PageLayout
    title={t('ui.entity.detail.title')}
    subtitle={t('ui.entity.detail.subtitle')}
  >
    <DetailView
      sections={sections}
      actions={<Button>Edit</Button>}
    />
  </PageLayout>
)
```

### Required i18n keys:

```json
{
  "ui.entity.detail.title": "Entity Detail",
  "ui.entity.detail.subtitle": "Review entity information",
  "ui.entity.detail.section.basic": "Basic Information",
  "ui.entity.field.name": "Name",
  "ui.entity.field.email": "Email"
}
```

## Pattern 3: Create/Edit Form Page

### Example: UsersCreatePage.tsx

```typescript
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import type { FormLayoutSection } from '../../../ui/FormLayout/FormLayout'

// Define sections
const sections: readonly FormLayoutSection[] = [
  {
    title: t('ui.entity.form.section.basic'),
    description: t('ui.entity.form.section.basic_desc'),
    fields: (
      <>
        <Input label="Name" value={name} onChange={setName} />
        <Input label="Email" value={email} onChange={setEmail} />
      </>
    )
  }
]

// Render
return (
  <PageLayout
    title={t('ui.entity.create.title')}
    subtitle={t('ui.entity.create.subtitle')}
  >
    <FormLayout
      sections={sections}
      onSubmit={handleSubmit}
      submitLabel={t('ui.entity.actions.submit')}
      cancelLabel={t('ui.entity.actions.cancel')}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
    />
  </PageLayout>
)
```

### Required i18n keys:

```json
{
  "ui.entity.create.title": "Create Entity",
  "ui.entity.create.subtitle": "Add new entity",
  "ui.entity.form.section.basic": "Basic Information",
  "ui.entity.form.section.basic_desc": "Enter entity details",
  "ui.entity.actions.submit": "Create",
  "ui.entity.actions.cancel": "Cancel"
}
```

## Design Principles

### 1. Consistent Spacing

- All layouts use Tailwind utility classes
- Stick to defined spacing tokens: xs, sm, md, lg, xl
- Use Stack/Inline for consistent gaps

### 2. Responsive Design

- PageLayout: max-w-7xl, responsive padding
- DataTable: Scrollable on mobile, full display on desktop
- DetailView: 1 column mobile, 2 columns desktop
- FormLayout: Stacked on mobile, optimized for desktop

### 3. Dark Mode Support

- All components use dark: variants
- Text: text-neutral-900 dark:text-neutral-100
- Backgrounds: bg-white dark:bg-neutral-900
- Borders: border-neutral-200 dark:border-neutral-700

### 4. Accessibility

- All interactive elements keyboard accessible
- Proper semantic HTML (table, dl, form)
- Focus states on all interactive elements
- ARIA labels where needed

### 5. i18n First

- Never hardcode text
- All labels, titles, descriptions from i18n
- Organize keys by feature.page.component.label

## Color Tokens Reference

Use these Tailwind classes for consistency:

**Text:**

- Primary: `text-neutral-900 dark:text-neutral-100`
- Secondary: `text-neutral-600 dark:text-neutral-400`
- Muted: `text-neutral-500 dark:text-neutral-500`

**Backgrounds:**

- Surface: `bg-white dark:bg-neutral-900`
- Elevated: `bg-neutral-50 dark:bg-neutral-800`

**Borders:**

- Default: `border-neutral-200 dark:border-neutral-700`
- Focus: Use existing focus ring tokens

**Interactive:**

- Hover: `hover:bg-neutral-50 dark:hover:bg-neutral-800`

## File Structure Template

For each new feature module:

```
features/
  your-feature/
    pages/
      YourFeatureListPage.tsx      (uses PageLayout + DataTable)
      YourFeatureDetailPage.tsx    (uses PageLayout + DetailView)
      YourFeatureCreatePage.tsx    (uses PageLayout + FormLayout)
      YourFeatureEditPage.tsx      (uses PageLayout + FormLayout)
    components/
      YourFeatureFormFields.tsx    (field components)
    hooks/
      useYourFeatureQueries.ts     (TanStack Query hooks)
      useYourFeatureMutations.ts   (TanStack Query mutations)
    model/
      YourFeatureSchemas.ts        (Zod schemas)
    locales/
      en.json
      es.json
```

## Quick Checklist

When creating a new admin page:

- [ ] Use PageLayout for all pages
- [ ] List view: DataTable with columns
- [ ] Detail view: DetailView with sections
- [ ] Forms: FormLayout with sections
- [ ] All text from i18n (no hardcoded strings)
- [ ] Add loading/error states
- [ ] Use existing UI components (Button, Badge, Inline, Stack)
- [ ] Add data-testid attributes for tests
- [ ] Responsive design (mobile-first)
- [ ] Dark mode support
- [ ] Accessibility (keyboard nav, ARIA)

## Testing the Pattern

After implementing a new page:

1. Test on mobile (320px width)
2. Test on desktop (1920px width)
3. Test dark mode toggle
4. Test keyboard navigation
5. Run linter: `npm run lint`
6. Run typecheck: `npm run typecheck`
7. Run tests: `npm run test`

## Common Pitfalls

**❌ Don't:**

- Hardcode colors or spacing
- Use inline styles
- Hardcode text strings
- Create custom table/form layouts
- Ignore mobile responsiveness

**✅ Do:**

- Use Tailwind utility classes
- Use design tokens
- Use i18n for all text
- Use reusable components
- Test on multiple screen sizes

## Support

For questions or issues with the UI template:

1. Check this guide
2. Reference Users module implementation
3. Review component source code in src/ui/

---

Last Updated: 2025-10-02 Template Version: 1.0
