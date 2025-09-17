/*
 File: mockData.ts
 Purpose: Mock data for TokensProvider test.
 All Rights Reserved. Arodi Emmanuel
*/
export const mockBundle: Record<string, unknown> = {
  themes: [
    {
      key: 'amber',
      label: 'Amber',
      colors: { primary: 'hsl(34 65% 37%)' },
    },
  ],
  fonts: [],
  fontFamilies: [{ key: 'inter', label: 'Inter', family: 'Inter, sans-serif' }],
  fontWeights: ['400', '500', '700'],
  fontSizes: [{ key: 'default', label: 'Default', sizes: { base: '1rem' } }],
  spacings: [{ key: 'default', label: 'Default', values: { md: '1rem' } }],
  radius: [
    {
      key: 'default',
      label: 'Default',
      values: { md: '0.375rem' },
    },
  ],
  shadows: [
    {
      key: 'default',
      label: 'Default',
      values: {
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
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
