# UI Component Catalog — poetry-frontend

> **Last Updated**: 2026-02-11  
> Industry-standard component reference for `src/ui/`

---

## Layout & Structure

| Component | Path | Props Summary |
|-----------|------|---------------|
| **PageLayout** | `ui/PageLayout/` | `title`, `subtitle`, `actions`, `children` |
| **Stack** | `ui/Stack/` | `gap`, `align`, `children` |
| **Inline** | `ui/Inline/` | `gap`, `align`, `children` |
| **FormLayout** | `ui/FormLayout/` | `onSubmit`, `children` |
| **Divider** | `ui/Divider/` | `(decorative)` |

---

## Navigation

| Component | Path | Props Summary |
|-----------|------|---------------|
| **Breadcrumb** | `ui/Breadcrumb/` | `items: BreadcrumbItem[]` |
| **Tabs** | `ui/Tabs/` | `items`, `activeKey`, `onChange` |
| **MenuItem** | `ui/MenuItem/` | `to`, `icon`, `label`, `active` |

---

## Data Display

| Component | Path | Props Summary |
|-----------|------|---------------|
| **DataTable** | `ui/DataTable/` | `columns`, `data`, `keyExtractor`, `search`, `pagination`, `sort`, `filters` |
| **DetailView** | `ui/DetailView/` | `fields`, `data` |
| **Badge** | `ui/Badge/` | `tone` (`success`/`neutral`/`danger`), `size` |
| **Tag** | `ui/Tag/` | `label`, `tone` |
| **Avatar** | `ui/Avatar/` | `src`, `name`, `size` |
| **Text** | `ui/Text/` | `size`, `weight`, `color` |
| **Heading** | `ui/Heading/` | `level` (1-6), `children` |
| **Icon** | `ui/Icon/` | `name`, `size`, `color` |

---

## Form Controls

| Component | Path | Props Summary |
|-----------|------|---------------|
| **Input** | `ui/Input/` | `value`, `onChange`, `type`, `error` |
| **PasswordInput** | `ui/PasswordInput/` | `value`, `onChange`, `showToggle` |
| **Select** | `ui/Select/` | `options`, `value`, `onChange` |
| **Checkbox** | `ui/Checkbox/` | `checked`, `onChange`, `label` |
| **Radio** | `ui/Radio/` | `options`, `value`, `onChange` |
| **Switch** | `ui/Switch/` | `checked`, `onChange`, `label` |
| **TextArea** | `ui/TextArea/` | `value`, `onChange`, `rows` |
| **Label** | `ui/Label/` | `htmlFor`, `children` |
| **Button** | `ui/Button/` | `to`, `onClick`, `size`, `width`, `variant` |

---

## Feedback & Overlays

| Component | Path | Props Summary |
|-----------|------|---------------|
| **Alert** | `ui/Alert/` | `tone`, `title`, `message` |
| **Modal** | `ui/Modal/` | `open`, `onClose`, `title`, `children` |
| **Drawer** | `ui/Drawer/` | `open`, `onClose`, `side`, `children` |
| **Backdrop** | `ui/Backdrop/` | `visible`, `onClick` |
| **BlockingOverlay** | `ui/BlockingOverlay/` | `active`, `message` |
| **Portal** | `ui/Portal/` | `target`, `children` |

---

## Theming

| Item | Path | Description |
|------|------|-------------|
| **Theme tokens** | `ui/theme/` | CSS variables, color palette, spacing |

---

## DataTable Sub-Components

| Component | File | Purpose |
|-----------|------|---------|
| DataTableBody | `DataTableBody.tsx` | Row rendering + empty state |
| DataTableSearch | `DataTableSearch.tsx` | Debounced search input |
| DataTablePagination | `DataTablePagination.tsx` | Page nav + size selector |
| DataTableFilters | `DataTableFilters.tsx` | Filter dropdown selects |
| SortIndicator | `SortIndicator.tsx` | Sort direction arrows (▲/▼/⬍) |
| PageControls | `PageControls.tsx` | Prev/Next buttons |
| PageInfo | `PageInfo.tsx` | "Showing X-Y of Z" text |

### DataTable Types

| Type | File | Fields |
|------|------|--------|
| `SortState` | `SortTypes.ts` | `key`, `direction` |
| `SortableColumn<T>` | `SortTypes.ts` | `key`, `header`, `accessor`, `sortValue?` |
| `FilterDef` | `FilterTypes.ts` | `key`, `label`, `options` |
| `ActiveFilters` | `FilterTypes.ts` | `Record<string, string>` |

### DataTable Usage Pattern

```tsx
const [sort, setSort] = useState<SortState>(
  { key: '', direction: null }
)
const [filters, setFilters] = useState<ActiveFilters>({})

<DataTable
  columns={columns}     // with sortValue
  data={items}
  keyExtractor={(r) => String(r.id)}
  search={{ value, onSearchChange }}
  sort={sort}
  onSortChange={setSort}
  filters={filterDefs}   // auto-detected
  activeFilters={filters}
  onFilterChange={(k, v) =>
    setFilters(p => ({ ...p, [k]: v }))
  }
  pagination={{ ... }}
/>
```
