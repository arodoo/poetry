/_ File: ui-structure.md Purpose: Domain documentation for layout & overlay UI
components (Card, Stack, Inline, Portal, Backdrop, Modal, Drawer, Tabs,
Accordion) including scope, RFs, data model, APIs, a11y, tokens, acceptance
criteria. All Rights Reserved. Arodi Emmanuel _/

# UI Structure & Overlay Components

## 1. Scope

Provide a minimal, token-driven set of structural and overlay primitives
enabling layout composition, content grouping, and layered interactions without
embedding business logic. Components are presentation only and consume
centralized design tokens (colors, spacing, radius, shadows, focus ring,
typography).

## 2. Functional Requirements (RFs)

1. Card groups related content with optional header/body/footer.
2. Stack arranges children vertically with configurable gap.
3. Inline arranges children horizontally with configurable gap and wrap.
4. Portal renders children outside normal DOM flow (body) safely for SSR.
5. Backdrop supplies an overlay layer behind modals/drawers with opacity
   variants.
6. Modal presents blocking dialog with accessible semantics and focus
   initialization.
7. Drawer presents side panel overlay (left/right) with ESC + backdrop
   dismissal.
8. Tabs switches visible panel via keyboard (ArrowLeft/Right/Home/End) and
   click.
9. Accordion expands/collapses content regions (single or multiple expansion).
10. All components must remain <80 source lines each (presentational code).
11. All interactive components implement token-based focus ring styling.

## 3. Non-Functional Requirements

- Token adherence: no hardcoded design values beyond safe fallbacks (#fff,
  etc.).
- Accessibility: proper roles, aria attributes, keyboard support.
- Internationalization readiness: no user-facing static text except decorative
  symbols; future labels to use `ui.*` namespace.
- Stability: deterministic rendering (especially Tabs) to satisfy static
  analysis and lint rules.
- Composition: no direct network, routing, or stateful domain logic.

## 4. Data Model (Props Overview)

| Component | Selected Props (non-exhaustive)                                                           |
| --------- | ----------------------------------------------------------------------------------------- |
| Card      | `padding`, `shadow`, `interactive`, `radius`                                              |
| Stack     | `gap` (token key), `as?` (future)                                                         |
| Inline    | `gap`, `wrap` (future extension)                                                          |
| Portal    | `containerId?`                                                                            |
| Backdrop  | `onClick?`, `variant?` (future)                                                           |
| Modal     | `open`, `onClose`, `size`, `initialFocusRef?`, `closeOnBackdrop?`                         |
| Drawer    | `open`, `onClose`, `side`, `width`, `initialFocusRef?`, `closeOnBackdrop?`                |
| Tabs      | `items: {label, panel, disabled?}[]`, `defaultIndex?`, `onChange?`                        |
| Accordion | `items: {id, header, content, disabled?}[]`, `multiple?`, `defaultExpanded?`, `onChange?` |

(Each prop is explicitly typed; see source for full signatures.)

## 5. Accessibility Implementation

- Card: `interactive` variant becomes a `button` with focus ring tokens.
- Stack/Inline: layout-only; no roles.
- Portal: Guarded for SSR (`document` existence) to avoid crashes.
- Backdrop: Click surface passes event to overlay dismiss logic; no role
  (decorative layer).
- Modal/Drawer: `role="dialog"` + `aria-modal="true"`, ESC listener, backdrop
  dismissal, initial focus discovery (ref → [data-autofocus] → first tabbable).
- Tabs: `role="tablist"` containing `role="tab"` buttons with `aria-selected`,
  `aria-controls`, roving focus with arrow keys, Home, End; associated panels
  have `role="tabpanel"` and `aria-labelledby`.
- Accordion: Buttons with `aria-expanded` + `aria-controls` target
  `role="region"` panels using `aria-labelledby`.
- Focus Rings: Uniform use of CSS vars `--focus-ring-color` /
  `--focus-ring-width`.

## 6. Token Usage Patterns

- Colors: `var(--color-surface)`, `var(--color-border)`,
  `var(--color-text-muted)` etc.
- Spacing: Tailwind classes map to spacing tokens; future dynamic spacing scale
  injection will extend CSS variables.
- Radius: Tailwind `rounded-*` classes parameterized by token keys.
- Shadows: Tailwind `shadow-*` classes for token-mapped variants.
- Focus: Ring utilities combined with custom var width:
  `focus:ring-[length:var(--focus-ring-width)]`.

## 7. API Reference (Concise)

```ts
// Modal
interface ModalProps {
  open: boolean
  onClose: () => void
  labelledBy?: string
  describedBy?: string
  size?: 'sm' | 'md' | 'lg'
  initialFocusRef?: RefObject<HTMLElement>
  closeOnBackdrop?: boolean
}
// Drawer
interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  width?: 'sm' | 'md' | 'lg'
  labelledBy?: string
  initialFocusRef?: RefObject<HTMLElement>
  closeOnBackdrop?: boolean
}
// Tabs
interface TabItem {
  label: ReactNode
  panel: ReactNode
  disabled?: boolean
}
interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
  onChange?: (i: number) => void
  idBase?: string
}
// Accordion
interface AccordionItem {
  id: string
  header: ReactNode
  content: ReactNode
  disabled?: boolean
}
interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  defaultExpanded?: string[]
  onChange?: (ids: string[]) => void
}
```

## 8. Acceptance Criteria

1. All listed components exported through single barrel (`src/ui/index.ts`).
2. Each component file ≤80 lines; each test file ≤40 lines.
3. Keyboard interaction verified for Tabs (arrow/home/end) and Accordion (click
   toggling and multi mode).
4. Overlay components close with ESC + backdrop (if enabled).
5. No direct fetch usage inside components.
6. All new tests pass and lint returns zero errors/warnings.
7. Documentation (this file + updated task doc 13.2) reflects actual
   implementation state.

## 9. Future Enhancements

- Focus trap refinement for Modal/Drawer (loop + inert background).
- Animated transitions with reduced-motion respect.
- Theming extension for dark mode contrast adjustments.
- ARIA orientation & vertical Tabs variant.
- Accessible close button with i18n label inside Modal/Drawer.
- Token-driven spacing/radius/shadow dynamic injection (beyond current static
  Tailwind mapping).

## 10. Traceability Matrix (RF → Component/Test)

| RF  | Component(s) | Test Path                                   |
| --- | ------------ | ------------------------------------------- |
| 1   | Card         | `src/tests/ui/Card/Card.test.tsx`           |
| 2   | Stack        | `src/tests/ui/Stack/Stack.test.tsx`         |
| 3   | Inline       | `src/tests/ui/Inline/Inline.test.tsx`       |
| 4   | Portal       | `src/tests/ui/Portal/Portal.test.tsx`       |
| 5   | Backdrop     | `src/tests/ui/Backdrop/Backdrop.test.tsx`   |
| 6   | Modal        | `src/tests/ui/Modal/Modal.test.tsx`         |
| 7   | Drawer       | `src/tests/ui/Drawer/Drawer.test.tsx`       |
| 8   | Tabs         | `src/tests/ui/Tabs/Tabs.test.tsx`           |
| 9   | Accordion    | `src/tests/ui/Accordion/Accordion.test.tsx` |

## 11. Status

Implementation complete pending final repo-wide lint + test run after this doc
addition.
