/*
 File: bootstrap.ts
 Purpose: Install the dev client error reporter before the app module
 graph loads. This guarantees early runtime errors are captured and
 forwarded to the Vite dev server log. The bootstrap isolates this
 concern so the application entry stays focused on rendering.
 All Rights Reserved. Arodi Emmanuel
*/
if (import.meta.env.DEV) {
  await import('./shared/dev/clientErrorReporter')
}

await import('./main')
