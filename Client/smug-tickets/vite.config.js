import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ registerType: 'autoUpdate' })],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces de red
    port: 5173 // Usa el puerto 5173
  }
})
