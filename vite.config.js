import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set `base: './'` if you deploy to a sub-folder (e.g. GitHub Pages project site).
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: { target: 'es2019', assetsInlineLimit: 4096 },
})
