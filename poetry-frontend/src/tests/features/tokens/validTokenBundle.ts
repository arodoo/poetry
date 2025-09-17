/*
 File: validTokenBundle.ts
 Purpose: Valid token bundle data for testing TokenBundleSchema.
 All Rights Reserved. Arodi Emmanuel
*/
export const validTokenBundle: Record<string, unknown> = {
  themes: [
    {
      key: 'amber',
      label: 'Amber',
      colors: { primary: '#fff' },
    },
  ],
  fonts: [{ key: 'inter', label: 'Inter', weights: [400] }],
  fontFamilies: [{ key: 'inter', label: 'Inter', family: 'Inter, sans-serif' }],
  fontWeights: ['400'],
  fontSizes: [
    {
      key: 'default',
      label: 'Default',
      sizes: { base: '1rem' },
    },
  ],
  spacings: [{ key: 'default', label: 'Default', values: { md: '1rem' } }],
  radius: [{ key: 'default', label: 'Default', values: { md: '4px' } }],
  shadows: [
    { key: 'default', label: 'Default', values: { md: '0 0 2px #000' } },
  ],
  current: {
    theme: 'amber',
    font: 'inter',
    fontSize: 'default',
    spacing: 'default',
    radius: 'default',
    shadow: 'default',
  },
}
