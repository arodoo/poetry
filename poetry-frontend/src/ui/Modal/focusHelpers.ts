/*
 File: focusHelpers.ts
 Purpose: Focus helper used by Modal to encapsulate initial focus logic.
 All Rights Reserved. Arodi Emmanuel
*/
export function focusFirstIn(
  container: HTMLElement | null,
  initial?: HTMLElement | null
): void {
  const target: HTMLElement | null =
    (initial as HTMLElement | null) ??
    container?.querySelector<HTMLElement>('[data-autofocus="true"]') ??
    container?.querySelector<HTMLElement>(
      'button, a, input, textarea, select, [tabindex]'
    ) ??
    null
  if (target) target.focus()
}
