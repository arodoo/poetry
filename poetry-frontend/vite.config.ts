import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { i18nKeyGen } from './tools/vite/i18nKeyGen'
// dynamic import for local JS plugin without types

// https://vite.dev/config/
export default defineConfig(async (): Promise<{ plugins: PluginOption[] }> => {
  const DEV_LOGGER_PATH: string =
    '../tools/logs/frontend/devClientErrorLogger.mjs'
  const mod: unknown = await import(DEV_LOGGER_PATH)
  const devLoggerFactory: () => PluginOption = (
    mod as { default: () => PluginOption }
  ).default
  const plugins: PluginOption[] = [react(), i18nKeyGen(), devLoggerFactory()]
  return { plugins }
})
