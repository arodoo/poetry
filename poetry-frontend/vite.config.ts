import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { i18nKeyGen } from './tools/vite/i18nKeyGen'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), i18nKeyGen()],
})
