/*
 * File: TokensErrorDetails.tsx
 * Purpose: Helper component for TokensErrorView that renders troubleshooting
 * details. Extracted to keep TokensErrorView under the max-lines limit.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

export default function TokensErrorDetails(): ReactElement {
  return (
    <details style={{ marginTop: '16px' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
        Common Solutions
      </summary>
      <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
        <li>Check that backend is running on port 8080</li>
        <li>
          Verify <code>/api/v1/tokens</code> endpoint is accessible
        </li>
        <li>Check browser console for Zod validation errors</li>
        <li>Ensure backend data model matches frontend schema</li>
        <li>Check network tab for failed requests</li>
      </ul>
    </details>
  )
}
