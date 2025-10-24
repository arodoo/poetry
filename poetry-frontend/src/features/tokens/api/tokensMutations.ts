/*
 File: tokensMutations.ts
 Purpose: Minimal mutation wrapper to perform token selection updates (PUT /api/v1/tokens/selection).
 This file preserves the E2E logging and runtime shape of the previous implementation while
 being split out to reduce file lengths and satisfy lint rules. No behavioral changes intended.
 All Rights Reserved. Arodi Emmanuel
*/

import { fetchJson } from '../../../shared/http/fetchClient'
import type { UpdateSelectionInput } from './tokensApi'

// E2E tracing: send selection updates; kept minimal and identical behavior to previous implementation
export async function updateSelection(
  input: UpdateSelectionInput
): Promise<void> {
  try {
    if (typeof window !== 'undefined' && window.__E2E__ === true) {
      console.log('[E2E] tokens.updateSelection: sending PUT', input)
    }
  } catch {
    // ignore
  }

  await fetchJson('/api/v1/tokens/selection', {
    method: 'PUT',
    body: input,
  })

  try {
    if (typeof window !== 'undefined' && window.__E2E__ === true) {
      console.log('[E2E] tokens.updateSelection: PUT completed')
    }
  } catch {
    // ignore
  }
}

export default updateSelection
