/*
 File: tabUtils.tsx
 Purpose: Helper utilities for Tabs components (DOM queries).
 All Rights Reserved. Arodi Emmanuel
*/
export function queryTabs(node: HTMLElement | null): HTMLButtonElement[] {
  if (!node) return []
  return Array.from(
    node.querySelectorAll('button[role="tab"]')
  ) as unknown as HTMLButtonElement[]
}
