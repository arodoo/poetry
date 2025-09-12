/*
 File: loadFontTypes.ts
 Purpose: Shared types for font loading so other modules can depend on a
 narrow interface rather than the full token schema. This isolates font
 utilities from larger domain types. The types match the token bundle
 shape used by the UI.
 All Rights Reserved. Arodi Emmanuel
*/
export interface TokenFont {
  key: string
  woff2Url?: string | undefined
  hash?: string
}

export interface TokenBundle {
  fonts: readonly TokenFont[]
  current: {
    font: string
  }
}
