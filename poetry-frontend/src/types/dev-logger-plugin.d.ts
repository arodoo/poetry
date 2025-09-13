/*
 File: dev-logger-plugin.d.ts
 Purpose: Empty placeholder under src/types to satisfy header policy.
 This file intentionally contains no declarations; Vite config uses a
 dynamic import with an explicit cast for the dev logger plugin. The
 placeholder avoids accidental ambient typing.
 All Rights Reserved. Arodi Emmanuel
*/

declare module '../../../tools/logs/frontend/devClientErrorLogger.mjs' {
  import type { PluginOption } from 'vite'
  const pluginFactory: () => PluginOption
  export default pluginFactory
}
