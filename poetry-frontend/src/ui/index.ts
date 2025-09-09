/*
File: index.ts
Purpose: Provide the public UI entrypoint for the frontend module. This
file centralizes exports for small UI helpers and shared rendering utilities
so other parts of the application can import a single stable module path.
It intentionally remains minimal and focused on re-exports and bootstrap
helpers rather than implementation details.
All Rights Reserved. Arodi Emmanuel
*/

// UI module entrypoint. Exports rendering helpers and shared UI utilities.
export { TokensProvider } from '../shared/tokens/TokensProvider'
export { tokensVarNames } from './theme/tokens'
