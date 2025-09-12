# UI Accessibility & Focus Tokens

File: ui-a11y.md  
Purpose: Document focus ring & accessibility token usage for the UI library.

## Scope

Defines the design tokens and implementation rules for focus indicators and core
ARIA patterns across interactive components (buttons, inputs, navigation,
overlays). Applies globally through CSS variables generated from the active
token bundle.

## Tokens

- `--focus-ring-color`: Derived from current theme primary color.
- `--focus-ring-width`: Fixed width (`2px`) in current implementation (future:
  tokenized scale).

## Implementation Rules

1. All interactive components MUST include a visible focus style using the
   provided CSS vars (no color-only outlines).
2. Focus outline must not be removed; suppression only allowed in composite
   widgets where inner roving tab focus is applied.
3. Components use Tailwind utilities referencing CSS vars:
   `focus:ring-[var(--focus-ring-color)] focus:ring-[length:var(--focus-ring-width)] focus:ring-offset-1`.
4. Do not hardcode focus colors; always derive from token mapping so theme
   switches propagate automatically.

## ARIA Patterns

- Buttons: native `<button>` with type attribute; no role overrides.
- Text links (future): use `<a>`; avoid role="button".
- Composite widgets (Tabs, Accordion): implement proper roles per WAI-ARIA
  Authoring Practices; roving tabIndex pattern documented in forthcoming
  composite module doc.

## Testing Guidance

- Verify CSS variables exist on `documentElement` when tokens load.
- Assert component classList contains focus ring utilities.
- Include at least one keyboard navigation snapshot test (future step) for
  composite widgets.

## Acceptance Criteria

- Visible focus for every interactive primitive.
- No hardcoded focus colors.
- Automated tests assert presence of focus variables and classes.

## Future Enhancements

- Tokenize offset & radius of focus ring.
- High-contrast mode adaptation via prefers-contrast media queries.
- Roving focus utilities helper (planned in utilities extraction step).
