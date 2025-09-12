/*
 File: useTabsIds.ts
 Purpose: Helpers to compute tab/panel IDs based on a base id.
 All Rights Reserved. Arodi Emmanuel
*/
export function makeGetTabId(baseId: string): (i: number) => string {
  return (i: number): string => `${baseId}-tab-${String(i)}`
}

export function makeGetPanelId(baseId: string): (i: number) => string {
  return (i: number): string => `${baseId}-panel-${String(i)}`
}
